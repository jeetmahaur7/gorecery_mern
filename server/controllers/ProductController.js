const Product = require("../models/Product")
const Newsletter = require("../models/Newsletter")

const mailer = require("../mailer")
async function createRecord(req, res) {
    try {
        const data = new Product(req.body)
        if (req.files) {
            data.pic = Array.from(req.files).map((x) => x.path)
        }
        await data.save()
        let finalData = await Product.findOne({ _id: data._id })
            .populate([
                {
                    path: "maincategory",
                    select: "name -_id"
                },
                {
                    path: "subcategory",
                    select: "name -_id"
                },
            ])

        const newsletters = await Newsletter.find()
        newsletters.forEach((x) => {
            mailer.sendMail({
                from: process.env.MAIL_SENDER,
                to: x.email,
                subject: "Checkout Our Latest Products : Team Ecom",
                text: `
                            Hello ${data.name}
                            Checkout Our Latest Products
                            Team : Ecom
                        `
            }, (error) => {
                // console.log(error)
            })
        })
        res.send({ result: "Done", data: finalData, message: "Record Created SuccessFully" })
    } catch (error) {
        console.log(error)

        const errorMessage = []
        error.errors?.name ? errorMessage.push({ name: error.errors.name.message }) : ""
        error.errors?.maincategory ? errorMessage.push({ maincategory: error.errors.maincategory.message }) : ""
        error.errors?.subcategory ? errorMessage.push({ subcategory: error.errors.subcategory.message }) : ""
        error.errors?.weight ? errorMessage.push({ size: error.errors.weight.message }) : ""
        error.errors?.basePrice ? errorMessage.push({ basePrice: error.errors.basePrice.message }) : ""
        error.errors?.discount ? errorMessage.push({ discount: error.errors.discount.message }) : ""
        error.errors?.finalPrice ? errorMessage.push({ finalPrice: error.errors.finalPrice.message }) : ""
        error.errors?.stock ? errorMessage.push({ stock: error.errors.stock.message }) : ""
        error.errors?.stockQuantity ? errorMessage.push({ stockQuantity: error.errors.stockQuantity.message }) : ""
        error.errors?.pic ? errorMessage.push({ pic: error.errors.pic.message }) : ""

        errorMessage.length === 0 ?
            res.status(500).send({ result: "Fail", reason: "Internal Server Error" }) :
            res.status(500).send({ result: "Fail", reason: errorMessage })
    }
}
async function getAllRecords(req, res) {
    try {
        const data = await Product.find().sort({ _id: -1 }).populate([
            {
                path: "maincategory",
                select: "name -_id"
            },
            {
                path: "subcategory",
                select: "name -_id"
            },
        ])
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}
async function getSingleRecord(req, res) {
    try {
        const data = await Product.findOne({ _id: req.params._id }).populate([
            {
                path: "maincategory",
                select: "name -_id"
            },
            {
                path: "subcategory",
                select: "name -_id"
            },
        ])
        if (data)
            res.send({ result: "Done", data: data })
        else
            res.send({ result: "Fail", reason: "Invalid ID, Record Not Found" })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}

async function updateRecord(req, res) {
    try {
        const data = await Product.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.maincategory = req.body.maincategory ?? data.maincategory
            data.subcategory = req.body.subcategory ?? data.subcategory
            data.weight = req.body.weight ?? data.weight
            data.basePrice = req.body.basePrice ?? data.basePrice
            data.discount = req.body.discount ?? data.discount
            data.finalPrice = req.body.finalPrice ?? data.finalPrice
            data.stock = req.body.stock ?? data.stock
            data.description = req.body.description ?? data.description
            data.stockQuantity = req.body.stockQuantity ?? data.stockQuantity
            data.active = req.body.active ?? data.active
            if (req.files) {
                try {
                    // const fs = require("fs")
                    // fs.unlinkSync(data.pic)
                } catch (error) { }
                data.pic = data.pic.concat(req.files.map((x) => x.path))
            }
            await data.save()
            let finalData = await Product.findOne({ _id: data._id })
                .populate([
                    {
                        path: "maincategory",
                        select: "name -_id"
                    },
                    {
                        path: "subcategory",
                        select: "name -_id"
                    },
                ])
            res.send({ result: "Done", data: finalData, message: "Record Updated SuccessFully" })
        }
        else
            res.send({ result: "Fail", reason: "Invalid ID, Record Not Found" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}

async function deleteRecord(req, res) {
    try {
        const data = await Product.findOne({ _id: req.params._id })
        if (data) {
            try {
                const fs = require("fs")
                data.pic.forEach((x) => fs.unlinkSync(x))
            } catch (error) { }
            await data.deleteOne()
            res.send({ result: "Done", message: "Record is Deleted" })
        }
        else
            res.send({ result: "Fail", reason: "Invalid ID, Record Not Found" })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}

module.exports = {
    createRecord,
    getAllRecords,
    getSingleRecord,
    updateRecord,
    deleteRecord
}