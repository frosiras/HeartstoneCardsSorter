const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('../models/User')
const router = Router()

router.post(
    '/reg', async (req, res)=>{
        Users.create({
            email: req.body.email,
            password: req.body.password
        })
        res.status(201).json({ message: 'Пользователь создан', successful: true })
    })
router.post(
    '/login',
    async (req,res)=>{
        console.log('login started')
        const user = await Users.findOne({where:{email: req.body.email}})
        console.log('i found ' + user.email)
        const token = jwt.sign(
            {userId: user.id},
            'Dasha',
            {expiresIn: '1h'}
        )
        console.log('i created token')
        console.log(token)
        res.json({token, userId: user.id})
    }
)
module.exports = router;