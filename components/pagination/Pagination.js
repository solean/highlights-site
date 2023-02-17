import { useRouter } from 'next/router'
import { ChevronLeftArrow, ChevronRightArrow } from 'react-basicons'

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
      <button className={ currentPage == 0 ? "invisiblePaginateButton" : "paginateButton paginateLeftButton" }
              onClick={ () => handleChangePage(currentPage - 1) }>
        <span style={{ float: 'left' }}><ChevronLeftArrow /></span>
        <span style={{ verticalAlign: 'middle' }}>Prev</span>
      </button>
      <button className={ showNext ? "paginateButton paginateRightButton" : "invisiblePaginateButton" }
              onClick={ () => handleChangePage(currentPage + 1)}>
        <span style={{ verticalAlign: 'middle' }}>More</span>
        <span style={{ float: 'right' }}><ChevronRightArrow /></span>
      </button>
   </div>
  )
}

export default Pagination