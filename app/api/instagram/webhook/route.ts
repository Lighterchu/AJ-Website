import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  console.log("--- WEBHOOK VERIFICATION ATTEMPT ---");
  console.log("Mode:", mode);
  console.log("Token:", token);
  console.log("Challenge:", challenge);

  // Replace "mvmnt" with your actual token from the Meta Dashboard
  if (mode === "subscribe" && token === "mvmnt") {
    console.log("VERIFICATION SUCCESSFUL");
    // VERY IMPORTANT: Return the challenge string directly as text/plain
    return new Response(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  

  console.error("VERIFICATION FAILED: Token mismatch or missing params");
  return new Response("Forbidden", { status: 403 });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("--- INSTAGRAM EVENT RECEIVED ---");
    console.log(JSON.stringify(data, null, 2));

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
          from: "Testing",
          to: "benjaminrowe0@gmail.com",
          subject: "Insta Webhook",
          text: "Testing",
          html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
        h12 style="color: #16a34a;">New Instagram Webhook Event Received</h2>
        <pre style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${JSON.stringify(
          data,
          null,
          2
        )}</pre>
      </div>
    `,
        });

    // Meta expects a 200 OK to acknowledge receipt
    return new Response("EVENT_RECEIVED", { status: 200 });
  } catch (error) {
    console.error("POST Error:", error);
    return new Response("Error processing webhook", { status: 500 });
  }
  } catch (error) {
    console.error("Outer Error:", error);
    return new Response("Error processing request", { status: 500 });
  }
}