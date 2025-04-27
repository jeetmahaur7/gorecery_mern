const CheckoutRouter = require("express").Router()
const { verifyAdmin, verifyBoth } = require("../middleware/verification")
const {
    createRecord,
    getAllRecords,
    getSingleRecord,
    updateRecord,
    deleteRecord,
    getAllUserRecords
} = require("../controllers/CheckoutController")

CheckoutRouter.post("/", verifyBoth, createRecord)
CheckoutRouter.get("/", verifyAdmin, getAllRecords)
CheckoutRouter.get("/user/:userid", verifyBoth, getAllUserRecords)
CheckoutRouter.get("/:_id", verifyBoth, getSingleRecord)
CheckoutRouter.put("/:_id", verifyAdmin, updateRecord)
CheckoutRouter.delete("/:_id", verifyAdmin, deleteRecord)

module.exports = CheckoutRouter