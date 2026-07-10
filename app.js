import express from 'express';
import productRouter from "./routes/route.product.js";
import healthRouter from "./routes/route.health.js";
import accountRouter from "./routes/route.account.js";
import cartRouter from "./routes/route.cart.js";
import { readFromJson } from "./service/service.file.js";


const app = express();

app.use(express.json()); //To get all of the body

const PORT = process.env.PORT;

// the diffrent routes of the server with their prefix.
app.use("/health", healthRouter);
app.use("/products", productRouter);
app.use("/account", accountRouter);
app.use("/cart", cartRouter);



app.get("/", (req, res) => {
    console.log("Hello to the ART online store");
    res.send("Hello to the ART online store we are so happy to see you again 😆");
});


app.listen(PORT, () => {console.log(`Server is running...`)});
