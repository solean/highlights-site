import fs from 'fs'
import path from 'path'
import Head from 'next/head'

function All({ highlightFiles }) {
  return (
    <div>
      <Head>
        <title>All</title>
      </Head>

      <main className='container'>
        <Highlights files={ highlightFiles } />
      </main>
    </div>
  )
}

function Highlights({ files }) {
  let highlights = []
  files && files.forEach(f => {
    const x = JSON.parse(f.fileContents)
    highlights = x
  })

  return (
    <div className='highlightsContainer'>
      { highlights.map(buildHighlight) }
    </div>
  )
}

function buildHighlight(h, key) {
  const rep = h.representativeText
  const sel = h.selectedText
  let highlight = sel

  if ((rep && sel) && rep.length > sel.length) {
    const startIndex = rep.indexOf(sel)

    highlight = rep.slice(0, startIndex) + '<mark>' + sel + '</mark>' + rep.slice(startIndex + sel.length)
  } else {
    highlight = '<mark>' + sel + '</mark>'
  }

  return (
   <div className='highlight' key={ key }>
      { h.book ? <div className='book'><b>{ h.book.title }</b> - <span>{ h.book.author }</span></div> : '' }
      <div onClick={ copyText.bind(this, h.selectedText) } className='highlightedText' dangerouslySetInnerHTML={{ __html: highlight }}></div>
      { h.createdOn ? <div className="highlightCreatedOn">{ formatDate(new Date(h.createdOn)) }</div> : '' }
    </div>
  )
}

function copyText(text, e) {
  navigator.clipboard.writeText(text)
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
}

export async function getStaticProps() {
  const dir = path.join(process.cwd(), 'pages/api/files')
  const fileNames = fs.readdirSync(dir)
  const highlightFiles = fileNames.map(fileName => {
    const filePath = path.join(dir, fileName)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return {
      fileName,
      fileContents
    }
  })

  return {
    props: {
      highlightFiles
    }
  }
}

export default All
