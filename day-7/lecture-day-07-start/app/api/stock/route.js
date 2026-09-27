export async function GET() {
  return Response.json({
    symbol: "DEMO",
    price: Number((100 + Math.random() * 20).toFixed(2)),
  })
}
