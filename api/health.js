module.exports = function handler(_req, res) {
  const configured = Boolean(
    process.env.CRM_FIREBASE_PROJECT_ID && process.env.CRM_FIREBASE_SERVICE_ACCOUNT
  );
  res.status(200).json({
    status: 'ok',
    admin: {
      passwordConfigured: Boolean(
        process.env.ADMIN_PASSWORD && String(process.env.ADMIN_PASSWORD).trim().length > 0
      ),
    },
    firestore: {
      check: 'config',
      configured,
      reachable: null,
    },
    time: new Date().toISOString(),
  });
};
