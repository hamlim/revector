import React from 'react'
import ReactDOM from 'react-dom'

import './styles.css'
import { Svg } from './svg'
import { Path, Move, Line } from './path'

function App() {
  return (
    <div className="App">
      <Svg
        height={'100%'}
        width={'100%'}
        viewBox="0 0 250 1000"
        style={{ outline: 'solid 1px red' }}
      >
        <Path fill="none" stroke="red">
          <Move x={125} y={0} />
          <Line local x={0} y={125} />
        </Path>
      </Svg>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
