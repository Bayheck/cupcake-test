import React, { useEffect, useState } from 'react';
import './Application.scss';
import { exchangeRate } from "../shared/api/exchange-rate";
import { ExchangeData } from '../typing';
import { exchangeRateLib } from "../shared/libs/exchange-rate";

const Application: React.FC = () => {
  const [firstData, setFirstPollData] = useState<ExchangeData>(null);
  const [secondData, setSecondPollData] = useState<ExchangeData>(null);
  const [thirdData, setThirdPollData] = useState<ExchangeData>(null);

  useEffect(() => {
    exchangeRate({ reqDataSetter: setFirstPollData, sourceProvider: "first" }).catch(e => { console.log(e) });
    exchangeRate({ reqDataSetter: setSecondPollData, sourceProvider: "second" }).catch(e => { console.log(e) });
    exchangeRate({ reqDataSetter: setThirdPollData, sourceProvider: "third" }).catch(e => { console.log(e) });
  }, []);

  const tableData = [
    {
      name: "RUB/CUPCAKE",
      colFirst: exchangeRateLib.exchangeRateData({ data: firstData, base: "RUB"}),
      colSecond: exchangeRateLib.exchangeRateData({ data: secondData, base: "RUB"}),
      colThird: exchangeRateLib.exchangeRateData({ data: thirdData, base: "RUB"}),
      minimum: exchangeRateLib.exchangeRateMinimum({ firstData, secondData, thirdData, base: "RUB"}),
    },
    {
      name: "USD/CUPCAKE",
      colFirst: exchangeRateLib.exchangeRateData({ data: firstData, base: "USD"}),
      colSecond: exchangeRateLib.exchangeRateData({ data: secondData, base: "USD"}),
      colThird: exchangeRateLib.exchangeRateData({ data: thirdData, base: "USD"}),
      minimum: exchangeRateLib.exchangeRateMinimum({ firstData, secondData, thirdData, base: "USD"}),
    },
    {
      name: "EUR/CUPCAKE",
      colFirst: exchangeRateLib.exchangeRateData({ data: firstData, base: "EUR"}),
      colSecond: exchangeRateLib.exchangeRateData({ data: secondData, base: "EUR"}),
      colThird: exchangeRateLib.exchangeRateData({ data: thirdData, base: "EUR"}),
      minimum: exchangeRateLib.exchangeRateMinimum({ firstData, secondData, thirdData, base: "EUR"}),
    },
    {
      name: "RUB/USD",
      colFirst: exchangeRateLib.exchangeRateData({ data: firstData, base: "RUB/USD"}),
      colSecond: exchangeRateLib.exchangeRateData({ data: secondData, base: "RUB/USD"}),
      colThird: exchangeRateLib.exchangeRateData({ data: thirdData, base: "RUB/USD"}),
      minimum: exchangeRateLib.exchangeRateMinimum({ firstData, secondData, thirdData, base: "RUB/USD"}),
    },
    {
      name: "RUB/EUR",
      colFirst: exchangeRateLib.exchangeRateData({ data: firstData, base: "RUB/EUR"}),
      colSecond: exchangeRateLib.exchangeRateData({ data: secondData, base: "RUB/EUR"}),
      colThird: exchangeRateLib.exchangeRateData({ data: thirdData, base: "RUB/EUR"}),
      minimum: exchangeRateLib.exchangeRateMinimum({ firstData, secondData, thirdData, base: "RUB/EUR"}),
    },
    {
      name: "EUR/USD",
      colFirst: exchangeRateLib.exchangeRateData({ data: firstData, base: "EUR/USD"}),
      colSecond: exchangeRateLib.exchangeRateData({ data: secondData, base: "EUR/USD"}),
      colThird: exchangeRateLib.exchangeRateData({ data: thirdData, base: "EUR/USD"}),
      minimum: exchangeRateLib.exchangeRateMinimum({ firstData, secondData, thirdData, base: "EUR/USD"}),
    },
  ]

  return (
    <div className={"table"}>
      <div className={"table__row"}>
        <div className="table__row__name">Pair name/market</div>
        <div className={"table__row__cell"} >First</div>
        <div className={"table__row__cell"}>Second</div>
        <div className={"table__row__cell"}>Third</div>
      </div>
      {
        tableData.map(row => (
          <div className={"table__row"} key={row.name}>
            <div className={"table__row__name"}>
              {row.name}
            </div>
            <div className={row.colFirst === row.minimum ? "table__row__cell__lowest" : "table__row__cell"}>
              {row.colFirst}
            </div>
            <div className={row.colSecond === row.minimum ? "table__row__cell__lowest" : "table__row__cell"}>
              {row.colSecond}
            </div>
            <div className={row.colThird === row.minimum ? "table__row__cell__lowest" : "table__row__cell"}>
              {row.colThird}
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Application;
