interface JobObject {
  from: string;
  to: string;
}

export async function POST(request: Request) {
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

  const response = await fetch("http://localhost:5000/job", {
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
