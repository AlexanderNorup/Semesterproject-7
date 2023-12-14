import { url } from "inspector";
import { getExports } from "./mongolib";

/* Access with e.g.:
  const response = await fetch("/processed/" + "1266210000000-1268186400000");
  const data = await response.json();
*/
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const params = new URL(request.url);
  if (params == null) {
    return;
  }

  console.log(params);

  const response = await getExports(
    Number.parseInt(params.searchParams.get("fromYear") ?? ""),
    Number.parseInt(params.searchParams.get("fromMonth") ?? ""),
    Number.parseInt(params.searchParams.get("toYear") ?? ""),
    Number.parseInt(params.searchParams.get("toMonth") ?? ""),
    Number.parseInt(params.searchParams.get("sh2code") ?? ""),
    params.searchParams.get("state") ?? ""
  );
  if (response === undefined) {
    return Response.json(
      { Error: "Formatting error. Params not properly typed." },
      {
        status: 400,
      }
    );
  }
  return Response.json({ data: response }, { status: 200 });
}
