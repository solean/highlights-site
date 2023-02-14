import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '../components/header/Header'
import Filters from '../components/filters/Filters'
import Highlights from '../components/highlights/Highlights'
import Pagination from '../components/pagination/Pagination'
import { getHighlights } from './api/highlights'
import { getBooks } from './api/books'


function Home({ highlights, books, searchText, selectedBooks }) {
  const router = useRouter()
  const currentPage = router.query.page || 0

  const pageSize = 20

  const onFilterSearch = async (searchText, selectedBooks) => {
    selectedBooks = selectedBooks && selectedBooks.map(b => b.value)

    router.push({
      pathname: '/',
      query: {
        page: 0,
        searchText: searchText,
        selectedBooks: selectedBooks
      }
    })
  }

  return (
    <div>
      <Head>
        <title>highlights - page { currentPage }</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Filters
          books={ books }
          initialSearchText={ searchText }
          initialSelectedBooks={ selectedBooks }
          onSearch={ onFilterSearch } />
        <Highlights
          highlights={ highlights } />
        <Pagination
          currentPage={ currentPage }
          currentQuery= { router.query }
          numItems={ highlights.length }
          pageSize={ pageSize } />
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps = async (context) => {
  const { page, searchText, selectedBooks } = context.query
  let highlights = await getHighlights(page, searchText, selectedBooks)
  let books = await getBooks()

  return {
    props: {
      highlights,
      books,
      searchText: searchText || "",
      selectedBooks: selectedBooks || []
    }
  }
}
