const fs = require('fs')
const colors = require('colors')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


class KindleSync {
  constructor(json) {
    this.json = json
  }

  async getBook(name, author) {
    const book = await prisma.book.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive'
        },
        author: {
          equals: author,
          mode: 'insensitive'
        }
      }
    })

    return book
  }

  async insertBook(name, author) {
    const book = await prisma.book.create({
      data: {
        name,
        author
      }
    })

    return book
  }

  async insertHighlight(bookName, bookAuthor, highlightedText, highlightDate, location) {
    let book = await this.getBook(bookName, bookAuthor)
    if (!book) {
      book = await this.insertBook(bookName, bookAuthor)
    }

    const highlight = await prisma.highlight.create({
      data: {
        book_id: book.id,
        type: 'kindle',
        text: highlightedText,
        outer_text: null,
        page: null,
        chapter: null,
        location: location,
        highlight_date: highlightDate
      }
    })

    return highlight
  }

  async getLatestHighlightDate() {
    const latestHighlight = await prisma.highlight.findFirst({
      orderBy: {
        highlight_date: 'desc'
      }
    })

    return latestHighlight ? new Date(latestHighlight.highlight_date) : null
  }

  async processJson() {
    if (!this.json) {
      throw new Error('No JSON data provided.'.brightRed)
    }
    if (!this.json.length) {
      throw new Error('JSON improperly formatted, provide array of highlights.'.brightRed)
    }

    const latestHighlightDate = await this.getLatestHighlightDate()

    for (let i = 0; i < this.json.length; i++) {
      let h = this.json[i]
      let highlightDate = new Date(h.date)
      if (latestHighlightDate && highlightDate <= latestHighlightDate) {
        console.log('Skipping highlight:'.bold.underline.bgYellow + ` ${h.title}`.brightYellow)
        continue
      }

      try {
        let highlight = await this.insertHighlight(h.title, h.author, h.content, h.date, h.location)
        console.log('Successfully inserted highlight:'.bold.underline.bgGreen + ` ${h.title} - ${highlight.id}`.brightGreen)
      } catch(e) {
        console.error(e)
        console.log('Error inserting highlight:'.bold.underline.bgRed + ` \n${JSON.stringify(h)}`.brightRed)
      }
    }
  }

}



let filePath = './kindle_export.json'
let rawJsonData = fs.readFileSync(filePath)
let json = JSON.parse(rawJsonData)

let sync = new KindleSync(json)
sync.processJson()
