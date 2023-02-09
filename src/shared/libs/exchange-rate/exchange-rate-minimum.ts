import { ExchangeData } from '../../../typings';

interface ExchangeRateMinimum {
  firstData: ExchangeData,
  secondData: ExchangeData,
  thirdData: ExchangeData,
  base: "USD" | "EUR" | "RUB" | "RUB/USD" | "RUB/EUR" | "EUR/USD",
}

export function exchangeRateMinimum({ firstData, secondData, thirdData, base }: ExchangeRateMinimum) {
  if (base === "RUB/USD") return (firstData && secondData && thirdData) ? Math.min(firstData.rates.RUB / firstData.rates.USD, secondData.rates.RUB / secondData.rates.USD, thirdData.rates.RUB / thirdData.rates.USD).toFixed(3) : null;
  if (base === "RUB/EUR") return (firstData && secondData && thirdData) ? Math.min(firstData.rates.RUB / firstData.rates.EUR, secondData.rates.RUB / secondData.rates.EUR, thirdData.rates.RUB / thirdData.rates.EUR).toFixed(3) : null;
  if (base === "EUR/USD") return (firstData && secondData && thirdData) ? Math.min(firstData.rates.EUR / firstData.rates.USD, secondData.rates.EUR / secondData.rates.USD, thirdData.rates.EUR / thirdData.rates.USD).toFixed(3) : null;

  return (firstData && secondData && thirdData) ? Math.min(firstData.rates[base], secondData.rates[base], thirdData.rates[base]).toFixed(3) : null;
}
