import express from "express";
import { readFromJson } from "../service/service.file.js";

const DB_BASE_PATH = process.env.DB_BASE_PATH

const router = express.Router();

router.get("/", async(req, res) => {

    const {customerId} = req.query;
    const orders = await readFromJson(`${DB_BASE_PATH}/db.order.json`);

    if (!customerId || isNaN(+customerId)) return res.status(400).json({success: false, message: "ERROR invalid request"});

    const customerOrders = orders.filter((order) => order.customerId === +customerId);

    if (customerOrders.length === 0) return res.status(404).json({success: false, message: "ERROR this order does not exsit in our system maybe you made a mistake in your search "});

    res.status(200).json({success: true, data: `here is all of your orders: ${customerOrders}`})

    if (Object.keys(req.query).length === 0) return res.status(400).json({success: false, message: "ERROR missing query"});
});

router.post("/checkout", async(req, res) => {
    const customers = readFromJson(`${DB_BASE_PATH}/db.customer.json`);
    const products = readFromJson(`${DB_BASE_PATH}/db.product.json`);

    if (Object.keys(req.body).length === 0) return res.status(400).json({success: false, message: "ERROR bad request"});

    const {customerId} = req.body;
    const customer = customers.find((customer) => {return customer.customerId === +customerId});

    console.log(customers);
    console.log(products);
    console.log(customer);
    console.log(customer.cart);
    
    if (!customer) return res.status(404).json({success: false, message: "ERROR customer is not found in out system"});

    const items = customer.cart



});




export default router;