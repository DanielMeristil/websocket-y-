import { Router } from "express";
import upload from "../utils/upload.middleware.js";

import ProductsSRC from "../products.src.js";


const router = Router();
export default router;

// /products -> Muestro todos los productos
// /products?stock -> Muestre todos los productos con stock
router.get("/", async (req, res) => {

    let withStock = req.query.stock;

    let products;
    if(withStock === undefined){
        products = await ProductsSRC.getAll();
    } else {
        products = await ProductsSRC.getAllWithStock();
    }

    res.render("products",{products});

});

// /products/new
router.get("/new", (req, res) => {
    res.render("new-product");
})

router.get("/:id", async (req, res) => {

    let id = req.params.id;

    if(!id){
        res.redirect("/products/");
    }

    let product = await ProductsSRC.getById(id);

    if(!product){
        res.render("404");
    }

    res.render("product",{
        title:product.title,
        description: product.description,
        photo: product.photo,
        price: product.price,
        isStock: product.stock > 0
    });

});


router.post("/", upload.single('image'), async (req, res) => {

    let filename = req.file.filename; // 17071
    let product = req.body;

    await ProductsSRC.add(product.title, product.description, filename, product.price, product.stock);

    res.redirect("/products");

})

