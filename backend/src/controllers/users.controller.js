const generateUsers = require("../data/generateUsers.js");

const users = generateUsers(10_000_000);

exports.getAllUsers = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.write('{"count":' + users.length + ',"users":[');

  users.forEach((user, index) => {
    if (index > 0) res.write(",");
    res.write(JSON.stringify(user));
  });

  res.write("]}");
  res.end();
};
