import pandas as pd
print("Loading file")
df = pd.read_csv (r'exportacao_full.csv', delimiter=',')
print("File loaded")
# Objective: Seperate City and region in the City column

states = []
cities = []
lineNum = 0
for i in df.iterrows():
    if lineNum % 500000 == 0:
        print("Processed " + str(lineNum) + " lines...")
    city = i[1].City
    split = city.split(" - ")
    cities.append(split[0])
    states.append(split[1])
    lineNum = lineNum + 1

print("Iterated through all lines")
df["State"] = states
df["City"] = cities
print("Modified dataframe with cities and states!")

df.to_csv("fixed_export.csv")
print("CSV created!")
