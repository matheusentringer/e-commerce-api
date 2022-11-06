const Product = require("../models/Product")
const { verifyTokenAndAdmin } = require("./verifyToken")

const router = require("express").Router()

//GET
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.status(200).json(product)
  } catch {
    return res.status(500).json(error)
  }
})

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const queryNew = req.query.new
  const queryCategory = req.query.category
  try {
    let products
    
    if (queryNew) {
      products = await Product.find().sort({ _id: -1 }).limit(5)
    } else if (queryCategory) {
      products = await Product.find(
        {
          categories: {
            $in: [queryCategory]
          }
        }
      )
    } else {
      products = await Product.find()
    }

  res.status(200).json(products)

  } catch {
    return res.status(500).json(error)
  }
})

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body)

  try {
    const savedProduct = await newProduct.save()
    res.status(200).json(savedProduct)
  } catch (error) {
    return res.status(500).json(error)
  }
})

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {new: true})
    res.status(200).json(updatedProduct)
  } catch(error) {
    return res.status(500).json(error)
  }
})

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    return res.status(200).json("Product has been deleted")
  } catch {
    return res.status(500).json(error)
  }
})


module.exports = router