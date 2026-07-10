import express from "express";
import { readFromJson } from "../service/service.file.js";


const router = express.Router();
const DB_BASE_PATH = process.env.DB_BASE_PATH;


router.get("/", async(req, res) => {

    const {customerId} = req.query;
    const customers = await readFromJson(`${DB_BASE_PATH}/db.customer.json`);

    if(customerId && typeof +customerId === "number"){
        const customer = customers.find((customer) => customer.customerId === +customerId)

        if (!customer) return res.status(404).json({success: false, message: "ERROR customer is not found in our system please try again"})

            return res.status(200).json({success: true, data: `The balance of customer ${customerId} is ${customer.balance} shekels`})
    } else {
        return res.status(400).json({success: false, message: "you should add a query to the search"});
    }
});

export default router;