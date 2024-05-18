const express = require("express");
const fs = require("fs");

const PORT = 9000;

const app = express();

//products Data
const products = [
    {
        productId: 1,
        name: "Mobile"
    },
    {
        productId: 2,
        name: "Laptops"
    },
    {
        productId: 3,
        name: "Cloths"
    },
    {
        productId: 4,
        name: "Shoes"
    },
]

// Middleware Function
function checkMiddlewear(req, res, next){
    fs.appendFileSync("record-logs.log", `Request received ${req.url}. Method ${req.method}. IP ${req.ip}. New Date: ${new Date()} \n`);
    next();
}


// get Method
app.get("/products", checkMiddlewear, (req, res) => {
    // console.log(req.method);
    res.status(200).json({
        success : true,
        message : "Product Data fetch Sucessfully",
        data : products
    })
})

// handle path error
app.use("/*",(req, res) => {
    res.status(400).json({
        success : false,
        error : "Path not Found"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT} `);
})
