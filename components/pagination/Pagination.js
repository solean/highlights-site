import { useRouter } from 'next/router'

function Pagination({ currentPage, currentQuery, numItems, pageSize }) {
  const router = useRouter()

  currentPage = Number(currentPage)

  let showNext = true
  if (numItems < pageSize) {
    showNext = false
  }

  const handleChangePage = (page) => {
    currentQuery.page = page
    router.push({
      pathname: '/',
      query: currentQuery
    })
  }

  return (
    <div className="pagination">
      <button className={ currentPage == 0 ? "invisible" : "paginateButton" }
              onClick={ () => handleChangePage(currentPage - 1) }>
        Back
      </button>
      <button className={ showNext ? "paginateButton" : "invisible" }
              onClick={ () => handleChangePage(currentPage + 1)}>
        More
      </button>
   </div>
  )
}

export default Pagination