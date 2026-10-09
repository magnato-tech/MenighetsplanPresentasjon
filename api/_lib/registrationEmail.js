function normalizeEnvValue(value) {
  if (value == null) return '';
  return String(value).replace(/\r\n/g, '\n').trim();
}

function isEmailConfigured() {
  return Boolean(normalizeEnvValue(process.env.RESEND_API_KEY));
}

function buildConfirmationContent(registration) {
  const churchName = registration.churchName || 'menigheten';
  const contactName = registration.contactName || '';
  const subject = 'Vi har mottatt bestillingen din – Menighetsplan';
  const text = [
    `Hei${contactName ? ` ${contactName}` : ''},`,
    '',
    `Takk for at ${churchName} har registrert interesse for Menighetsplan.`,
    '',
    'Vi har mottatt bestillingen og tar kontakt for klargjøring.',
    'Prøveperioden starter først når løsningen er levert til menigheten.',
    '',
    'Med vennlig hilsen',
    'Menighetsplan',
    'https://www.menighetsplan.no',
  ].join('\n');
  return { subject, text };
}

async function sendRegistrationConfirmationEmail(registration) {
  const apiKey = normalizeEnvValue(process.env.RESEND_API_KEY);
  if (!apiKey) {
    return { ok: false, reason: 'not_configured' };
  }

  const from =
    normalizeEnvValue(process.env.REGISTRATION_EMAIL_FROM) ||
    'Menighetsplan <onboarding@resend.dev>';
  const to = normalizeEnvValue(registration.email);
  if (!to) {
    return { ok: false, reason: 'missing_recipient' };
  }

  const { subject, text } = buildConfirmationContent(registration);

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      console.error('Resend confirmation failed', res.status, errBody.slice(0, 200));
      return { ok: false, reason: 'provider_error' };
    }

    return { ok: true };
  } catch (err) {
    console.error('Resend confirmation error', err && err.message);
    return { ok: false, reason: 'network_error' };
  }
}

function confirmationPatchFromResult(result) {
  const at = new Date().toISOString();
  if (result.ok) {
    return {
      confirmationEmailAt: at,
      confirmationEmailOk: true,
      confirmationEmailFailedAt: null,
    };
  }
  return {
    confirmationEmailAt: at,
    confirmationEmailOk: false,
    confirmationEmailFailedAt: at,
  };
}

module.exports = {
  isEmailConfigured,
  sendRegistrationConfirmationEmail,
  confirmationPatchFromResult,
};
