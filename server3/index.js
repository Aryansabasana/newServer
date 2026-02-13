const express = require("express");
const app = express();
app.use(express.json()); 

const products = [
{
"id": 1,
"title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
"price": 109.95,
"category": "men's clothing",
"image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
"rating": {
"rate": 3.9,
"count": 120
}
},
{
"id": 2,
"title": "Mens Casual Premium Slim Fit T-Shirts ",
"price": 22.3,
"category": "men's clothing",
"image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
"rating": {
"rate": 4.1,
"count": 259
}
},
{
"id": 3,
"title": "Cotton Jacket",
"price": 55.99,
"category":"women's clothing",
"image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
"rating": {
"rate": 4.7,
"count": 500
}
}] ;

//fetching all  products
app.get("/all", (req, res) => {
  res.status(200).json(products);
});


//fetching products by id


app.get("/products/:id", (req, res) => {
  const productId = Number(req.params.id);
  const product = products.find(u => u.id === productId);

  if (!product) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(product);
});


//posting products


// app.post("/products", (req, res) => {
//   const newProduct = {
//     id: products.length + 1,
//     title: req.body.title,
//     price: req.body.price,
//     category: req.body.category,
//     image: req.body.image,
//     rating: req.body.rating
//   };

//   products.push(newProduct);

//   res.status(201).json({
//     message: "Product added successfully",
//     product: newProduct
//   });
// });


//fetching by category
app.get("/category/:type", (req, res) => {
  const categoryType = req.params.type;

  const filteredProducts = products.filter(
    product => product.category === categoryType
  );

  if (filteredProducts.length === 0) {
    return res.status(404).json({ message: "No products found" });
  }

  res.status(200).json(filteredProducts);
});

//posting multiple products

app.post("/products", (req, res) => {
  const arr = req.body

  res.status(201).json({
    message: "Products added successfully",
    products
  });
});




app.listen(3000, () => {
  console.log("Server started on port 3000");
});



