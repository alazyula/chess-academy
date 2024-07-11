import { NextRequest, NextResponse } from 'next/server';
/* eslint-disable */
// @ts-ignore
import nodemailer from 'nodemailer';
/* eslint-enable */
import axios from 'axios';

interface RequestBody {
  name: string;
  email: string;
  message: string;
  token: string;
}

export async function POST(req: NextRequest) {
  const { name, email, message, token }: RequestBody = await req.json();

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
  
  try {
    const response = await axios.post(verificationUrl);
    if (!response.data.success) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return NextResponse.json({ error: 'reCAPTCHA verification error' }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.RECIPIENT_EMAIL,
    subject: `Contact Form Submission from ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
