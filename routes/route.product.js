import express from "express";
import { readFromJson } from "../service/service.file.js";

const router = express.Router()

const DB_BASE_PATH = process.env.DB_BASE_PATH

router.get("/", async(req, res) => {

    const products = await readFromJson(`${DB_BASE_PATH}/db.product.json`)

    console.log("GET/products")

    const {inStock} = req.query
    const {maxPrice} = req.query
    const {search} = req.query

    let  productsSendToClient = products

    
    // console.log(typeof +maxPrice === "number");
    

    if (inStock && inStock === "true"){
        console.log("inStock")
        const productsInStock = productsSendToClient.filter((product) => {return product.stock > 0})
        productsSendToClient = productsInStock 
        }

    if (maxPrice && typeof +maxPrice === "number"){
        console.log("maxPrice")
        const productsInBudget = productsSendToClient.filter((product) => {return product.price <= +maxPrice}) 
        productsSendToClient = productsInBudget
        }

    if (search) {
        console.log("search")
        const productsName = productsSendToClient.filter((product) => {return product.name.toLowerCase() === search.toLowerCase()})
        console.log(productsName)
        productsSendToClient = productsName
        }

    if( productsSendToClient.length === 0 ){ 
        return res.status(404).json({success: false, message: "Not found!"})

    } else if (productsSendToClient.length !== products.length ){
        return res.json(productsSendToClient);
    }
    
    console.log(Object.keys(req.query).length === 0)
    if (Object.keys(req.query).length === 0){
        console.log("ll object")
        return res.json(productsSendToClient)
    }

});

export default router