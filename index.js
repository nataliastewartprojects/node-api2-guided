const express = require("express");

const hubsRouter = require("./hubs/hubs-router.js");
const clientsRouter = require("./clients-router.js");
const productsRouter = require("./products-router.js");
const ordersRouter = require("./orders-router.js");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

//if the url begind with /api/hubs
server.use("/api/hubs", hubsRouter);
server.use("/api/clients", clientsRouter);
server.use("/api/products", productsRouter);
server.use("api/orders", ordersRouter);

//---------

// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});
