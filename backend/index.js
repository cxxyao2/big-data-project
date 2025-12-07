const express = require("express");
const cors = require("./src/config/cors.config");
const userRoutes = require("./src/routes/users.routes");

const app = express();
app.use(cors);
app.use(express.json());
app.use("/api", userRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
