import React from 'react'
import ReactDOM from 'react-dom'

import './styles.css'
import { Svg } from './svg'
import { Path, Move, Line } from './path'

function App() {
  return (
    <div className="App">
      {/* Example Path taken from MDN */}
      <Svg
        height={'100%'}
        width={'100%'}
        viewBox="0 0 200 100"
        style={{ outline: 'solid 1px red' }}
      >
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
      </Svg>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
