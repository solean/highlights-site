import prisma from '../../lib/prisma'


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { id } = req.body

  try {
    const highlight = await prisma.highlight.update({
      where: { id: id },
      data: {
        likes: {
          increment: 1
        }
      }
    })

    res.status(200).json({ likes: highlight.likes })
  } catch(e) {
    console.error('Error liking highlight: ' + id, e)
    return res.status(500).json({ message: 'Internal server error' })
  }

}