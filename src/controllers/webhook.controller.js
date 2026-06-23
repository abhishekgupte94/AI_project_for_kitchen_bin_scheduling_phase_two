const { META_VERIFY_TOKEN } = require("../config/env");
const { parseWhatsAppPayload } = require("../utils/payloadParser");
const { handleIncomingCommand } = require("../services/command.service");

function verifyWebhook(req, res) {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  const isSubscribeMode = mode === "subscribe";
  const isCorrectVerifyToken = token === META_VERIFY_TOKEN;

  if (isSubscribeMode && isCorrectVerifyToken) {
    console.log("Webhook verified successfully.");
    return res.status(200).send(challenge);
  }

  console.warn("Webhook verification failed.");
  return res.sendStatus(403);
}

async function receiveWebhook(req, res) {
  try {
    const parsedMessage = parseWhatsAppPayload(req.body);

    if (!parsedMessage) {
      console.log("Webhook received, but no usable message found.");
      return res.sendStatus(200);
    }

    console.log("Incoming message:", parsedMessage);

    await handleIncomingCommand(parsedMessage);

    return res.sendStatus(200);
  } catch (error) {
    console.error("Error handling webhook:", error.message);
    return res.sendStatus(200);
  }
}

module.exports = {
  verifyWebhook,
  receiveWebhook
};