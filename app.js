import express from 'express'

const app = express()

const PORT = process.env.PORT
console.log(PORT)

app.use("/", (req, res) => {
    console.log("Hello to the ART online store");
    res.send("Hello to the ART online store")
});

app.listen(PORT, () => {console.log(`Server is running...`)})

