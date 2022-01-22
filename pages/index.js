import Head from 'next/head'
import Header from '../components/header/Header'
import Highlights from '../components/highlights/Highlights'
import prisma from '../lib/prisma'


function Home(props) {
  return (
    <div>
      <Head>
        <title>highlights</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Highlights highlights={ props.highlights } />
      </main>
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  let highlights = await prisma.highlight.findMany({
    orderBy: {
      highlight_date: 'desc'
    },
    include: {
      book: true
    }
  })
  highlights = highlights.map(h => {
    h.id = Number(h.id)
    h.book_id = Number(h.book_id)
    h.highlight_date = h.highlight_date && h.highlight_date.toString()
    h.created_at = h.created_at.toString()
    if (h.book) {
      h.book.id = Number(h.book.id)
      h.book.created_at = h.book.created_at.toString()
    }
    return h
  })
  return {
    props: {
      highlights
    }
  }
}
