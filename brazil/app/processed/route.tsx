/* Access with:
  const response = await fetch("/processed");
  const data = await response.json();
*/

export async function GET() {
  const response = await fetch("http://localhost:5000/processed"); // replace with environment variable
  const data = await response.json();

  return Response.json({ data });
}
