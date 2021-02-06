import {Router} from 'express'
const router = Router()

router.get('/users/signin',(req, res) => {
    res.render('users/signin');
});
router.get('/users/signout',(req, res) => {
    res.render('users/signout');
});

module.exports = router;