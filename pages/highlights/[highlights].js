import Head from 'next/head'
import Header from '../../components/header/Header'
import Highlights from '../../components/highlights/Highlights'
import { useRouter } from 'next/router'
import Pagination from '../../components/pagination/Pagination'
import { getHighlights } from '../api/highlights'


function HighlightsPage({ highlights }) {
  const router = useRouter()
  const currentPage = router.query.highlights

  const pageSize = 20

  return (
    <div>
      <Head>
        <title>highlights - page { currentPage }</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Highlights highlights={ highlights } />
        <Pagination
          currentPage={ currentPage }
          numItems={ highlights.length }
          pageSize={ pageSize } />
      </main>
    </div>
  )
}

export default HighlightsPage

export const getServerSideProps = async (context) => {
  const currentPage = context.query.highlights
  let highlights = await getHighlights(currentPage)

  return {
    props: {
      highlights
    }
  }
}
