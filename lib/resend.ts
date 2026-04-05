import { Resend } from 'resend';

let resendInstance: Resend | null = null;

export function getResendClient(): Resend {
  if (resendInstance) return resendInstance;

  const resendApiKey = process.env.RESEND_API_KEY || 're_placeholder_key';

  if (!process.env.RESEND_API_KEY) {
    console.warn('Resend API key missing. Client initialized with placeholder to prevent build-time crashes.');
  }

  resendInstance = new Resend(resendApiKey);
  return resendInstance;
}
