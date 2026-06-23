const axios = require("axios");

const {
  WHATSAPP_TOKEN,
  GRAPH_API_VERSION,
  DEFAULT_PHONE_NUMBER_ID
} = require("../config/env");

async function sendTextMessage({ to, body, phoneNumberId }) {
  const senderPhoneNumberId = phoneNumberId || DEFAULT_PHONE_NUMBER_ID;

  if (!senderPhoneNumberId) {
    throw new Error("Missing WhatsApp phone number ID.");
  }

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${senderPhoneNumberId}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: {
      body
    }
  };

  const response = await axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${WHATSAPP_TOKEN}`,
      "Content-Type": "application/json"
    }
  });

  return response.data;
}

module.exports = {
  sendTextMessage
};