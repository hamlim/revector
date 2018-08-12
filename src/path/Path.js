import React, { Children } from 'react'

import { callOrReturn } from '../utils.js'

/*
 SVG path commands

 M absolute movement x,y
 m local movement x,y
 
 L absolute line to x,y
 l local line to dx,dy

 H absolute horizontal line to x
 h local absolute line to dx

 V absolute vertical line to y
 v local vertical line to dy

 C Bezier curve from current point to absolute coords x1, y1
   C x1, y1  x2, y2, x, y
   x and y are the end points
   x1, y1, are the first control point (begining of curve)
   x2, y2 are the end control point (end of curve)
*/

const PathTypes = {
  move: 'MOVE',
  line: 'LINE',
  cubicBezier: 'CUBIC_BEZIER',
  cubicBezierStart: 'CUBIC_BEZIER_START',
  cubicBezierEnd: 'CUBIC_BEZIER_END',
  cubicBezierControl: 'CUBIC_BEZIER_CONTROL',
}

export const Move = ({ x, y }) => null
Move.$type = PathTypes.move

export const Line = ({ x, y }) => null
Line.$type = PathTypes.line

export const CubicBezier = ({ x, y }) => null
CubicBezier.$type = PathTypes.cubicBezier

export const CubicBezierStart = ({ x, y }) => null
CubicBezierStart.$type = PathTypes.cubicBezierStart

export const CubicBezierEnd = ({ x, y }) => null
CubicBezierEnd.$type = PathTypes.cubicBezierEnd

export const CubicBezierControl = ({ x, y }) => null
CubicBezierControl.$type = PathTypes.cubicBezierControl

const convertCubicBezierChildren = (childrenArray, state) =>
  childrenArray.reduce((acc, child) => {
    if (child.type.$type === PathTypes.cubicBezierStart) {
      acc.start = {
        x: callOrReturn(child.props.x)(state),
        y: callOrReturn(child.props.y)(state),
      }
    } else if (child.type.$type === PathTypes.cubicBezierControl) {
      acc.control = {
        x: callOrReturn(child.props.x)(state) || '',
        y: callOrReturn(child.props.y)(state) || '',
      }
    } else {
      acc.end = {
        x: callOrReturn(child.props.x)(state),
        y: callOrReturn(child.props.y)(state),
      }
    }
    return acc
  }, {})

export class Path extends React.Component {
  state = {
    x: 0,
    y: 0,
  }
  convertChildren = childrenArr =>
    childrenArr.reduce((path, child) => {
      let type, x, y
      if (child.type.$type === PathTypes.move) {
        if (child.props.local) {
          type = 'm'
        } else {
          type = 'M'
        }
        x = callOrReturn(child.props.x)(this.state)
        y = callOrReturn(child.props.y)(this.state)

        this.state = {
          ...this.state,
          x,
          y,
        }
        return `${path} ${type} ${x}, ${y}`
      } else if (child.type.$type === PathTypes.line) {
        if (child.props.local) {
          type = 'l'
        } else {
          type = 'L'
        }
        x = callOrReturn(child.props.x)(this.state)
        y = callOrReturn(child.props.y)(this.state)

        this.state = {
          ...this.state,
          x,
          y,
        }
        return `${path} ${type} ${x}, ${y}`
      } else if (child.type.$type === PathTypes.cubicBezier) {
        /*
          The structure we expect here is the following:
          <CubicBezier>
            <CBStart x={5} y={5} />
            <CBControl x={7} y={7} />
            <CBEnd x={9} y={5} />
          </CubicBezier>

          childrenData = {
            start: { x, y },
            end: { x, y },
            control: { x, y }
          }
        */
        if (child.props.local) {
          type = 'c'
        } else {
          type = 'C'
        }
        if (child.props.smooth) {
          if (child.props.local) {
            type = 's'
          } else {
            type = 'S'
          }
        }
        let {
          start,
          control = { x: '', y: '' },
          end,
        } = convertCubicBezierChildren(
          Children.toArray(child.props.children),
          this.state,
        )
        this.state = {
          ...this.state,
          x: end.x,
          y: end.y,
        }
        return `${path} ${type} ${start.x},${start.y} ${
          control.x ? `${control.x},` : ''
        }${control.y} ${end.x},${end.y}`
      }
      return path
    }, '')
  render() {
    let { children, ...props } = this.props
    let path = this.convertChildren(Children.toArray(children))
    return <path d={path} {...props} />
  }
}
