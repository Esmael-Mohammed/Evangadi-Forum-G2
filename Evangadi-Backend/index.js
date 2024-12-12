const express = require("express");
const app = express();
const questionRoutes = require("./route/questionRoute");

// Middleware for parsing JSON
app.use(express.json());

// Mount the question routes
app.use("/api", questionRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
