import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465
    auth: {
      user: "benjaminrowe0@gmail.com",
      pass: process.env.NEXT_PUBLIC_NODEMAIL,
      
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "mvmnt.entertainment.melb@gmail.com",
      subject: `New message from ${name}`,
      text: message,
      html: `
  <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
    <h2 style="color: #16a34a;">New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;" />
    <p><strong>Message:</strong></p>
    <p style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${message}</p>
    <footer style="margin-top: 20px; font-size: 12px; color: #777;">
      Sent from your website contact form
    </footer>
  </div>
`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
}
