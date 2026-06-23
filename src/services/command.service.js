const { sendTextMessage } = require("./whatsapp.service");

async function handleIncomingCommand(message) {
  const {
    from,
    text,
    messageType,
    phoneNumberId
  } = message;

  if (messageType === "image") {
    return sendTextMessage({
      to: from,
      phoneNumberId,
      body: "Image received. Later, this will be used as bin proof."
    });
  }

  if (messageType !== "text") {
    return sendTextMessage({
      to: from,
      phoneNumberId,
      body: "I can currently understand text messages and images only."
    });
  }

  const normalizedText = text.toLowerCase();

  if (normalizedText === "/start") {
    return sendTextMessage({
      to: from,
      phoneNumberId,
      body:
        "Welcome to the Kitchen Bin Scheduling Bot.\n\n" +
        "Available commands:\n" +
        "/help - Show commands\n" +
        "/status - Check current reminder status\n" +
        "/confirmout - Confirm bin was taken out\n" +
        "/confirmin - Confirm bin was taken back in"
    });
  }

  if (normalizedText === "/help") {
    return sendTextMessage({
      to: from,
      phoneNumberId,
      body:
        "Commands:\n\n" +
        "/start - Start bot\n" +
        "/help - Show this command list\n" +
        "/status - Check bin reminder status\n" +
        "/confirmout - Confirm bin taken out\n" +
        "/confirmin - Confirm bin taken in"
    });
  }

  if (normalizedText === "/status") {
    return sendTextMessage({
      to: from,
      phoneNumberId,
      body:
        "Current status:\n\n" +
        "WhatsApp connection: active\n" +
        "Command handling: active\n" +
        "Bin schedule integration: pending\n" +
        "Reminder engine: pending\n" +
        "Proof image workflow: basic receiver ready"
    });
  }

  if (normalizedText === "/confirmout") {
    return sendTextMessage({
      to: from,
      phoneNumberId,
      body: "Confirmed: bin taken out. Later, this step will require image proof."
    });
  }

  if (normalizedText === "/confirmin") {
    return sendTextMessage({
      to: from,
      phoneNumberId,
      body: "Confirmed: bin taken back in. Later, this step will require image proof."
    });
  }

  return sendTextMessage({
    to: from,
    phoneNumberId,
    body:
      "I did not understand that command.\n\n" +
      "Type /help to see available commands."
  });
}

module.exports = {
  handleIncomingCommand
};