import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// 트랜스포터 설정을 함수로 분리
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error('Email configuration is missing');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

export async function POST(req: Request) {
  try {
    // 환경변수 로깅 추가 (실제 배포 시에는 제거하세요)
    console.log('Environment variables check:', {
      hasEmailUser: !!process.env.EMAIL_USER,
      hasEmailPassword: !!process.env.EMAIL_PASSWORD,
      hasEmailTo: !!process.env.EMAIL_TO,
    });

    // 환경변수 확인
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD || !process.env.EMAIL_TO) {
      console.error('Missing environment variables');
      return NextResponse.json(
        { 
          error: '서버 설정 오류가 발생했습니다.',
          missing: {
            EMAIL_USER: !process.env.EMAIL_USER,
            EMAIL_PASSWORD: !process.env.EMAIL_PASSWORD,
            EMAIL_TO: !process.env.EMAIL_TO,
          }
        },
        { status: 500 }
      );
    }

    const { name, email, subject, message } = await req.json();

    // 요청 데이터 검증
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    const transporter = createTransporter();

    console.log('Sending email with config:', {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      auth: {
        user: process.env.EMAIL_USER,
        // 비밀번호는 로그에 출력하지 않음
      }
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
    console.log('Email sent successfully:', info.messageId);

    return NextResponse.json({ 
      message: '메일이 성공적으로 전송되었습니다.',
      messageId: info.messageId 
    });
  } catch (error) {
    console.error('Detailed error:', {
      message: error instanceof Error ? error.message : '알 수 없는 오류',
      stack: error instanceof Error ? error.stack : undefined,
    });
    
    return NextResponse.json(
      { 
        error: '메일 전송에 실패했습니다.', 
        details: error instanceof Error ? error.message : '알 수 없는 오류',
      },
      { status: 500 }
    );
  }
} 
