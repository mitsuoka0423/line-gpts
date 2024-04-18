// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />
console.log("Hello from Functions!");
Deno.serve(async (req)=>{
  const { events } = await req.json();
  console.log(events);
  if (events && events[0]?.type === "message") {
    // 文字列化したメッセージデータ
    let messages = [
      {
        "type": "text",
        "text": "こんにちは！"
      },
      {
        "type": "text",
        "text": "テスト / test で単語を登録できます"
      }
    ];
    replyMessage(events, messages);
  }
  return new Response(JSON.stringify({
    status: 'ok'
  }), {
    headers: {
      "Content-Type": "application/json"
    }
  });
});
/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/line-bot' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/ export const replyMessage = (events, messages)=>{
  const dataString = JSON.stringify({
    replyToken: events[0].replyToken,
    messages: messages
  });
  // リクエストヘッダー
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + Deno.env.get('LINE_CHANNEL_ACCESS_TOKEN')
  };
  // https://developers.line.biz/ja/docs/messaging-api/nodejs-sample/#send-reply
  fetch('https://api.line.me/v2/bot/message/reply', {
    method: "POST",
    body: dataString,
    headers: headers
  }).then((r)=>{
    console.log(r);
  }).catch((e)=>{
    console.log(e);
  });
};
