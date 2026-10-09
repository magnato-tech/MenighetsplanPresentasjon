function parseJsonBody(req) {
  const rawBody = req.body;
  if (typeof rawBody === 'string' && rawBody.length > 0) {
    try {
      return JSON.parse(rawBody);
    } catch {
      return {};
    }
  }
  if (rawBody && typeof rawBody === 'object') return rawBody;
  return {};
}

function getClientIp(headers) {
  const forwarded = headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded[0]) {
    return String(forwarded[0]).split(',')[0].trim();
  }
  return 'unknown';
}

module.exports = { parseJsonBody, getClientIp };
