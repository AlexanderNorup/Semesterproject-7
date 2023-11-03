#install.packages(c("readr", "dplyr"))
library(readr)
library(dplyr)
# Change "archive/southeast" to relevant filename
data <- read_csv("archive/southeast.csv")
data <- data %>% filter(Data >= "2010-01-01")
names(data)
data <- data %>%
  rename(
    date = Data,
    time = Hora,
    "precipitation past hour (ml)" = "PRECIPITAÇÃO TOTAL, HORÁRIO (mm)",
    "atmospheric pressure past hour (mb)" = "PRESSAO ATMOSFERICA AO NIVEL DA ESTACAO, HORARIA (mB)",
    "max air pressure past hour (mb)" = "PRESSÃO ATMOSFERICA MAX.NA HORA ANT. (AUT) (mB)",
    "min air pressure past hour (mb)" = "PRESSÃO ATMOSFERICA MIN. NA HORA ANT. (AUT) (mB)",
    "solar radiation (KJ/m2)" = "RADIACAO GLOBAL (Kj/m²)",
    "air temperature (instant) (C)" = "TEMPERATURA DO AR - BULBO SECO, HORARIA (°C)",
    "dew point temperature (instant) (C)" = "TEMPERATURA DO PONTO DE ORVALHO (°C)",
    "max temperature past hour (C)" = "TEMPERATURA MÁXIMA NA HORA ANT. (AUT) (°C)",
    "min temperature past hour (C)" = "TEMPERATURA MÍNIMA NA HORA ANT. (AUT) (°C)",
    "max dew point temperature past hour (C)" = "TEMPERATURA ORVALHO MAX. NA HORA ANT. (AUT) (°C)",
    "min dew point temperature past hour (C)" = "TEMPERATURA ORVALHO MIN. NA HORA ANT. (AUT) (°C)",
    "max relative humid temperature past hour  (%)" = "UMIDADE REL. MAX. NA HORA ANT. (AUT) (%)",
    "min relative humid temperature past hour (%)" = "UMIDADE REL. MIN. NA HORA ANT. (AUT) (%)",
    "relative humid (% instant)" = "UMIDADE RELATIVA DO AR, HORARIA (%)",
    "wind direction (radius degrees)" = "VENTO, DIREÇÃO HORARIA (gr) (° (gr))",
    "wind gust (m/s)" = "VENTO, RAJADA MAXIMA (m/s)",
    "wind speed (m/s)" = "VENTO, VELOCIDADE HORARIA (m/s)",
  )
# Change "archive/southeast" to relevant filename
write_csv(data, "updated_archive/southeast.csv")
