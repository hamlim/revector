import React from 'react'
import { render } from 'react-testing-library'
import { Svg } from '../../svg'
import {
  Path,
  Line,
  Move,
  CubicBezier,
  CubicBezierStart as CBStart,
  CubicBezierControl as CBControl,
  CubicBezierEnd as CBEnd,
} from '../Path'

describe('Path', () => {
  it('matches a snapshot using Move and Line', () => {
    const { container } = render(
      <Svg height="100%" width="100%" viewBox="0 0 200 100">
        <Path fill="none" stroke="red">
          <Move x={10} y={90} />
          <Line x={({ x }) => x + 10} y={({ y }) => y + 10} />
        </Path>
      </Svg>,
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('matches a snapshot using Move and Cubic Bezier', () => {
    const { container } = render(
      <Svg height={'100%'} width={'100%'} viewBox="0 0 200 100">
        <Path fill="none" stroke="red">
          <Move x={10} y={90} />
          <CubicBezier>
            <CBStart x={30} y={90} />
            <CBControl x={25} y={10} />
            <CBEnd x={50} y={10} />
          </CubicBezier>
          <CubicBezier smooth>
            <CBStart x={70} y={90} />
            <CBEnd x={90} y={90} />
          </CubicBezier>
        </Path>
      </Svg>,
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
