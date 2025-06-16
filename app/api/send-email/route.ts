import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
      subject: "New Music License Inquiry - Brazen Kits",
      html: `
      <div style="font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f7f5; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="padding: 24px; background: linear-gradient(135deg, #c9f36e, #a4e58a, #91e3d3); color: #1e1e1e; text-align: center;">
          <h2 style="margin: 0; font-size: 24px;">New Music License Inquiry</h2>
        </div>

        <div style="padding: 24px;">
          <div style="margin-bottom: 24px;">
            <h3 style="color: #3a3a3a; font-size: 18px; margin-bottom: 8px; border-bottom: 2px solid #95AE90; padding-bottom: 4px;">Contact Information</h3>
            <p style="margin: 4px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 4px 0;"><strong>Email/Phone:</strong> ${email}</p>
          </div>

          <div>
            <h3 style="color: #3a3a3a; font-size: 18px; margin-bottom: 8px; border-bottom: 2px solid #95AE90; padding-bottom: 4px;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6; color: #444;">${message}</p>
          </div>
        </div>

        <div style="background-color: #e6f5e9; padding: 16px; text-align: center; font-size: 12px; color: #666;">
          This email was sent from the Brazen Kits contact form.
        </div>
      </div>
    `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
