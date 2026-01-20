const router = require('express').Router()
const categoryController = require("../../controllers/prisma/categoryController")


router.post("/createCategory",categoryController.createCategory)
router.get("/getAllCategories",categoryController.getAllCategories)
router.get("/getCategory/:id",categoryController.getCategory)
router.delete("/deleteCategory/:id",categoryController.deleteCategory)
router.put("/updateCategory/:id",categoryController.updateCategory)


module.exports = router;