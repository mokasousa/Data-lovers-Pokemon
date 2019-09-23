 require("../src/data.js");

//undefined
//
// describe("texto qualquer", () => {
//   it("is a function", () => {
//     expect(typeof window.functionName).toBe("function");
//   it("returns tal", () => {
//     expect(typeof window.functionName("parametro")).toEqual("tal");
//   });
//
//   it("returns `example`", () => {
//     expect(example()).toBe("example");
//   });
// });
const function2 = [{type: ["paloma", "jessica "]} , {type: ["paloma", "monica "]} , {type: ["juliana"]} ]
describe("get all types", () => {
  it("is a function", () => {
    expect(typeof app.getTypes).toBe("function");
  it("returns array of types", () => {
    expect(app.getTypes(function2)).toEqual([ "paloma", "jessica ", "monica ", "juliana" ]);
  });

const function3 = [{name: "paloma"} , {name: "jessica"} , {name: "monica"}]
describe("ordenate", () => {
  it("is a function", () => {
    expect(typeof app.sortPokemons).toBe("function");
  it("returns array data on a new order", () => {
    expect(app.sortPokemons(function3, "name", "asc")).toEqual([ "jessica ", "monica ",  "paloma" ]);
  });

const function4 = [{name: "paloma"} , {name: "jessica"} , {name: "monica"}]
describe("ordenate", () => {
  it("is a function", () => {
    expect(typeof app.sortPokemons).toBe("function");
  it("returns array data on a new order", () => {
    expect(app.findPokemon(function4, "jessica")).toEqual([ "jessica " ]);
  });


  const function5 = [{height: "1.62 m"} , {height: "1.69 m"} , {height: "1.79 m"}]
  describe("find the mean", () => {
    it("is a function", () => {
      expect(typeof app.computeStats).toBe("function");
    it("returns the mean", () => {
      expect(app.computeStats(function5, "height", " m")).toEqual([ "1.7" ]);
    });
