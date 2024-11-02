import express from 'express';

const router = express.Router();




// APIs

router.get('/', (req, res) => {
    res.render('index', {})
})

router.get('/message', (req, res) => {
    res.render('messages', {})
})


export default router