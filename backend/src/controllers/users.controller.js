const generateUsers = require("../data/generateUsers.js");

const TOTAL_USERS = 600_000;
const BATCH_SIZE = 5000;

exports.getAllUsers = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.write('{"count":' + TOTAL_USERS + ',"users":[');

  let userCount = 0;
  let isFirstUser = true;

  // Stream users in batches with async delays for garbage collection
  for (let batch = 0; batch < Math.ceil(TOTAL_USERS / BATCH_SIZE); batch++) {
    const batchSize = Math.min(BATCH_SIZE, TOTAL_USERS - batch * BATCH_SIZE);
    const users = generateUsers(batchSize);

    users.forEach((user) => {
      if (!isFirstUser) res.write(",");
      res.write(JSON.stringify(user));
      isFirstUser = false;
      userCount++;
    });

    // Progress log
    if ((batch + 1) % 200 === 0) {
      console.log(`Sent ${userCount} users...`);
    }

    // Allow garbage collection - yield control
    await new Promise((resolve) => setImmediate(resolve));
  }

  res.write("]}");
  res.end();
};
