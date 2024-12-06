/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "base-100": "#ffffff",          // 메인 배경색
          "base-200": "#f3f4f6",          // 섹션 배경색
          "base-300": "#e5e7eb",          // 강조 배경색
          "base-content": "#1f2937",      // 기본 텍스트 색상
          "primary": "#2563eb",           // 프라이머리 색상
          "primary-content": "#ffffff",    // 프라이머리 버튼의 텍스트 색상
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "base-100": "#0f172a",          // 메인 배경색 (매우 어두운 네이비)
          "base-200": "#1e293b",          // 섹션 배경색 (어두운 네이비)
          "base-300": "#334155",          // 강조 배경색
          "base-content": "#e2e8f0",      // 기본 텍스트 색상
          "primary": "#3b82f6",           // 프라이머리 색상
          "primary-content": "#ffffff",    // 프라이머리 버튼의 텍스트 색상
          "neutral": "#1e293b",           // 중립 색상
          "neutral-content": "#e2e8f0",    // 중립 텍스트 색상
        }
      },
      "light",
      "dark"
    ],
  },
}