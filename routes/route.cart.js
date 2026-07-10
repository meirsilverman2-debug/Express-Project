import express from "express";
import { readFromJson } from "../service/service.file.js";

const router = express.Router();
const DB_BASE_PATH = process.env.DB_BASE_PATH;

router.get("/", async(req, res) => {

    const customers = await readFromJson(`${DB_BASE_PATH}/db.customer.json`);
    const {customerId} = req.query;

    if (customerId && typeof +customerId === "number") {

        const customer = customers.find((customer) => {return customer.customerId === +customerId});
        if (!customer) return res.status(404).json({success: false, message: "ERROR customer not fuond"})

        return res.status(200).json({success: true, data: `The cart of customer-${JSON.stringify(customer.customerId)} : ${JSON.stringify(customer.cart)}`})
    } else {
        return res.status(400).json({success: false, message: "ERROR no such path maybe you forgot a query"})
    };
});

export default router;