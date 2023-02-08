import React, { useEffect, useState } from 'react';
import './Application.scss';
import exchangeRate from "../shared/api/exchange-rate";
import { ExchangeData } from "../typings";

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
      colFirst: firstData ? firstData.rates.RUB.toFixed(3) : "loading",
      colSecond: secondData ? secondData.rates.RUB.toFixed(3) : "loading",
      colThird: thirdData ? thirdData.rates.RUB.toFixed(3) : "loading",
      minimum: (firstData && secondData && thirdData) ? Math.min(firstData.rates.RUB, secondData.rates.RUB, thirdData.rates.RUB).toFixed(3) : null,
    },
    {
      name: "USD/CUPCAKE",
      colFirst: firstData ? firstData.rates.USD.toFixed(3) : "loading",
      colSecond: secondData ? secondData.rates.USD.toFixed(3) : "loading",
      colThird: thirdData ? thirdData.rates.USD.toFixed(3) : "loading",
      minimum: (firstData && secondData && thirdData) ? Math.min(firstData.rates.USD, secondData.rates.USD, thirdData.rates.USD).toFixed(3) : null,
    },
    {
      name: "EUR/CUPCAKE",
      colFirst: firstData ? firstData.rates.EUR.toFixed(3) : "loading",
      colSecond: secondData ? secondData.rates.EUR.toFixed(3) : "loading",
      colThird: thirdData ? thirdData.rates.EUR.toFixed(3) : "loading",
      minimum: (firstData && secondData && thirdData) ? Math.min(firstData.rates.EUR, secondData.rates.EUR, thirdData.rates.EUR).toFixed(3) : null,
    },
    {
      name: "RUB/USD",
      colFirst: firstData ? (firstData.rates.RUB / firstData.rates.USD).toFixed(3) : "loading",
      colSecond: secondData ? (secondData.rates.RUB / secondData.rates.USD).toFixed(3) : "loading",
      colThird: thirdData ? (thirdData.rates.RUB / thirdData.rates.USD).toFixed(3) : "loading",
      minimum: (firstData && secondData && thirdData) ? Math.min(firstData.rates.RUB / firstData.rates.USD, secondData.rates.RUB / secondData.rates.USD, thirdData.rates.RUB / thirdData.rates.USD).toFixed(3) : null,
    },
    {
      name: "RUB/EUR",
      colFirst: firstData ? (firstData.rates.RUB / firstData.rates.EUR).toFixed(3) : "loading",
      colSecond: secondData ? (secondData.rates.RUB / secondData.rates.EUR).toFixed(3) : "loading",
      colThird: thirdData ? (thirdData.rates.RUB / thirdData.rates.EUR).toFixed(3) : "loading",
      minimum: (firstData && secondData && thirdData) ? Math.min(firstData.rates.RUB / firstData.rates.EUR, secondData.rates.RUB / secondData.rates.EUR, thirdData.rates.RUB / thirdData.rates.EUR).toFixed(3) : null,
    },
    {
      name: "EUR/USD",
      colFirst: firstData ? (firstData.rates.EUR / firstData.rates.USD).toFixed(3) : "loading",
      colSecond: secondData ? (secondData.rates.EUR / secondData.rates.USD).toFixed(3) : "loading",
      colThird: thirdData ? (thirdData.rates.EUR / thirdData.rates.USD).toFixed(3) : "loading",
      minimum: (firstData && secondData && thirdData) ? Math.min(firstData.rates.EUR / firstData.rates.USD, secondData.rates.EUR / secondData.rates.USD, thirdData.rates.EUR / thirdData.rates.USD).toFixed(3) : null,
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
