import express from "express";
import { readFromJson } from "../service/service.file.js";



const router = express.Router()



router.get("/", (req, res) => {
    console.log("Got into health file")
    res.json({message: "workingggggggggggggg"})
})

export default router