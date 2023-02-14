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

  const _onClear = () => {
    setSearchText('')
    setSelectedBooks([])
    onSearch('', [])
  }

  const _onSearch = () => {
    onSearch(searchText, selectedBooks)
  }

  return (
    <div className="filters">
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
        />
      </div>
      <button onClick={ _onSearch }>Search</button>
      <button onClick={ _onClear }>Clear</button>
    </div>
  )
}

export default Filters