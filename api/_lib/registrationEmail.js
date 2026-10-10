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

function classifyResendError(status, bodyText) {
  const lower = String(bodyText).toLowerCase();
  if (status === 401 || status === 403 && lower.includes('api key')) {
    return 'invalid_api_key';
  }
  if (lower.includes('not verified') || lower.includes('domain is not')) {
    return 'domain_not_verified';
  }
  if (lower.includes('from') && (lower.includes('invalid') || lower.includes('not allowed'))) {
    return 'invalid_from';
  }
  if (lower.includes('only send') || lower.includes('testing') || lower.includes('verify a domain')) {
    return 'recipient_not_allowed';
  }
  if (status === 422 || status === 400) {
    return 'invalid_request';
  }
  return 'provider_error';
}

async function sendRegistrationConfirmationEmail(registration) {
  const apiKey = normalizeEnvValue(process.env.RESEND_API_KEY);
  if (!apiKey) {
    return { ok: false, reason: 'not_configured' };
  }

  const from =
    normalizeEnvValue(process.env.REGISTRATION_EMAIL_FROM) ||
    'Menighetsplan <onboarding@resend.dev>';
  const to = normalizeEnvValue(registration.email).toLowerCase();
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
      console.error('Resend confirmation failed', res.status, errBody.slice(0, 400));
      return { ok: false, reason: classifyResendError(res.status, errBody) };
    }

    return { ok: true, reason: null };
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
      confirmationEmailReason: null,
    };
  }
  return {
    confirmationEmailAt: at,
    confirmationEmailOk: false,
    confirmationEmailFailedAt: at,
    confirmationEmailReason: result.reason || 'provider_error',
  };
}

async function sendAndLogConfirmation(registration, updateCustomer) {
  const emailResult = await sendRegistrationConfirmationEmail(registration);
  const confirmationPatch = confirmationPatchFromResult(emailResult);
  return updateCustomer(registration.id, confirmationPatch);
}

module.exports = {
  isEmailConfigured,
  sendRegistrationConfirmationEmail,
  confirmationPatchFromResult,
  sendAndLogConfirmation,
};
