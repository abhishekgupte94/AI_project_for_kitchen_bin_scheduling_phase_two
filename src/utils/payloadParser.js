function parseWhatsAppPayload(body) {
  const change = body?.entry?.[0]?.changes?.[0];
  const value = change?.value;

  if (!value) {
    return null;
  }

  const message = value?.messages?.[0];

  if (!message) {
    return null;
  }

  const phoneNumberId = value?.metadata?.phone_number_id;
  const displayPhoneNumber = value?.metadata?.display_phone_number;

  const from = message?.from;
  const messageId = message?.id;
  const timestamp = message?.timestamp;
  const messageType = message?.type;

  const text = messageType === "text"
    ? message?.text?.body?.trim()
    : null;

  const imageId = messageType === "image"
    ? message?.image?.id
    : null;

  return {
    phoneNumberId,
    displayPhoneNumber,
    from,
    messageId,
    timestamp,
    messageType,
    text,
    imageId,
    raw: message
  };
}

module.exports = {
  parseWhatsAppPayload
};