import { NextResponse } from "next/server";

// Простая математическая CAPTCHA
// В production лучше использовать Google reCAPTCHA или hCaptcha
export async function GET() {
  try {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const answer = num1 + num2;

    return NextResponse.json({
      success: true,
      question: `Сколько будет ${num1} + ${num2}?`,
      token: answer.toString(), // В production это должно быть зашифровано
    });
  } catch (error) {
    console.error("Generate CAPTCHA error:", error);
    return NextResponse.json(
      { error: "Failed to generate CAPTCHA" },
      { status: 500 }
    );
  }
}
