const express = require('express')
const router = express.Router()
const post = require('../models/post')
const user = require('../models/user')




router.get('/', (req,res) =>{
    console.log(req.session)
    post.find({}).then(posts => {
        res.render('site2/index',{
            style: 'index-style.css',
            posts: posts.map(posts => posts.toJSON())
        })
    })
    /* res.render('site2/index',{
        style: 'index-style.css'
    }) */
})

router.get('/article:id', (req,res) =>{


    post.findById(req.params.id).then(posts => {
        res.render('site2/article',{
            style: 'article.css',
            posts: posts.toJSON()
        })
    })
    /* console.log(req.params)
    res.render('site2/article', {
        style: 'article.css'
    }) */
})

router.get('/sign-page', (req,res) =>{
    res.render('site2/sign-page',{
        style: 'sing-page-style.css'
    })
})

router.post('/sign-page-register', (req,res) => {
    user.create(req.body, (error, user) => {
        res.redirect('/sign-page')
    })
})

router.post('/sign-page-login', (req,res) =>{
    const {email, password} = req.body

    user.findOne({email}, async(error, user) => {
        if(user) {

            const result = await user.comparePassword(password)
            console.log(result)
            if(result == true) {
                req.session.userId = user._id
                res.redirect('/')
            } else {
                res.redirect('/sign-page')
            }
        } else {
            res.redirect('/')
        }
    })
})

router.get('/logout' ,(req,res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
    
})

router.get('/add-post', (req,res) => {
    res.render('site2/add-post',{
        style: 'add-post.css'
    })
})

router.post('/add-post', (req,res) => {
    post.create(req.body)
    res.redirect('/')
})



module.exports = router
