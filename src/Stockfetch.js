const fs = require("fs");

function Stockfetch() {
  this.readTickersFile = (fileName, onError) => {
    const processResponse = (err, data) => {
      if (err) {
        onError("Error reading file: " + fileName);
      } else {
        const tickers = this.parseTickers(data);
        this.processTickers(tickers);
      }
    };
    fs.readFile(fileName, processResponse);
  };
  this.parseTickers = () => {};
  this.processTickers = () => {};
}
module.exports = Stockfetch;
