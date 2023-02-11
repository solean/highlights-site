import prisma from '../../lib/prisma'

export async function getHighlights(page) {
  let highlights = await prisma.highlight.findMany({
    take: 20,
    skip: page * 20,
    orderBy: {
      highlight_date: 'desc'
    },
    include: {
      book: true
    }
  })

  highlights = highlights.map(h => {
    h.id = Number(h.id)
    h.book_id = Number(h.book_id)
    h.highlight_date = h.highlight_date && h.highlight_date.toString()
    h.created_at = h.created_at.toString()
    if (h.book) {
      h.book.id = Number(h.book.id)
      h.book.created_at = h.book.created_at.toString()
    }
    return h
  })

  return highlights
}


export default async function handler(req, res) {
  const query = req.query
  let { page } = query
  page = page || 0
  let highlights = await getHighlights(page)

  res.status(200).json(highlights)
}