import { useState } from 'react'
import { CopyDuplicate } from 'react-basicons'
import { Fira_Mono } from 'next/font/google'

const firaMono = Fira_Mono({
  subsets: ['latin'],
  weight: '400',
})

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

  const [hovered, setHovered] = useState(false)
  const toggleHover = () => setHovered(!hovered)

  return (
    <div className={ hovered ? 'highlight highlightHovered' : 'highlight' }
         onMouseEnter={ toggleHover }
         onMouseLeave={ toggleHover }>
      { h.book && <div className='book'><b>{ h.book.name }</b> - <span>{ h.book.author }</span></div> }
      <div className='highlightedText'
           dangerouslySetInnerHTML={{ __html: highlight }}></div>
      <div className="highlightMetadata">
        <div className="highlightCopyButton"
             onClick={ copyText.bind(this, highlightedText) }>
          <CopyDuplicate />
        </div>
        { h.highlight_date && <div className={ `highlightCreatedOn ${firaMono.className}` }>{ formatDate(new Date(h.highlight_date)) }</div> }
      </div>
    </div>
  )
}