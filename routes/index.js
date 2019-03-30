const express = require('express');
const router = express.Router();

//Require books Model to get the data
const Book = require('../models/book');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

// getting all the books 
router.get('/books', (req, res, next) => {
  Book.find()
    .then(allbooks => res.render('rest/books', { books: allbooks }))
    .catch(err => console.log(err))

})
// new book 

router.get('/books/new', (req, res, next) => {
  res.render('rest/addNewBookForm')
})
router.post('/books', (req, res, next) => {
  let { title, Author, description, rating } = req.body
  Book.create({
    title, Author, description, rating
  })
    .then(book => {
      console.log('The user is saved and its value is: ', book)
      res.redirect('/books')
    })
    .catch(err => { console.log('An error happened:', err) });
})

// get one book 
router.get('/books/:id', (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(book => res.render('rest/book-details', { book: book }))
    .catch(err => console.log(err))
})

// Edit book 

router.get('/books/:id/edit', (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(book => {
      console.log(book)
      res.render('rest/bookEditForm', { book })
    })
    .catch(err => console.log(err))
})
//edit 
router.post('/books/:id', (req, res, next) => {
  const { title, Author, description, rating } = req.body
  Book.update({ _id: req.params.id }, { $set: { title, Author, description, rating } })
    .then(book => {
      console.log(book)
      res.redirect('/books')
    })
    .catch(err => console.log(err))
})

// remove 

router.get('/books/:id/remove', (req, res, next) => {
  Book.remove({ _id: req.params.id })
    .then(book => {
      console.log(book)
      res.redirect('/books')
    })
    .catch(err => console.log(err))
})









module.exports = router;
