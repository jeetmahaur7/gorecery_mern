const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")

const Router = require("./routes/index")

require("./db_connect")
const app = express()

var whitelist = ['http://localhost:5173', 'http://localhost:8000',]
var corsOptions = {
    origin: function (origin, callback) {
        console.log(origin)
        if (whitelist.includes(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('You Are not authenciated to access this api'))
        }
    }
}

app.use(cors(corsOptions))
app.use(express.json())
app.use("/api", Router)
app.use(express.static("./public"))
app.use("/public", express.static("./public"))

app.listen(8000, console.log("Server is Running at http://localhost:8000"))

