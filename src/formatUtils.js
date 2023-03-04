const formatUtils = {
    formatFxData: (fxData) => {
      return fxData.map((data) => ({
        bid: parseFloat(data['8. Bid Price']),
        ask: parseFloat(data['9. Ask Price']),
        timestamp: Date.now()
      }));
    }
  };
  
  export default formatUtils;
  