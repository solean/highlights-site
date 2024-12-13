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
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: 'var(--tw-bg-opacity)',
                '@media (prefers-color-scheme: dark)': {
                  '.dark &': {
                    backgroundColor: 'rgb(31, 41, 55)',
                    borderColor: 'rgb(75, 85, 99)',
                    '&:hover': {
                      borderColor: 'rgb(107, 114, 128)'
                    }
                  }
                }
              }),
              menu: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: 'white',
                '.dark &': {
                  backgroundColor: 'rgb(31, 41, 55)',
                }
              }),
              option: (baseStyles, { isFocused, isSelected }) => ({
                ...baseStyles,
                backgroundColor: isSelected 
                  ? 'rgb(219, 234, 254)'
                  : isFocused 
                    ? 'rgb(243, 244, 246)'
                    : 'white',
                color: 'rgb(17, 24, 39)',
                ':active': {
                  backgroundColor: 'rgb(219, 234, 254)'
                },
                '.dark &': {
                  backgroundColor: isSelected 
                    ? 'rgb(55, 65, 81)'
                    : isFocused 
                      ? 'rgb(75, 85, 99)'
                      : 'rgb(31, 41, 55)',
                  color: 'rgb(243, 244, 246)',
                  ':active': {
                    backgroundColor: 'rgb(75, 85, 99)'
                  }
                }
              }),
              input: (baseStyles) => ({
                ...baseStyles,
                color: 'rgb(17, 24, 39)',
                '.dark &': {
                  color: 'rgb(243, 244, 246)'
                }
              }),
              singleValue: (baseStyles) => ({
                ...baseStyles,
                color: 'rgb(17, 24, 39)',
                '.dark &': {
                  color: 'rgb(243, 244, 246)'
                }
              }),
              multiValue: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: 'rgb(243, 244, 246)',
                '.dark &': {
                  backgroundColor: 'rgb(75, 85, 99)',
                }
              }),
              multiValueLabel: (baseStyles) => ({
                ...baseStyles,
                color: 'rgb(17, 24, 39)',
                '.dark &': {
                  color: 'rgb(243, 244, 246)'
                }
              }),
              multiValueRemove: (baseStyles) => ({
                ...baseStyles,
                color: 'rgb(17, 24, 39)',
                ':hover': {
                  backgroundColor: 'rgb(229, 231, 235)',
                  color: 'rgb(17, 24, 39)',
                },
                '.dark &': {
                  color: 'rgb(243, 244, 246)',
                  ':hover': {
                    backgroundColor: 'rgb(107, 114, 128)',
                    color: 'white',
                  }
                }
              }),
              placeholder: (baseStyles) => ({
                ...baseStyles,
                color: 'rgb(107, 114, 128)',
                '.dark &': {
                  color: 'rgb(156, 163, 175)'
                }
              }),
            }}
          />
        </div>
        <div className="filter">
          <input
            type="text"
            placeholder="Search"
            value={ searchText }
            onChange={ handleSearchFilterChange }
            className="block w-full px-3 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 sm:text-sm"
          />
        </div>
        <div className="flex justify-center pt-2">
          <button
            type="submit"
            className="w-20 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 py-2 px-4 rounded hover:underline"
            style={{ marginRight: '10px' }}
          >Search</button>
          <button
            onClick={ _onClear }
            className="w-20 bg-transparent text-gray-900 dark:text-gray-100 py-2 px-4 rounded border border-gray-900 dark:border-gray-100 hover:underline"
          >Clear</button>
        </div>
      </form>
    </div>
  )
}

export default Filters