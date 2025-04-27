const mongoose = require('mongoose')

// mongoose.connect("mongodb://127.0.0.1:27017/supermarket")
//     .then(() => {
//         console.log("Database is connected")
//     })
//     .catch((error) => {
//         console.log(error)
//     })

async function getConnect() {
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/supermarket")
        console.log("Database is connected")
    } catch (error) {
        console.log(error)
    }
}
getConnect()