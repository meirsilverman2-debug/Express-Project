import express from "express";
import { readFromJson } from "../service/service.file.js";

const router = express.Router()




// for testing the  URL path
// const products = [
//   {
//     "id": 1,
//     "name": "Acrylic Paint Set",
//     "price": 89.9,
//     "stock": 25
//   },
//   {
//     "id": 2,
//     "name": "Canvas 40x50 cm",
//     "price": 34.5,
//     "stock": 40
//   },
//   {
//     "id": 3,
//     "name": "Professional Paint Brushes Set",
//     "price": 129.0,
//     "stock": 18
//   },]

const DB_BASE_PATH = process.env.DB_BASE_PATH

router.get("/", async(req, res) => {

    const products = await readFromJson(`${DB_BASE_PATH}/db.product.json`)

    console.log("GET/products")

    const {inStock} = req.query
    const {maxPrice} = req.query
    const {search} = req.query

    let  productsSendToClient = products

    if (inStock){
        console.log("inStock")
        const productsInStock = productsSendToClient.filter((product) => {return product.stock > 0})
        productsSendToClient = productsInStock 
        }

    if (maxPrice && typeof maxPrice === Number){
        console.log("maxPrice")
        const productsInBudget = productsSendToClient.filter((product) => {return product.price <= maxPrice}) 
        productsSendToClient = productsInBudget
        }

    if (search) {
        console.log("search")
        // console.log(typeof search)
        // console.log(search)
        // console.log(productsSendToClient[3].name)
        // console.log(productsSendToClient[3] === search)
        const productsName = productsSendToClient.filter((product) => {return product.name.toLowerCase() === search.toLowerCase()})
        console.log(productsName)
        productsSendToClient = productsName
        }

    if( productsSendToClient.length === 0 ){ 
        return res.status(404).json({err: "Not found!"})

    } else if (productsSendToClient.length !== 0 ){
        return res.json(productsSendToClient);
    }
    
    console.log(Object.keys(req.query).length === 0)
    if (Object.keys(req.query).length === 0){
        return res.json(productsSendToClient)
    }

});

export default router