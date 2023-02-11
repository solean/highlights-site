
function copyText(text, e) {
  navigator.clipboard.writeText(text)
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function Highlight({ highlight }) {
  let h = highlight
  const outerText = h.outer_text || h.text
  const highlightedText = h.text
  highlight = highlightedText

  if ((outerText && highlightedText) && outerText.length > highlightedText.length) {
    const startIndex = outerText.indexOf(highlightedText)

    highlight = rep.slice(0, startIndex) + '<mark>' + highlightedText + '</mark>' + outerText.slice(startIndex + highlightedText.length)
  } else {
    highlight = '<mark>' + highlightedText + '</mark>'
  }

  return (
    <div className='highlight'>
      { h.book && <div className='book'><b>{ h.book.name }</b> - <span>{ h.book.author }</span></div> }
      <div onClick={ copyText.bind(this, highlightedText) } className='highlightedText'
        dangerouslySetInnerHTML={{ __html: highlight }}></div>
      { h.highlight_date && <div className="highlightCreatedOn">{ formatDate(new Date(h.highlight_date)) }</div> }
    </div>
  )
}