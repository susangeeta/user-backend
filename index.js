const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let users = [
  {
    id: "1",
    firstName: "Sangeeta",
    lastName: "Swain",
    hobby: "Teaching",
  },
];

//middleware log every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

//validation post and put
const userValidation = (req, res, next) => {
  const { firstName, lastName, hobby } = req.body;
  if (!firstName || !lastName || !hobby) {
    return res
      .status(400)
      .json({ message: "All field are required :firstName,lastName,hobby" });
  }
  next();
};

//get all user
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

//get user id
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

//create user (post)
app.post("/users", userValidation, (req, res) => {
  const newUser = {
    id: String(users.length + 1),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    hobby: req.body.hobby,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

//update user (put)

app.put("/users/:id", userValidation, (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.hobby = req.body.hobby;
  res.status(200).json(user);
});

//delete user
app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({ message: "Users not found" });
  }
  users.splice(userIndex, 1);
  res.status(200).json({ message: "User delete successfully" });
});
app.listen(port, () => console.log(`Server running on ${port}`));
