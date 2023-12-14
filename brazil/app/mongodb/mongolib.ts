var mongoose = require("mongoose");

let connectionString =
  process.env.MONGO_CONNECT ?? "mongodb://admin:nielsfaurskov@localhost:27017";

const brazil_exports = new mongoose.Schema({
  Year: Number,
  Month: Number,
  Country: String,
  "SH4 Code": Number,
  State: String,
  "SH2 Code": Number,
  "US$ FOB": Number,
  "Net Weight": Number,
});

interface export_object {
  Year: number;
  Month: number;
  Country: string;
  "SH4 Code": number;
  State: string;
  "SH2 Code": number;
  "US$ FOB": number;
  "Net Weight": number;
}

mongoose.connect(connectionString + "/exports?authSource=admin&w=1");

function validateNumber(input: number) {
  return !Number.isNaN(input) && input != undefined && input != null;
}

export async function getExports(
  fromYear: number,
  fromMonth: number,
  toYear: number,
  toMonth: number,
  sh2code: number,
  state: string
) {
  if (
    !validateNumber(fromYear) ||
    !validateNumber(fromMonth) ||
    !validateNumber(toYear) ||
    !validateNumber(toMonth) ||
    state == ""
  ) {
    return;
  }
  const DataModel = mongoose.model("exports", brazil_exports);
  let data;
  if (Number.isNaN(sh2code)) {
    data = await DataModel.find({
      Year: { $gte: fromYear, $lte: toYear },
      State: state,
    });
  } else {
    if (!validateNumber(sh2code)) {
      return;
    }

    data = await DataModel.find({
      Year: { $gte: fromYear, $lte: toYear },
      State: state,
      "SH2 Code": sh2code,
    });
  }

  let filteredData = [];

  for (let i = 0; i < data.length; i++) {
    const entry: export_object = data[i];
    if (!(entry.Year == fromYear || entry.Year == toYear)) {
      filteredData.push(entry);
    } else if (entry.Year == fromYear) {
      if (entry.Month >= fromMonth) {
        filteredData.push(entry);
      }
    } else if (entry.Year == toYear) {
      if (entry.Month <= toMonth) {
        filteredData.push(entry);
      }
    }
  }

  return filteredData;
}
