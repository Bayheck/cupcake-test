import { ExchangeData } from "../../../typings";

interface ExchangeRateData {
  data: ExchangeData,
  base: "USD" | "EUR" | "RUB" | "RUB/USD" | "RUB/EUR" | "EUR/USD",
}

export function exchangeRateData({ data, base }: ExchangeRateData) {
  if (base === "RUB/USD") return data ? (data.rates.RUB / data.rates.USD).toFixed(3) : "loading"
  if (base === "RUB/EUR") return data ? (data.rates.RUB / data.rates.EUR).toFixed(3) : "loading"
  if (base === "EUR/USD") return data ? (data.rates.EUR / data.rates.USD).toFixed(3) : "loading"

  return data ? data.rates[base].toFixed(3) : "loading";
}
