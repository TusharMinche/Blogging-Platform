const express = require('express')
const { signup, login, register, loginPage, allUsers, logout } = require('./controllers/userController');
const {requireAuth} = require('./utils/auth');
const { home, myBlogs, addBlog, createBlog, deleteBlog, editBlog, updateBlog } = require('./controllers/blogController');
const router = express.Router()

router.get('/signup', signup)

router.get('/login', loginPage)

router.post('/register', register);

router.post('/login', login)

router.get('/allusers', requireAuth, allUsers)

router.get('/logout', logout)

router.get('/', home)

router.get('/home', home)

router.get('/myblogs', requireAuth, myBlogs)

router.get('/addblog', requireAuth, addBlog)

router.post('/createblog', requireAuth, createBlog)

router.post('/updateblog', requireAuth, updateBlog)

router.get('/deleteblog', requireAuth, deleteBlog)

router.get('/editblog', editBlog)

module.exports = router