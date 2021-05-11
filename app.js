const express = require("express");
const mongo = require("./mongo");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", mongo.getUsers);

app.post("/", mongo.creatUser);

app.patch("/users/:name", mongo.updateUser);

app.delete("/users/:name", mongo.deleteUser);

app.listen(PORT, console.log(`server is running on port ${PORT}`));
