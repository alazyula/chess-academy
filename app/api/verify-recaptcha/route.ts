import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  const { token } = await req.json();
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  try {
    const response = await axios.post(verificationUrl);
    const data = response.data;
    return NextResponse.json(data);
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return NextResponse.json({ success: false, error: 'reCAPTCHA verification failed' });
  }
}
