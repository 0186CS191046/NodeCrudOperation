const prisma = require("../../config/prisma/db.js")

const createProduct = async(req,res)=> {
    const {name,price,description,categoryId} = req.body
    const findProduct = await prisma.product.findUnique({where:{name:name}})
    if (findProduct){
        res.status(400).json({ error: 'name has been already taken.' });
    }
    else{
        const newProduct = await prisma.product.create({
            data : {
                name:name,
                price:price,
                description:description  ,
                categoryId : categoryId,
            }
        });
        res.status(201).json({ message: 'Product  created successfully.' });    
    }
}

const getAllProducts = async(req,res)=> {
    const findProduct = await prisma.product.findMany({})
    if (findProduct){
        res.status(201).send(findProduct);
    }
    else{
        res.status(400).json({ error: 'Product not found' }); 
    }
}

const getProduct = async(req,res)=> {
    const id = req.params.id
    const findProduct = await prisma.product.findUnique({where:{id:Number(id)}})
    if (findProduct){
        res.status(200).send(findProduct);
    }
    else{
        res.status(400).json({ error: 'Product not found' }); 
    }
}

const deleteProduct = async(req,res)=> {
    const id = parseInt(req.params.id)
    const findProduct = await prisma.product.delete({where:{id:id}})
    if (findProduct){
        res.status(200).json({ message: 'Product deleted successfully' }); 
    }
    else{
        res.status(400).json({ error: 'Product cannnot be deleted.' }); 
    }
}

const updateProduct = async(req,res)=> {
    const id = req.params.id
    const {name,price,description,categoryId} = req.body
    const updateProduct = await prisma.product.update({where:{id:Number(id)},data:{name,price,description,categoryId}})
    if (updateProduct){
        res.status(200).send(updateProduct)
    }
    else{
        res.status(400).json({ message: 'Product cannot update .' });    
    }
}

// console.log(createProduct)
module.exports ={
    createProduct,
    getAllProducts,
    getProduct,
    deleteProduct,
    updateProduct
}