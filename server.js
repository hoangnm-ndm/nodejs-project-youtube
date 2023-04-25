const express = require("express");
const app = express();

const PORT = 8000;

// const server = http.createServer((req, res) => {
//   const path = url.parse(req.url).pathname;
//   console.log(path);
//   const method = req.method.toUpperCase();
//   console.log(method);
//   switch (method) {
//     case "GET":
//       // xu ly lay du lieu
//       if (path === "/getall") {
//         const products = ["product A", "product B", "product C"];
//         // res.send(`<h1>Xin chao cac ban!</h1>`);
//         res.end(JSON.stringify(products));
//       } else {
//         res.statusCode = 404;
//         res.end("Not found");
//       }
//       break;
//     case "POST":
//       // xu ly tao moi du lieu
//       break;

//     case "UPDATE":
//       // xu ly cap nhat du lieu
//       break;
//     case "DELETE":
//       // xu ly xoa du lieu
//       break;
//   }
// });

const products = [
  {
    id: "111",
    name: "Quan jogger sieu hin",
    price: 200,
  },
  {
    id: "222", //unique
    name: "Ao len co lo",
    price: 300,
  },
  {
    id: "333",
    name: "Ao blazer nam thu dong hot trend",
    price: 500,
  },
];

app.get("/", (req, res) => {
  res.send(products);
});

app.get("/:id", (req, res) => {
  const product = products.find((product) => {
    return product.id === req.params.id;
  });
  res.send(product);
});

app.post("/create", (req, res) => {
  res.send("Tao san pham thanh cong");
});
app.put("/update", (req, res) => {
  res.send("Cap nhat san pham thanh cong");
});

app.delete("/remove", (req, res) => {
  res.send("Xoa san pham thanh cong");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
