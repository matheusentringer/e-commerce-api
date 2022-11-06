const Cart = require("../models/Cart")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")

const router = require("express").Router()

//GET
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.find({userId: req.params.userId})
    res.status(200).json(cart)
  } catch {
    return res.status(500).json(error)
  }
})

//GET ALL PRODUCTS
router.get("/", verifyTokenAndAdmin, async (req, res) => {

  try {
    const carts = await Cart.find()
    res.status(200).json(carts)
  } catch (error) {
    return res.status(500).json(error)
  }

})

//CREATE
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body)

  try {
    const savedCart = await newCart.save()
    res.status(200).json(savedCart)
  } catch (error) {
    return res.status(500).json(error)
  }
})

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {new: true})
    res.status(200).json(updatedCart)
  } catch(error) {
    return res.status(500).json(error)
  }
})

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id)
    return res.status(200).json("Cart has been deleted")
  } catch {
    return res.status(500).json(error)
  }
})


module.exports = router