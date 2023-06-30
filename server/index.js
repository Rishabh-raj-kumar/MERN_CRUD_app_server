const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const User = require("./models/dataSchema");
const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://Rishabh_db:rishabh_db_678@rishabhcluster.eebt3nr.mongodb.net/";
const client = new MongoClient(url);

app.use(express.json());
app.use(cors());

mongoose.connect(url, { useNewUrlParser: true });

var conn = mongoose.connection;
conn.on("connected", function () {
  console.log("database is connected successfully");
});
conn.on("disconnected", function () {
  console.log("database is disconnected successfully");
});
conn.on("error", console.error.bind(console, "connection error:"));

app.get("/", async (req, res) => {
  let result = await client.connect();
  db = result.db("test");
  collection = db.collection("users");

  let data = await collection.find({}).toArray();
  res.json(data);
});

app.post("/insert", async (req, res) => {
  const FirstName = req.body.fullName;
  const CompanyRole = req.body.companyRole;

  console.log(FirstName, CompanyRole);

  const formData = new User({
    name: FirstName,
    role: CompanyRole,
  });

  try {
    await formData.save();
    res.send("inserted data..");
  } catch (err) {
    console.log(err);
  }
});

app.post("/update/:id").post(async function (req, res) {
  let result = await client.connect();
  db = result.db("test");
  collection = db.collection("users");

  collection.findById(req.params.id, function (err, employee) {
    if (!employee)
      return next(new Error("Unable To Find Employee With This Id"));
    else {
      employee.name = req.body.fullName;
      employee.role = req.body.companyRole;

      employee
        .save()
        .then((emp) => {
          res.json("Employee Updated Successfully");
        })
        .catch((err) => {
          res.status(400).send("Unable To Update Employee");
        });
    }
  });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`http://localhost:` + port);
});
