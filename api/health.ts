export default function handler(
  _req: unknown,
  res: { status: (code: number) => { json: (body: Record<string, unknown>) => void } }
) {
  const configured = Boolean(
    process.env.CRM_FIREBASE_PROJECT_ID && process.env.CRM_FIREBASE_SERVICE_ACCOUNT
  );
  res.status(200).json({
    status: 'ok',
    firestore: {
      check: 'config',
      configured,
      reachable: null,
    },
    time: new Date().toISOString(),
  });
}
