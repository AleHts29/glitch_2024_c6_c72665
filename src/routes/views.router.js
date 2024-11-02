import express from 'express';

const router = express.Router();




// APIs

router.get('/', (req, res) => {
    res.render('index', {})
})




export default router