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
  const { name, email, message}: RequestBody = await req.json();

  

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
