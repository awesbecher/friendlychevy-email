// Serverless Function ‑ Node 20 runtime
import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { to, subject, body } = req.body ?? {};
  if (!to || !subject || !body)
    return res.status(400).json({ error: 'Missing to | subject | body' });

  try {
    await resend.emails.send({
      from: 'team@poweredby.agency',
      to,
      subject,
      html: `<p>${body}</p>`,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
