import Head from 'next/head'
import Header from '../components/header/Header'
import Highlights from '../components/highlights/Highlights'
import Pagination from '../components/pagination/Pagination'
import { getHighlights } from '../pages/api/highlights'


function Home(props) {
  const pageSize = 20

  return (
    <div>
      <Head>
        <title>highlights</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Highlights highlights={ props.highlights } />
        <Pagination
          currentPage={ 0 }
          numItems={ props.highlights.length }
          pageSize={ pageSize } />
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  let highlights = await getHighlights(0)

  return {
    props: {
      highlights
    }
  }
}
