const router = require('express').Router()
const productController = require("../../controllers/prisma/productControllers.js")


router.post("/createproduct",productController.createProduct)
router.get("/getAllproducts",productController.getAllProducts)
router.get("/getproduct/:id",productController.getProduct)
router.delete("/deleteproduct/:id",productController.deleteProduct)
router.put("/updateproduct/:id",productController.updateProduct)


module.exports = router;