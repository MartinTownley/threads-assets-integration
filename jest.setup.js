const fs = require("fs");
const path = require("path");

// Load environment variables from .env.test
const envPath = path.resolve(__dirname, ".env.test");
const envConfig = fs.readFileSync(envPath, "utf-8").split("\n");

envConfig.forEach((line) => {
  const [key, value] = line.split("=");
  if (key && value) {
    process.env[key.trim()] = value.trim();
  }
});

console.log(
  "Loaded environment variables:",
  process.env.AIRTABLE_TOKEN,
  process.env.AIRTABLE_BASE_ID
);
