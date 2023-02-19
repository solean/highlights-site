import Select from 'react-select'
import { useState } from 'react'

function Filters({ books, initialSearchText, initialSelectedBooks, onSearch }) {

  if (initialSelectedBooks && typeof initialSelectedBooks == 'string') {
    initialSelectedBooks = [initialSelectedBooks]
  }

  if (initialSelectedBooks && initialSelectedBooks.length) {
    initialSelectedBooks = initialSelectedBooks.map(b => {
      const book = books.find(book => book.id === Number(b))
      return { value: book.id, label: book.name }
    })
  }


  const [ searchText, setSearchText ] = useState(initialSearchText || '')
  const [ selectedBooks, setSelectedBooks ] = useState(initialSelectedBooks || [])


  const options = books.map(b => {
    return { value: b.id, label: b.name }
  })

  const handleBookFilterChange = (selectedBooks) => {
    setSelectedBooks(selectedBooks)
  }

  const handleSearchFilterChange = (e) => {
    setSearchText(e.target.value)
  }

  const handleSubmit = (e) => {
    e && e.preventDefault()
    onSearch(searchText, selectedBooks)
  }

  const _onClear = () => {
    setSearchText('')
    setSelectedBooks([])
    onSearch('', [])
  }


  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <div className="filter">
          <Select
            options={ options }
            isMulti
            placeholder="Filter by book"
            value={ selectedBooks }
            onChange={ handleBookFilterChange }
            width="20em"
          />
        </div>
        <div className="filter">
          <input
            type="text"
            placeholder="Search"
            value={ searchText }
            onChange={ handleSearchFilterChange }
            className="block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-center pt-2">
          <button
            type="submit"
            className="w-20 bg-gray-900 text-white py-2 px-4 rounded hover:underline"
            style={{ marginRight: '10px' }}
          >Search</button>
          <button
            onClick={ _onClear }
            className="w-20 bg-white text-gray-900 py-2 px-4 rounded border border-gray-900 hover:underline"
          >Clear</button>
        </div>
      </form>
    </div>
  )
}

export default Filters