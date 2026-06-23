require("dotenv").config();

const requiredEnvVars = [
  "META_VERIFY_TOKEN",
  "WHATSAPP_TOKEN",
  "GRAPH_API_VERSION"
];

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

module.exports = {
  PORT: process.env.PORT || 3000,
  META_VERIFY_TOKEN: process.env.META_VERIFY_TOKEN,
  WHATSAPP_TOKEN: process.env.WHATSAPP_TOKEN,
  GRAPH_API_VERSION: process.env.GRAPH_API_VERSION,
  DEFAULT_PHONE_NUMBER_ID: process.env.DEFAULT_PHONE_NUMBER_ID
};