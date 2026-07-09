import express from 'express'
import productRouter from "./routes/route.product.js"
import { readFromJson } from "./service/service.file.js"

const app = express()

const PORT = process.env.PORT

console.log(PORT)


app.use("/products", productRouter)

app.get("/", (req, res) => {
    console.log("Hello to the ART online store");
    res.send("Hello to the ART online store we are so happy to see you again 😆")
});


app.listen(PORT, () => {console.log(`Server is running...`)})
