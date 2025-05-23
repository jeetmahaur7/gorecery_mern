const ProductRouter = require("express").Router()
const { productUploader } = require("../middleware/fileUploader")
const { verifyAdmin } = require("../middleware/verification")
const {
    createRecord,
    getAllRecords,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../controllers/ProductController")

ProductRouter.post("/", verifyAdmin, productUploader.array("pic"), createRecord)
ProductRouter.get("/", getAllRecords)
ProductRouter.get("/:_id", getSingleRecord)
ProductRouter.put("/:_id", verifyAdmin, productUploader.array("pic"), updateRecord)
ProductRouter.delete("/:_id", verifyAdmin, deleteRecord)

module.exports = ProductRouter