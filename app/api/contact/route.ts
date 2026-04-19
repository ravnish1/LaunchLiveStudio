import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, details } = await req.json();

    if (!name || !email || !details) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and details are required.' },
        { status: 400 }
      );
    }

    // You must set these variables in your .env or .env.local file.
    // Example for Google Workspace / Gmail:
    // SMTP_HOST=smtp.gmail.com
    // SMTP_PORT=587
    // SMTP_USER=info@launchlive.studio
    // SMTP_PASS=your_app_password

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("SMTP credentials are not configured. Returning 500 error.");
      return NextResponse.json(
        { error: 'Server email configuration is missing.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER || '"Launch Live Studio" <noreply@launchlive.studio>',
      to: 'launchlivestudio@gmail.com',
      subject: `New Project Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${details}`,
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #000;">New Project Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <h3 style="margin-top: 20px;">Message:</h3>
          <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 8px;">${details}</p>
        </div>
      `,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email. Please try again later.' }, { status: 500 });
  }
}
