import axios from 'axios';

const API_KEY = 'demo'; // replace this with your actual API key

const fxService = {
  getFxData: async () => {
    try {
      const response = await axios.get(`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=${API_KEY}`);
      //const response = await axios.get(`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&outputsize=full&apikey=demo&apikey=${API_KEY}`);
      const fxData = [];
      const timeSeries = response.data['Time Series FX (Daily)'];
      for (const date in timeSeries) {
        const data = timeSeries[date];
        const newData = {
          timestamp: new Date(date).getTime(),
          open: parseFloat(data['1. open']),
          high: parseFloat(data['2. high']),
          low: parseFloat(data['3. low']),
          close: parseFloat(data['4. close'])
        };
        fxData.push(newData);
      }
      return fxData;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
};

export default fxService;
