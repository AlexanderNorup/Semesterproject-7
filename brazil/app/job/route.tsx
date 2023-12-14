/* Access with e.g.:
  const response = await fetch("/job", {
    method: "POST",
     body: JSON.stringify({
       from: "2011-01-01T00:00:00Z",
       to: "2011-03-01T00:00:00Z",
     }),
    });
    const status = await response.json();

*/

interface JobObject {
  from: string;
  to: string;
}
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  let url: string;
  if (process.env.NODE_ENVIRONMENT) {
    url = "http://job-scheduler-flask:5000/job";
  } else {
    url = "http://localhost:5000/job";
  }

  const toSend: JobObject = await request.json();

  const key =
    toSend.from.substring(0, 4) +
    "-" +
    toSend.from.substring(5, 7) +
    "--" +
    toSend.to.substring(0, 4) +
    "-" +
    toSend.to.substring(5, 7);

  const data = new URLSearchParams();
  data.append("name", key);
  data.append("from_date", toSend.from);
  data.append("to_date", toSend.to);

  const response = await fetch(url, {
    method: "POST",
    body: data,
  });

  const value = await response.text();

  if (value.includes("Posted new job")) {
    return Response.json({ status: "success" });
  } else {
    return Response.json({ status: "failure" });
  }
}
