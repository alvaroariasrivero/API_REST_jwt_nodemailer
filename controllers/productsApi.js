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
    console.log("***************");
    // Se guardaran cosas en la BBDD
    console.log(req.body); // En req.body está el objeto a guardar
    // Guardar en la BBDD MongoDB

    try{
        // const product = new Product(req.body); // Genero el nuevo documento
        // const result = await product.save(); // Lo guarda en BBDD

        // console.log("Producto creado!!!!!**************");
        // console.log(result);
        // res.status(201).json(result);
        res.status(200).json({msg: 'logrado'})
    } catch(err){
        res.status(400).json({"error":err})
    }  
}

const product = {
    getProduct,
    createProduct
}
module.exports = product;