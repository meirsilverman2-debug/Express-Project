import express from "express";
import { readFromJson, writeToJson } from "../service/service.file.js";

const router = express.Router();
const DB_BASE_PATH = process.env.DB_BASE_PATH;


// The first cart route that gets the cart of a specific customer:
router.get("/", async (req, res) => {

    const customers = await readFromJson(`${DB_BASE_PATH}/db.customer.json`);
    const { customerId } = req.query;

    if (customerId && typeof +customerId === "number") {

        const customer = customers.find((customer) => { return customer.customerId === +customerId });
        if (!customer) return res.status(404).json({ success: false, message: "ERROR customer not fuond" });

        return res.status(200).json({ success: true, data: `The cart of customer-${JSON.stringify(customer.customerId)} : ${JSON.stringify(customer.cart)}` });
    } else {
        return res.status(400).json({ success: false, message: "ERROR no such path maybe you forgot a query" });
    };
});




// The seconde cart route that add a product to a specific customer cart only if they exsit and the only if the product is available in stock:
router.post("/items", async (req, res) => {

    console.log("/items");

    const customers = await readFromJson(`${DB_BASE_PATH}/db.customer.json`);
    const products = await readFromJson(`${DB_BASE_PATH}/db.product.json`)

    const { customerId } = req.body;
    const { productId } = req.body;
    const { quantity } = req.body;

    if (customerId && productId && quantity && !isNaN(+quantity) && !isNaN(+productId) && !isNaN(+customerId) && quantity > 0) {

        const customer = customers.find((customer) => { return customer.customerId === +customerId });
        const product = products.find((product) => { return product.id === +productId });

        console.log(customer);
        console.log(customers);
        console.log(products);
        console.log(product);

        if (!customer) return res.status(404).json({ success: false, message: "ERROR: customer not found in our system" });
        if (!product) return res.status(404).json({ success: false, message: "ERROR: product is not found in our system" });
        if (product.stock === 0) return res.status(400).json({ success: false, message: "ERROR: cannot make this request out of stock for this product sorry, sad face" });
        if (quantity > product.stock) return res.status(400).json({ success: false, message: "ERROR: you cannot add that many products in to your cart OK " });


        // To check if it this product is already exsits in the cart so we only need to raise the quantity of the product and not add the same product separate twice.
        const isItIncludeInTheCart = customer.cart.find((item) => item.productId === product.id);
        console.log(isItIncludeInTheCart);
        if (isItIncludeInTheCart) {

            customer.cart.map((item) => {
                if (item === isItIncludeInTheCart) {
                    item.quantity += 1;
                }
            })
            await writeToJson(`${DB_BASE_PATH}/db.customer.json`, customers);
            return res.status(200).json({ success: true, data: req.body });

        // if the product does not in the cart of the customer yet.    
        } else if (!isItIncludeInTheCart) {

            customer.cart.push({ productId: product.id, quantity: +quantity });
            await writeToJson(`${DB_BASE_PATH}/db.customer.json`, customers);
            return res.status(200).json({ success: true, data: req.body });

        }} else {
        return res.status(400).json({ success: false, message: "ERROR: not a valid path oh nooo you got lost" });
    };
});


















export default router;