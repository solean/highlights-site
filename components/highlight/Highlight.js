import { useState, useEffect } from 'react'
import { CopyDuplicate, HeartLoveLike } from 'react-basicons'
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
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLiking, setIsLiking] = useState(false)
  const [likes, setLikes] = useState(highlight.likes || 0)

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'))
  }, [])

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

  const handleLike = async () => {
    if (isLiking) return
    setIsLiking(true)

    try {
      const response = await fetch('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: h.id }),
      })
      if (response.ok) {
        const data = await response.json()
        setLikes(data.likes)
      }
    } catch (error) {
      console.error('Error liking highlight: ' + h.id)
    } finally {
      setIsLiking(false)
    }
  }

  return (
    <div className={ hovered ? 'highlight highlightHovered' : 'highlight' }
         onMouseEnter={ toggleHover }
         onMouseLeave={ toggleHover }>
      { h.book && <div className='book'><b>{ h.book.name }</b> - <span>{ h.book.author }</span></div> }
      <div className='highlightedText'
           dangerouslySetInnerHTML={{ __html: highlight }}></div>
      <div className="highlightMetadata flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="highlightCopyButton cursor-pointer"
               onClick={ copyText.bind(this, highlightedText) }>
            <CopyDuplicate color={ isDarkMode ? 'white' : 'black' } />
          </div>
          <div className="highlightLikesButton cursor-pointer"
              onClick={ handleLike }>
            <HeartLoveLike size={ 20 } color={ isDarkMode ? 'white' : 'black' } />
          </div>
          <span>{ likes }</span>
        </div>
        { h.highlight_date && <div className={ `highlightCreatedOn ${firaMono.className}` }>{ formatDate(new Date(h.highlight_date)) }</div> }
      </div>
    </div>
  )
}