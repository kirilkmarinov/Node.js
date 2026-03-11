const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, password } = req.body;

  if (!user || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are mandatory." });
  }

  // check for duplicate
  const duplicate = userDB.users.find((person) => person.username === user);
  if (duplicate) {
    return res.sendStatus(409);
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username: user, password: hashedPassword };
    userDB.setUsers([...userDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users),
    );
    console.log(userDB.users);
    res.status(201).json({ success: `New user ${user} created.` });
  } catch (error) {
    res.status(500).json({ message: "We have duplicate." });
  }
};

module.exports = { handleNewUser };
