const dataBase = require('../config/db')
const Cards = require('../models/Card')
const Users = require('../models/User')
const unirest = require("unirest");



function dbConnection() {
    dataBase.authenticate()
        .then(async () => {
            console.log('Database is connected')
        })
}
async function usersTable() {
    Users.sync({force:true})
        .then(()=>{
            console.log('Users are created')
            Users.create({
            email: 'd',
            password: 'd'
        })})
}
async function initCards(created) {
    if (created){
        Cards.sync()
            .then(() => {
            console.log("Cards are connected")
            })
            .catch(() => {
                console.log("Cards went wrong")
            })
    }
    else {
        Cards.sync({force: true})
            .then(() => {
                const req = unirest("GET", "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/sets/Classic");
                req.query({ "collectible": "1" });
                req.headers({
                    "x-rapidapi-key": "28b2cc1257msh34f780462e6eb49p1bb4bejsn2e00aafe8cf1",
                    "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
                    "useQueryString": true
                });
                req.end(function (res) {
                    if (res.error) throw new Error(res.error);
                    for (let i = 0; i < res.body.length; i++){
                        Cards.create({
                            name: res.body[i].name,
                            type: res.body[i].type,
                            cost: res.body[i].cost,
                            attack: res.body[i].attack,
                            health: res.body[i].health,
                            img: res.body[i].img,
                        })
                    }
                });
            })
            .catch(() => {
                console.log('Cards went wrong')
            })
    }
}
module.exports.dbConnection = dbConnection;
module.exports.initCards = initCards;
module.exports.usersTable = usersTable;
