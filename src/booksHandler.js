const { uuid } = require('uuidv4');
let { books } = require("./bookRepository")

exports.createBook = async (req, h) => {
  try {
    const body = req.payload
    const nameNotExist = !("name" in body) || !body?.name

    if (nameNotExist) {
      return h.response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku"
      }).code(400)
    }

    if (body.readPage > body.pageCount) {
      return h.response({
        status: "fail",
        message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
      }).code(400)
    }

    const booksData = {
      id: uuid(),
      name: body.name,
      year: body.year,
      author: body.author,
      summary: body.summary,
      publisher: body.publisher,
      pageCount: body.pageCount,
      readPage: body.readPage,
      reading: body.reading,
      finished: body.readPage === body.pageCount,
      insertedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    books.push(booksData)

    return h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: booksData.id
      }
    }).code(201)
  }
  catch(err) {
    throw err
  }
}

exports.getBooks = async (req, h) => {
  try {
    const { reading, finished, name } = req.query

    const _response = books.filter( book => {
      if (reading) {
        const status = reading == "1"
        return book.reading == status
      }

      if (finished) {
        const status = finished == "1"
        return book.finished == status
      }

      if (name) {
        if (book.name.search(new RegExp(name, "i")) == -1) return false
      }
      
      return true
    })
    
    
    const response = _response.map(({ id, name, publisher }) => ({
      id, name, publisher
    }))

    return h.response({
      status: "success",
      data: { books: response }
    }).code(200)

  }
  catch(err) {
    throw err
  }
}

exports.getOneBooks = async (req, h) => {
  try {
    const selectedBook = req.params.id
    const [isBookExist] = books.filter(book => book.id === selectedBook)
    if (!isBookExist) {
      return h.response({
        status: "fail",
        message: "Buku tidak ditemukan"
      }).code(404)
    }

    return h.response({
      status: "success",
      data: { book: isBookExist }
    }).code(200)
  }
  catch(err) {
    throw err
  }
}

exports.updateBook = async (req, h) => {
  try {
    const body = req.payload
    const updatedId = req.params.id

    const nameNotExist = !("name" in body) || !body?.name
    if (nameNotExist) {
      return h.response({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku"
      }).code(400)
    }

    if (body.readPage > body.pageCount) {
      return h.response({
        status: "fail",
        message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
      }).code(400)
    }

    const [isBookExist] = books.filter(book => book.id === updatedId)
    if (!isBookExist) {
      return h.response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan"
      }).code(404)
    }

    books = books.map( book => {
      if (book.id !== updatedId) return book

      body.finished = body.readPage === body.pageCount
      body.updatedAt = new Date().toISOString()
      
      return Object.assign(book, body)
    })

    return h.response({
      status: "success",
      message: "Buku berhasil diperbarui"
    }).code(200)
  }
  catch(err) {
    throw err
  }
}

exports.deleteOneBooks = async (req, h) => {
  try {
    const deletedId = req.params.id
    let bookFound = false
    books = books.filter( book => {
      if (book.id === deletedId) bookFound = true
      return book.id !== deletedId
    })

    if (!bookFound) {
      return h.response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan"
      }).code(404)
    }

    return h.response({
      status: "success",
      message: "Buku berhasil dihapus"
    }).code(200)
  }
  catch(err) {
    throw err
  }
}