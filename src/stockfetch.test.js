const Stockfetch = require("./Stockfetch");

const fs = require("fs");

describe("Stock fetch", () => {
  let stockfetch;

  beforeEach(() => {
    stockfetch = new Stockfetch();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should pass this smoke test", () => {
    expect(true).toBe(true);
  });

  it("read should invoke error handler for invalid file", (done) => {
    // ACT
    const onError = (err) => {
      expect(err).toBe("Error reading file: invalid file");
      done();
    };

    stockfetch.readTickersFile("invalid file", onError);
  });

  it("read should invoke processTickers for valid file", (done) => {
    const rawData = "GOOG\nAAPL\nORCL\nMSFT";
    const parsedData = ["GOOG", "APPL", "ORCL", "MSFT"];

    // Stub the parseTickers method to return parsedData
    const spy = jest
      .spyOn(stockfetch, "parseTickers")
      .mockReturnValue(parsedData);

    // Mock readFile function to invoke success callback with predefined data
    jest.spyOn(fs, "readFile").mockImplementation((fileName, callback) => {
      callback(null, rawData);
      done();
    });
    // 1. Do SPY
    const processTickerSpy = jest.spyOn(stockfetch, "processTickers");

    // 2. Do Call, to trigger the mocks.
    stockfetch.readTickersFile("tickers.txt");

    // 3. Check if mock is called
    expect(processTickerSpy).toHaveBeenCalledWith(parsedData);
  });
});
