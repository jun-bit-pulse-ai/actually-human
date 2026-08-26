// POST /api/waitlist  { email }
// Emails the signup to contact@promptshields.com via Resend.
//
// Required env var:  RESEND_API_KEY
// Optional env var:  RESEND_FROM   (defaults to Resend's shared sender, which
//                    works immediately but lands in spam more often — set it to
//                    something on a domain you've verified in Resend.)

const TO = 'contact@promptshields.com';
const FROM_FALLBACK = 'Actually Human <onboarding@resend.dev>';

// Deliberately loose: the only real test of an address is sending to it.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Use POST.' });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : (req.body || {});
  const email = String(body.email || '').trim();

  // Honeypot: real people leave this empty because they never see it.
  if (body.company) return res.status(200).json({ ok: true });

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return res.status(400).json({ ok: false, error: "That email doesn't look right." });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error('RESEND_API_KEY is not set');
    return res.status(503).json({ ok: false, error: 'Signups are not switched on yet. Try again shortly.' });
  }

  const when = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC';

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || FROM_FALLBACK,
        to: [TO],
        reply_to: email,
        subject: `Waiting list: ${email}`,
        text: [
          'New Actually Human waiting list signup.',
          '',
          `Email:  ${email}`,
          `When:   ${when}`,
          `Source: ${req.headers.referer || 'kikontroll.no'}`,
          '',
          'Reply straight to this message to reach them.',
        ].join('\n'),
      }),
    });

    if (!r.ok) {
      console.error('Resend rejected the send:', r.status, await r.text());
      return res.status(502).json({ ok: false, error: 'Could not send that just now. Try again in a minute.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Waitlist send failed:', err);
    return res.status(502).json({ ok: false, error: 'Could not send that just now. Try again in a minute.' });
  }
}

function safeParse(s) {
  try { return JSON.parse(s); } catch { return {}; }
}
