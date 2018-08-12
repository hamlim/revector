import React from 'react'

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
}

export const Move = ({ x, y }) => null
Move.$type = PathTypes.move

export const Line = ({ x, y }) => null
Line.$type = PathTypes.line

export const CubicBezier = ({ x, y, x1, y1, x2, y2 }) => null
CubicBezier.$type = PathTypes.cubicBezier

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
        if (typeof child.props.x === 'function') {
          x = child.props.x(this.state)
        } else {
          x = child.props.x
        }
        if (typeof child.props.y === 'function') {
          y = child.props.y(this.state)
        } else {
          y = child.props.y
        }
      } else if (child.type.$type === PathTypes.line) {
        if (child.props.local) {
          type = 'l'
        } else {
          type = 'L'
        }
        if (typeof child.props.x === 'function') {
          x = child.props.x(this.state)
        } else {
          x = child.props.x
        }
        if (typeof child.props.y === 'function') {
          y = child.props.y(this.state)
        } else {
          y = child.props.y
        }
      }
      this.state = {
        ...this.state,
        x,
        y,
      }
      if (
        typeof type !== 'undefined' &&
        typeof x !== 'undefined' &&
        typeof y !== 'undefined'
      ) {
        return `${path} ${type} ${x}, ${y}`
      }
      return path
    }, '')
  render() {
    let { children, ...props } = this.props
    let path = this.convertChildren(React.Children.toArray(children))
    console.log(path)
    return <path d={path} {...props} />
  }
}
