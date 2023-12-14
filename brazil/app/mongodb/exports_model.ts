var mongoose = require("mongoose");

var brazil_exports = new mongoose.Schema({
  Year: Number,
  Month: Number,
  Country: String,
  "SH4 Code": Number,
  State: String,
  "SH2 Code": Number,
  "US$ FOB": Number,
  "Net Weight": Number,
});

export const BrazilExports =
  mongoose.models.exports || mongoose.model("exports", brazil_exports);
