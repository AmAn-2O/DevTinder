const express = require("express");
// const { adminAuth } = require("./middlewares/auth");
const app = express();
const connectDB = require("./config/database.js");
const User = require("./models/user.js");

// GET /users ==> middleware chain ==> request handler

//Below function is called responds handler

// app.use("/hello", (req, res) => {
//   res.send("hello from the server!");
// });

// app.use("/", (req, res) => {
//   res.send("Hello from the Express server!");
// });
// in this if i am going to hit 3000/any name it responds the same because we are not using any specific route we said to respond to all requests.
//will the sequence of the routes matter? Yes, it does. The first matching route will be executed.

//this will only handles the GET calls to /users

//for dynamic routes we can use the colon :
// app.get("/users/:id", (req, res) => {
// app.get("/users/:userId", (req, res) => {
//   console.log(req.params); // this will log the query parameters in the console
//   res.send({ firstName: "John", lastName: "Doe" });
// });
// app.get("/users", (req, res) => {
//   console.log(req.query); // this will log the query parameters in the console
//   res.send({ firstName: "John", lastName: "Doe" });
// });

//it will matches /users or /users/anything// example of ab?c there is abc or ac
// app.get(/^\/ab?c$/, (req, res) => {
//   res.send({ firstName: "John", lastName: "Doe" });
// });

// there is also used group /a(bc)?d

// this will match /abcd or /abjljljlcd
// app.get(/^\/ab*cd$/, (req, res) => {
//   res.send({ firstName: "John", lastName: "Doe" });
// });

//  example of ab+c there will be abbbc abbc
// app.get(/^\/ab+c$/, (req, res) => {
//   res.send({ firstName: "John", lastName: "Doe" });
// });

// app.get("/users", (req, res) => {
//   res.send({ firstName: "John", lastName: "Doe" });
// });

// app.delete("/users", (req, res) => {
//   res.send("User deleted successfully!");
// });

// app.patch("/users", (req, res) => {
//   res.send("User updated successfully!");
// });

// app.put("/users", (req, res) => {
//   res.send("User updated successfully with PUT!");
// });

// app.post("/users", (req, res) => {
//   res.send("Data Sucessfully Sended to the Database!");
// });

// //this will match all the HTTP methods API calls to /test
// app.use("/test", (req, res) => {
//   res.send("test, from to the Express server!");
// });

//this is the one way of sending route handlers inside route handlers
// app.use(
//   "/users",
//   //you can use multiple route handlers for the same route
//   //this is an array of route handlers, you can use multiple route handlers for the same
//   [
//     (req, res, next) => {
//       //route handler if you don't send the response back it just went into loops infact using console.log like if you are not sending anything back in the route handler your response will hang no matter that there is another route handlder defined or not for this there is a next() function which will be used to pass the control
//       //one route handler can have multiple route handlers
//       next();
//       res.send("Route handler1");
//       // next(); // this will pass the control to the next route handler
//       // if you don't call next() the response will hang
//     },
//     (req, res) => {
//       res.send("Route handler2");
//     },
//     (req, res) => {
//       res.send("Route handler3");
//     },
//   ]
// );
//browser is not a good way to test the http requests, we can use postman or curl
//postman is a good tool to test the http requests, we can use it to test

//there is one more way to send the route handlers inside route handlers
// app.use("/users", (req, res, next) => {
//   next(); // this will pass the control
//   res.send("Hello from the users route!");

//   //the route handlers will called middleware
//   //this is a middleware function, it will be called for every request to the /users
// });
// app.use("/users", (req, res) => {
//   res.send("Hello from the users route!2");
// });

//like if there is multiples route handlers and if 3 route handlers and in which 1st two is not sending res than just used next() to pass the control to the next route handler and the last one will send the response back to the client
//this is a middleware function, it will be called for every request to the /users and 1st and second route handlers is called middleware and the last one is called request handler
//only job of express is to send the response back to the client, so we can use next() to pass the control to the next route handler and the last one will send the response back to the client

//Handle Auth Middleware for all requests to /admin
// app.use("/admin", adminAuth);

// app.get("/admin/getAllData", (req, res) => {
//   //logic of fetching all data
//   //check if the request is authorized logic of checking
//   res.send("Send all the data");
// });

// //if i am going to keep authorize all the admin so could i copy paste the code of isAdminAuthorized to all the admin http requests? No, it is not a good practice to copy paste the code, we can use middleware to check if the user is authorized or not

// app.get("/admin/deleteUser", (req, res) => {
//   //logic of fetching all data
//   //check if the request is authorized logic of checking
//   res.send("Deleted a  data");
// });

// app.get("/getUserData", (req, res) => {
//   try {
//     throw new Error("This is an error"); // this will throw an error and the error handler will catch it
//     res.send("User Data is Send");
//   } catch (error) {
//     res.status(500).send("some error is occured"); // this will throw an error and the error handler will catch it
//   }
//   res.send("User Data is Send");
// });

// app.use("/", (err, req, res, next) => {
//   if (err) {
//     res.status(500).send("something went wrong!");
//   }
// });

app.use(express.json()); //middlewar for reading the json file it reads the json object and convert this into js object
app.post("/signup", async (req, res) => {
  // const userObj = {
  //   firstName: "Amandeep",
  //   lastName: "Rajput",
  //   emailId: "aman@gmail.com",
  //   password: "Amandeep@123",
  // };

  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error Saving the User" + err.message);
  }
});

//Get user by _id

app.get("/userId", async (req, res) => {
  const userId = req.query.userId;
  console.log(userId);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(404).send("User not found");
  }
});

//delete the user
//delete the user
app.delete("/user", async (req, res) => {
  const userId = req.query.userId;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).send("User not found");
    }
    res.send("User Deleted Successfully");
  } catch (err) {
    res.status(404).send("User not found");
  }
});

//Get  user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail });
    if (user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something Went wrong");
  }
});
//Feed API - Get /feed - get all the users from the database
app.get("/feeds", async (req, res) => {
  try {
    const user = await User.find({}); //when pass the emplty braces it give  you all the data

    res.send(user);
  } catch (err) {
    res.status(400).send("Something Went wrong");
  }
});

//update the data of the user

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate(userId, data);
    res.send("User Updated Successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established ...");
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!");
  });

//dev Tinder is the database users is the collection and inside the users this is document there are _id(unique Id these Id are automatically created) and __v(maintainig the versions of the documents) are the fields that are created by the mongoDb

//error handling using app.use("/", (err, req, res, next=>{} you have to write this at the end of the file, because it will catch all the errors that are not caught by any other error handler, so it should be the last middleware in the chain
