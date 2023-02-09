import { ExchangeData } from '../../typings';


interface RequestConfig {
  reqDataSetter: (data: ExchangeData) => void,
  sourceProvider: string,
}

export async function exchangeRate({ reqDataSetter, sourceProvider }: RequestConfig) {
  const response = await fetch(`http://localhost:3000/api/v1/${sourceProvider}/poll`);

  if (response.status == 502) {
    await exchangeRate({ reqDataSetter, sourceProvider });
  } else if (response.status != 200) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await exchangeRate({ reqDataSetter, sourceProvider });
  } else {
    const data = await response.json();
    reqDataSetter(data);
    await exchangeRate({ reqDataSetter, sourceProvider });
  }
}
