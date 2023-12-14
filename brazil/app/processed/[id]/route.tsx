/* Access with e.g.:
  const response = await fetch("/processed/" + "1266210000000-1268186400000");
  const data = await response.json();
*/
export const dynamic = "force-dynamic";
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  let url: string;
  if (process.env.NODE_ENVIRONMENT) {
    url = "http://job-scheduler-flask:5000/processed";
  } else {
    url = "http://localhost:5000/processed";
  }

  const response = await fetch(url + params.id); // replace url with environment variable
  const data = await response.json();

  return Response.json({ data });
}
