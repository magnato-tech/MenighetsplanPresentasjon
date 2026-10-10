const { pingFirestore } = require('./_lib/customersStore');
const { isEmailConfigured } = require('./_lib/registrationEmail');

module.exports = async function handler(_req, res) {
  const ping = await pingFirestore();

  res.status(200).json({
    status: 'ok',
    admin: {
      passwordConfigured: Boolean(
        process.env.ADMIN_PASSWORD && String(process.env.ADMIN_PASSWORD).trim().length > 0
      ),
    },
    firestore: {
      check: 'connection',
      configured: ping.configured,
      credentialsOk: ping.credentialsOk,
      reason: ping.reason,
      reachable: ping.reachable,
      reachReason: ping.reachReason,
    },
    email: {
      resendApiKeyConfigured: isEmailConfigured(),
      fromConfigured: Boolean(
        process.env.REGISTRATION_EMAIL_FROM && String(process.env.REGISTRATION_EMAIL_FROM).trim()
      ),
    },
    time: new Date().toISOString(),
  });
};
