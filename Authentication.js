// const express = require('express');
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const work = require("./Auth_schema.js");
// const cors = require('cors');
// const User = require("./Auth_schema.js");

// mongoose.connect(
//     "mongodb+srv://het07savani:het7102004@cluster0.qcip5sp.mongodb.net/",
//     { useNewUrlParser: true }
// ).then(()=>{
//     const app = express();
//     app.use(bodyParser.urlencoded({ extended: true }));
//     app.use(bodyParser.json());
//     app.use(cors());
//     app.get('/', async (req,res)=>{
//         console.log(req.body);
//         const users = await User.find({email: req.body.email, password: req.body.password});
//         if(users == null){
//             res.sendStatus(404);
//         }
//         res.send(users[0]);
//     })
//     app.post('/search',async (req, res) => {
//         console.log(req.body);
//         const users = await User.find({email: req.body.email, password: req.body.password});
//         if(users.length == 0){
//             res.sendStatus(404);
//         }else{
//             res.send(users[0]);
//         }
//     })
//     app.post('/add', async (req,res)=>{
//         console.log(req.body);
//         const tempUser = new User({
//             email : req.body.email,
//             username : req.body.username,
//             password : req.body.password
//         })
//         try{
//             await tempUser.save();
//             res.json(tempUser);
//         }catch(err){
//             console.log("catch");
//             res.json({myError:"404"});
//         }
//     });
//     app.post('/login', (req, res) => {
//         const { email, password } = req.body;
      
//         // Find the user with the provided email
//         const user = users.find(user => user.email === email);
      
//         if (!user || user.password !== password) {
//           // If user is not found or password does not match, return error response
//           return res.status(401).json({ error: 'Invalid email or password' });
//         }
      
//         // If user is found and password matches, return success response
//         res.json({ message: 'Login successful', user });
//       });
//     app.listen(3030,()=>{
//         console.log("Server started at localhost : 3030");
//     })
// })
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const work = require("./Auth_schema.js");
const cors = require("cors");
const User = require("./Auth_schema.js");

mongoose
  .connect(
    "mongodb+srv://het07savani:het7102004@cluster0.qcip5sp.mongodb.net/",
    { useNewUrlParser: true }
  )
  .then(() => {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    app.get("/", async (req, res) => {
      console.log(req.body);
      const users = await User.find({
        email: req.body.email,
        password: req.body.password,
      });
      if (users == null) {
        res.sendStatus(404);
      }
      res.send(users[0]);
    });
    app.post("/search", async (req, res) => {
      console.log(req.body);
      const users = await User.find({
        email: req.body.email,
        password: req.body.password,
      });
      if (users.length == 0) {
        res.sendStatus(404);
      } else {
        res.send(users[0]);
      }
    });
    app.post("/add", async (req, res) => {
      console.log(req.body);
      const tempUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        pastMeetings: [
          //   {
          // ID: "exampleID", // Provide a valid ID
          // chats: [
          //   { name: "exampleName", message: "exampleMessage" } // Provide valid name and message
          // ]
          //   }
        ],
      });
      try {
        await tempUser.save();
        res.json(tempUser);
      } catch (err) {
        console.log("catch", err);
        res.json({ myError: "404" });
      }
    });
    app.post("/storechat", async (req, res) => {
      console.log(req.body);
      const valuesArray = Object.values(req.body.data);
      console.log(valuesArray);
      const id = req.body.id;

      const user = await User.findByIdAndUpdate(id, {
        $push: {
          pastMeetings: {
            ID: req.body.meetingId,
            members: req.body.highMember,
            startTime: req.body.startDatetime,
            endTime: req.body.endDatetime,
            chats: valuesArray,
          },
        },
      });
    });
    app.post("/getstoredmeetings", async (req, res) => {
      const id = req.body.userId;
      console.log(id);
      const user = await User.findById(id);
      console.log(user);
      res.send(user);
    });
    app.post("/storedchat", async (req, res) => {
      console.log(req.body);
      const id = req.body.userId;
      console.log(id);
      if (req.body.isClearAll) {
        // console.log("wjgh")
        const user = await User.findByIdAndUpdate(
          id,
          // { $set: { "pastMeetings.$.chats": [] } },
          { $set: { pastMeetings: [] } },
          { new: true }
        );
        res.send();
      }
      const user = await User.findById(id);
      const meets = user.pastMeetings;
      for (i = 0; i < meets.length; i++) {
        if (meets[i].ID == req.body.meetingId) {
          res.send(meets[i]);
        }
      }
      res.send();
    });
    app.post("/login", (req, res) => {
      const { email, password } = req.body;

      // Find the user with the provided email
      const user = users.find((user) => user.email === email);

      if (!user || user.password !== password) {
        // If user is not found or password does not match, return error response
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // If user is found and password matches, return success response
      res.json({ message: "Login successful", user });
    });
    app.listen(3030, () => {
      console.log("Server started at localhost : 3030");
    });
  });
