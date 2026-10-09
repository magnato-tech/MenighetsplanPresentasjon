const { pingFirestore } = require('./_lib/customersStore');

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
    time: new Date().toISOString(),
  });
};
