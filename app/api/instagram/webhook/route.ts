export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
  
    const mode = searchParams.get("hub.mode");
    const token = searchParams.get("hub.verify_token");
    const challenge = searchParams.get("hub.challenge");
  
    console.log("VERIFY:", { mode, token, challenge });
  
    if (mode === "subscribe" && token === "mvmnt") {
      return new Response(challenge, {
        status: 200,
        headers: { "Content-Type": "text/plain" }
      });
    }
  
    return new Response("Invalid token", { status: 403 });
  }
  
  export async function POST(req: Request) {
    const data = await req.json();
    console.log("INSTAGRAM EVENT:", JSON.stringify(data, null, 2));
  
    return new Response("OK", { status: 200 });
  }
  