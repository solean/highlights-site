import Link from 'next/link'

function Pagination({ currentPage, numItems, pageSize }) {
  let showNext = true
  if (numItems < pageSize) {
    showNext = false
  }

  currentPage = Number(currentPage)

  return (
    <div className="pagination">
      <button className={ currentPage == 0 ? "invisible" : "paginateButton" }>
        <Link href={ '/highlights/' + (currentPage - 1) }>Back</Link>
      </button>
      <button className={ showNext ? "paginateButton" : "invisible" }>
        <Link href={ '/highlights/' + (currentPage + 1) }>More</Link>
      </button>
   </div>
  )
}

export default Pagination