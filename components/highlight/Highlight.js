import React from 'react'

export default class Highlight extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      highlight: props.highlight || {}
    }
  }

  copyText(text, e) {
    navigator.clipboard.writeText(text)
  }

  formatDate(date) {
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  render() {
    let h = this.state.highlight
    const outerText = h.outer_text || h.text
    const highlightedText = h.text
    let highlight = highlightedText
  
    if ((outerText && highlightedText) && outerText.length > highlightedText.length) {
      const startIndex = outerText.indexOf(highlightedText)
  
      highlight = rep.slice(0, startIndex) + '<mark>' + highlightedText + '</mark>' + outerText.slice(startIndex + highlightedText.length)
    } else {
      highlight = '<mark>' + highlightedText + '</mark>'
    }
  
    return (
     <div className='highlight'>
        { h.book && <div className='book'><b>{ h.book.name }</b> - <span>{ h.book.author }</span></div> }
        <div onClick={ this.copyText.bind(this, highlightedText) } className='highlightedText'
          dangerouslySetInnerHTML={{ __html: highlight }}></div>
        { h.highlight_date && <div className="highlightCreatedOn">{ this.formatDate(new Date(h.highlight_date)) }</div> }
      </div>
    )
  }
}