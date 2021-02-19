const {Router} = require('express')
const Cards = require('../models/Card')
const router = Router()

router.post(
    "/getCardsByOrder",
    async (req, res)=>{
        let order = req.body.order
        let numberOfPage = req.body.numberOfPage
        let cardsPerPage = req.body.cardsPerPage
        let queryOrder = [];
        for (let i = 0; i < order.length; i++){
            queryOrder.push([order[i][0], order[i][1] ])
        }
        console.log(queryOrder)

        // GETTING ALL CARDS
        let cards = await Cards.findAll({
            attributes: ['img','cost','attack','health'],
            order: queryOrder
        })
        const length = cards.length/cardsPerPage
        // GETTING CARDS FOR CURRENT PAGE
        let cardsOnPage = [];
        for (let i = 0; i < cards.length; i++)
            cardsOnPage.push(cards[i].getDataValue('img'))
        cardsOnPage = cardsOnPage.slice((numberOfPage-1)*(cardsPerPage),numberOfPage*cardsPerPage)
        console.log(cardsOnPage)
        res.status(200).json({cards: cardsOnPage, length: length})
    }
)

module.exports = router