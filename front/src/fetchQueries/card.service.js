const START_URL = "http://localhost:8080/"

const getCardsByOrder = (order, numberOfPage, cardsPerPage) => {
    return fetch(START_URL + 'getCardsByOrder', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type' : 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ order: order, numberOfPage: numberOfPage, cardsPerPage: cardsPerPage })
    })
}

export default {
    getCardsByOrder
}