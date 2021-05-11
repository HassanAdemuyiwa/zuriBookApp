const { MongoClient } = require("mongodb");

const mongoPath =
  "mongodb+srv://bookuser:ZajFOqHUwHnvdo85@zuritraining.v3mh6.mongodb.net/personDB?retryWrites=true&w=majority";


//creat User

const creatUser = async (req, res, next) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    country: req.body.country,
  };

  const client = new MongoClient(mongoPath);

  try {
    await client.connect();
    const db = client.db();
    const result = db.collection("users").insertOne(newUser);
    return res.json({ message: "user added successfully", newUser: newUser });
  } catch (error) {
    return res.json({ message: "Data not stored" });
  } finally {
    await client.close();
  }
};


// find user

const getUsers = async (req, res, next) => {
  const client = new MongoClient(mongoPath);

  let users;

  try {
    await client.connect();
    const db = client.db();
    users = await db.collection("users").find().toArray();
    return res.json({ message: "users retrived successfully", users: users });
  } catch (error) {
    return res.json({ message: "can't retrive users" });
  } finally {
    await client.close();
  }
};



// Update User
const updateUser = async (req, res, next) => {
  const client = new MongoClient(mongoPath);

  const { email, country } = req.body;

  const name = req.params.name;

  try {
    await client.connect();
    const db = client.db();
    const result = await db
      .collection("users")
      .updateOne({ name: name }, { $set:{"email": email, "country": country} });
    return res.json({ message: "user updated successfully", users: users });
  } catch (error) {
    return res.json({ message: "can't update  user" });
  } finally {
    await client.close();
  }
};



//Delete User

const deleteUser = async (req, res, next) => {
  const client = new MongoClient(mongoPath);
  
  const name = req.params.name

  try {
    await client.connect();
    const db = client.db();
    const result = await db.collection("users").deleteOne({name: name});
    return res.json({ message: "users deleted successfully", users: users });
  } catch (error) {
    return res.json({ message: "can't delete users" });
  } finally {
    await client.close();
  }
};

exports.creatUser = creatUser;
exports.getUsers = getUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
