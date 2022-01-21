import React from 'react'
import Highlight from '../highlight/Highlight'

export default class Highlights extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      highlights: props.highlights || []
    }
  }

  render() {
    let highlights = this.state.highlights.map((h, key) => {
      return  <Highlight highlight={ h } key={ key } />
    })

    return (
      <div className='highlightsContainer'>
        { highlights }
      </div>
    )
  }
}