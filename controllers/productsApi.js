const Product = require('../models/product')

const getProduct = async (req,res) => {
    let data;
    try{
        if(req.params.id){
            data = await Product.findOne({'id': req.params.id}, '-_id -__v');
            res.status(200).json(data);
        } else{
            data = await Product.find({}, '-_id -__v')
            res.status(200).json({products:data})
        }
    }catch(err){
        res.status(400).json({"error":err})
    } 
}

const createProduct = async (req,res) => {
    try{
        const product = new Product(req.body);
        const result = await product.save();

        console.log('Product created');
        console.log(result);
        res.status(201).json(result);
    } catch(err){
        res.status(400).json({"error":err})
    }  
}

const product = {
    getProduct,
    createProduct
}
module.exports = product;