const prisma = require("../../config/prisma/db.js")

const createCategory = async(req,res)=> {
    const {name} = req.body
    const findCategory = await prisma.category.findUnique({where:{name:name}})
    if (findCategory){
        res.status(400).json({ error: 'name has been already taken.' });
    }
    else{
        const newCategory = await prisma.category.create({
            data : {
                name:name,
                
            }
        });
        res.status(201).json({ message: 'Category created successfully.' });    
    }
}

const getAllCategories = async(req,res)=> {
    const findCategory = await prisma.category.findMany({include:{
        products:true,
    }})
    if (findCategory){
        res.status(201).send(findCategory);
    }
    else{
        res.status(400).json({ error: 'Categorynot found' }); 
    }
}

const getCategory = async(req,res)=> {
    const id = req.params.id
    const findCategory = await prisma.category.findUnique(
        {where:{
            id:Number(id)
        },
        include:{
            products:true,
        }
    })
    if (findCategory){
        res.status(200).send(findCategory);
    }
    else{
        res.status(400).json({ error: 'Category not found' }); 
    }
}

const deleteCategory = async(req,res)=> {
    const id = parseInt(req.params.id)
    const findCategory = await prisma.category.delete({where:{id:id}})
    if (findCategory){
        res.status(200).json({ message: 'Category deleted successfully' }); 
    }
    else{
        res.status(400).json({ error: 'Category cannnot be deleted.' }); 
    }
}

const updateCategory = async(req,res)=> {
    const id = req.params.id
    const {name} = req.body
    const updatecategory = await prisma.category.update({where:{id:Number(id)},data:{name},include:{
        products:true,
    }})
    if (updatecategory){
        res.status(200).send(updatecategory)
    }
    else{
        res.status(400).json({ message: 'Category cannot update .' });    
    }
}

// console.log(createProduct)
module.exports ={
    createCategory,
    getAllCategories,
    getCategory,
    deleteCategory,
    updateCategory
}