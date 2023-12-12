/* Access with e.g.:
  const response = await fetch("/processed/" + "1266210000000-1268186400000");
  const data = await response.json();
*/
export const dynamic = "force-dynamic";
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const response = await fetch("http://localhost:5000/processed/" + params.id); // replace url with environment variable
  const data = await response.json();

  return Response.json({ data });
}
