import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// 이메일 전송을 위한 트랜스포터 설정
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    console.log('Attempting to send email with:', {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `[Contact] ${subject}`,
    });

    // 이메일 옵션 설정
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `[Contact] ${subject}`,
      html: `
        <h3>새로운 문의가 도착했습니다.</h3>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>제목:</strong> ${subject}</p>
        <p><strong>내용:</strong></p>
        <p>${message}</p>
      `,
    };

    // 이메일 전송
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);

    return NextResponse.json({ message: '메일이 성공적으로 전송되었습니다.' });
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { error: '메일 전송에 실패했습니다.', details: error.message },
      { status: 500 }
    );
  }
} 