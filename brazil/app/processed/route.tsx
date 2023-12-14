/* Access with:
  const response = await fetch("/processed");
  const data = await response.json();
*/
export const dynamic = "force-dynamic";
export async function GET() {
  let url: string;
  if (process.env.NODE_ENVIRONMENT) {
    url = "http://job-scheduler-flask:5000/processed";
  } else {
    url = "http://localhost:5000/processed";
  }

  const response = await fetch(url); // replace with environment variable
  const data = await response.json();

  return Response.json({ data });
}
