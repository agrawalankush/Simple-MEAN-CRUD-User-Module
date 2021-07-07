const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const path = require("path");
//define mongo url string and database
const mongourl = "mongodb://localhost:27017";
const dbName = "UserModule";

// Connect
const connection = (closure) => {
  return MongoClient.connect(
    mongourl,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) return console.log("Connection request to mongo failed", err);
      else {
        console.log("Mongodb connection successful!!");
        let db = client.db(dbName);
        closure(db);
      }
    }
  );
};
// Response handling
const response = {};

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message =
    "Internal server error, looks like I screwed up somewhere!!";
  res.status(501).json(response);
};

// Welcome API
router.get("/welcome", (req, res) => {
  res.end("Welcome to user module server!");
});
router.get("/user/all", (req, res, next) => {
  // console.log(req);
  connection((db) => {
    db.collection("users")
      .find({})
      .toArray()
      .then((allusers) => {
        // console.log(allusers);
        res.status(200).json(allusers);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});

router.delete("/user/:id", (req, res, next) => {
  connection((db) => {
    db.collection("users")
      .remove({
        _id: ObjectId(req.params.id),
      })
      .then((userdata) => {
        res.json({
          success: true,
          msg: `Deleted user ${userdata.firstName} successfully!!`,
        });
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});
router.post("/user/create", function (req, res) {
  // console.log(req.files);
  let uploadPath;
  let file = req.files.image;
  uploadPath = path.resolve(
    __dirname,
    "../../dist/profile_images/",
    req.files.image.name
  );
  // console.log('Upload Path', uploadPath); // Upload Path
  // console.log('list of the files',req.files); // list of the files
  // console.log('request body', req.body); // request body, like email
  file.mv(uploadPath, function (err, success) {
    return res.json({ success: true, msg: `File uploaded to ${uploadPath}` });
  });
  let userdata = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    image: `profile_images/${req.files.image.name}`,
    created: +new Date(),
  };
  //console.log(userdata);
  connection((db) => {
    db.collection("users")
      .insert(userdata)
      .then((userdata) => {
        response.data = userdata;
        res.json(userdata);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});
router.put("/user/update/:id", (req, res, next) => {
  // console.log(req);
  const query = { _id: ObjectId(req.params.id) };
  const update = { $set: req.body };
  const options = { upsert: false };
  connection((db) => {
    db.collection("users")
      .updateOne(query, update, options)
      .then((userdata) => {
        res.json({
          success: true,
          msg: `Updated user ${userdata.firstName} successfully!!`,
        });
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});
module.exports = router;
