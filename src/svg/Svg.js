import React from 'react'

export const context = React.createContext({
  dimensions: {
    height: 0,
    width: 0,
  },
})

export class Svg extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dimensions: {
        height: props.height,
        width: props.width,
      },
      update: fn => this.setState(fn),
    }
  }
  render() {
    const { height, width, ...rest } = this.props
    return (
      <context.Provider value={this.state}>
        <svg {...rest} height={height} width={width} />
      </context.Provider>
    )
  }
}
