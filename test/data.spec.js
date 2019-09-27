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

const function1 = [{type: ["paloma", "jessica "]} , {type: ["paloma", "monica "]} , {type: ["juliana"]} ]
describe("Filter", () => {
  it("is a function", () => {
    expect(typeof app.filterData).toBe("function");
  it("returns object that contains filter", () => {
    expect(app.filterData(function1, "jessica", "type")).toEqual({type: ["paloma", "jessica "]});
  });

const function2 = [{type: ["paloma", "jessica "]} , {type: ["paloma", "monica "]} , {type: ["juliana"]} ]
describe("get all types", () => {
  it("is a function", () => {
    expect(typeof app.getTypes).toBe("function");
  it("returns array of types", () => {
    expect(app.getTypes(function2)).toEqual([ "paloma", "jessica ", "monica ", "juliana" ]);
  });

const function3 = [{egg: "banana"} , {egg: "laranja"} , {egg: "banana"} ]
describe("get all eggs", () => {
  it("is a function", () => {
    expect(typeof app.getTypesEgg).toBe("function");
  it("returns array of eggs", () => {
    expect(app.getTypesEgg(function3)).toEqual([ "banana ", "laranja" ]);
  });

const function4 = [{candy_count: 25} , {candy_count: 10} , {candy_count: 25} ]
describe("get all Candy", () => {
  it("is a function", () => {
    expect(typeof app.getTypesCandy).toBe("function");
  it("returns array of candy", () => {
    expect(app.getTypesCandy(function4)).toEqual([ 25, 10 ]);
  });

const function5 = [{name: "paloma"} , {name: "jessica"} , {name: "monica"}]
describe("ordenate", () => {
  it("is a function", () => {
    expect(typeof app.sortPokemons).toBe("function");
  it("returns array data on a new order", () => {
    expect(app.sortPokemons(function5, "name", "asc")).toEqual([ "jessica ", "monica ",  "paloma" ]);
  });

const function6 = [{name: "paloma"} , {name: "jessica"} , {name: "monica"}]
describe("ordenate", () => {
  it("is a function", () => {
    expect(typeof app.sortPokemons).toBe("function");
  it("returns array data on a new order", () => {
    expect(app.findPokemon(function6, "jessica")).toEqual([ "jessica " ]);
  });

const function7 = [{height: "1.62 m"} , {height: "1.69 m"} , {height: "1.79 m"}]
describe("find the mean", () => {
  it("is a function", () => {
    expect(typeof app.computeStats).toBe("function");
  it("returns the mean", () => {
    expect(app.computeStats(function7, "height", " m")).toEqual([ "1.7" ]);
  });

const function8 = {candy_count: 1.62};
describe("find the candy_count value excluding undefined", () => {
  it("is a function", () => {
    expect(typeof app.showCandy).toBe("function");
  it("returns the number", () => {
    expect(app.showCandy(function8)).toEqual( 1.62 );
  });

const function9 = [3, 4, 10, 3, 6, 7, 12, 6, 3];
describe("Get the array and shows the frequency of each item", () => {
  it("is a function", () => {
    expect(typeof app.freq).toBe("function");
  it("returns one object with the item and its frequency", () => {
    expect(app.freq(function9)).toEqual( {3: 3, 4:1, 6:2, 7:1, 10:1, 12:1});
  });

const function10 = [{height: "banana"} , {height: "maçã"} , {height: "banana"}];
describe("Get the objects containing the height and shows the frequency of each item", () => {
  it("is a function", () => {
    expect(typeof app.getHeightFreq).toBe("function");
  it("returns one object with the item and its frequency", () => {
    expect(app.getHeightFreq(function10)).toEqual( {"banana": 2, "maçã":1});
  });

const function11 = [{weight: "2 kg"} , {weight: "12 kg"} , {weight: "2 kg"}];
describe("Get the objects containing the weight and shows the frequency of each item", () => {
  it("is a function", () => {
    expect(typeof app.getWeightFreq).toBe("function");
  it("returns one object with the item and its frequency", () => {
    expect(app.getWeightFreq(function11)).toEqual( {"0.1 - 5.0 kg": "5.1 - 50.0 kg", 12:1});
  });