import pandas as pd
print("Loading file")
df = pd.read_csv (r'exportacao_fixed_top_5000.csv', delimiter=',')
print("File loaded")

# Objective: Reduce data amount by summing up US$ FOB and Net Weight across cities within the same group by 'Year', 'Month', 'Country', 'SH4 Code' and 'State'.
# SH2 codes are the same for all SH4 Codes (because SH4 is a more detailed SH2 code). Thus just take "min" which will keep the value in tact
# We don't have city resolution for the weather-data, so this makes sense since the goal is to compare the exports to the weather data.

print("Rows before merge: " + str(len(df)))
grouped_data = df.groupby(['Year', 'Month', 'Country', 'SH4 Code', 'State']).agg({'SH2 Code': 'min', 'US$ FOB': 'sum', 'Net Weight': 'sum'})
print("Consolidated data by cities. New row count:  " + str(len(grouped_data)))
#print(grouped_data)

grouped_data.to_csv("fixed_export_cities_consolidated.csv")
print("Saved merged data")

print("Making SH2 description file")
sh2_descriptions = df.groupby(['SH2 Code']).agg({'SH2 Description': 'first'})
# print(sh2_descriptions)
sh2_descriptions["SH2 Description"].to_json("sh2_descriptions.json")

print("Making SH4 description file")
sh4_descriptions = df.groupby(['SH4 Code']).agg({'SH4 Description': 'first'})
# print(sh4_descriptions)
sh4_descriptions["SH4 Description"].to_json("sh4_descriptions.json")

print("Making Economic Block description file")
economic_block = df.groupby(['Country']).agg({'Economic Block': 'first'})
# print(economic_block)
economic_block["Economic Block"].to_json("economic_block.json")

print("Done! Best regards!")