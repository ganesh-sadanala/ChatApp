var request = require("request");
describe("calc", () => {
  it("should multiply 2 and 2", () => {
    expect(2 * 2).toBe(4);
  });
});

describe("get messages", () => {
  it("should be 200 Ok", (done) => {
    request.get("http://localhost:3000/messages", (err, res) => {
      console.log(res.body);
      expect(res.statusCode).toEqual(200);
      done();
    });
  });
  it("should return a list that is not empty", (done) => {
    request.get("http://localhost:3000/messages", (err, res) => {
      console.log(res.body);
      expect(JSON.parse(res.body).length).toBeGreaterThan(20);
      done();
    });
  });
});
