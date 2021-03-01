const Stockfetch = require("./stockfetch");

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
    // Arrange
    jest.spyOn(fs, "readFile").mockImplementation((fileName, callback) => {
      callback(new Error("failed"));
    });

    // Act //Assert
    const onError = (err) => {
      expect(err).toBe("Error reading file: invalid file");
      done();
    };
    stockfetch.readTickersFile("invalid file", onError);
  });

  it("read should invoke processTickers for valid file", (done) => {
    // 1. Arrange: Setup variable, mocks, stubs, spies
    // Stub the parseTickers method to return parsedData
    const rawData = "GOOG\nAAPL\nORCL\nMSFT";
    const parsedData = ["GOOG", "APPL", "ORCL", "MSFT"];

    const spy = jest
      .spyOn(stockfetch, "parseTickers")
      .mockReturnValue(parsedData);

    // Mock readFile function to invoke success callback with predefined data
    jest.spyOn(fs, "readFile").mockImplementation((fileName, callback) => {
      callback(null, rawData);
    });

    const processTickerSpy = jest
      .spyOn(stockfetch, "processTickers")
      .mockImplementation((data) => {
        console.log("Called with: ", data);
        done();
      });

    // 2. Act: Do Call, to trigger the mocks.
    stockfetch.readTickersFile("tickers.txt");

    // 3. Assert: Check if mock is called
    expect(processTickerSpy).toHaveBeenCalledWith(parsedData);
  });
});
