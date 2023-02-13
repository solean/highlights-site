import prisma from '../../lib/prisma'

export async function getBooks() {
  let books = await prisma.book.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  books = books.map(b => {
    b.id = Number(b.id)
    b.created_at = b.created_at.toString()
    b.name = b.name
    b.author = b.author
    return b
  })

  return books
}


export default async function handler(req, res) {
  let books = await getBooks()
  res.status(200).json(books)
}