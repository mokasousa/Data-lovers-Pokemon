require("../src/data.js");

const function1 = [{type: ["paloma", "jessica"]}, {type: ["paloma", "monica"]}, {type: ["juliana"]}];
describe("filterData", () => {
  it("is a function", () => {
    expect(typeof app.filterData).toBe("function");
  });
  it("returns object that contains filter", () => {
    expect(app.filterData(function1, "jessica", "type")).toEqual([{type: ["paloma", "jessica"]}]);
  });
});

const function2 = [{type: ["paloma", "jessica"]}, {type: ["paloma", "monica"]}, {type: ["juliana"]}];
describe("getTypes", () => {
  it("is a function", () => {
    expect(typeof app.getTypes).toBe("function");
  });
  it("returns array of types", () => {
    expect(app.getTypes(function2)).toEqual([ "paloma", "jessica", "monica", "juliana"]);
  });
});

const function3 = [{egg: "banana"}, {egg: "laranja"}, {egg: "banana"}];
describe("getTypesEgg", () => {
  it("is a function", () => {
    expect(typeof app.getTypesEgg).toBe("function");
  });
  it("returns array of eggs", () => {
    expect(app.getTypesEgg(function3)).toEqual(["banana", "laranja"]);
  });
});

const function4 = [{candyCount: 25}, {candyCount: 10}, {candyCount: 25}];
describe("getTypesCandy", () => {
  it("is a function", () => {
    expect(typeof app.getTypesCandy).toBe("function");
  });
  it("returns array of candy", () => {
    expect(app.getTypesCandy(function4, "candyCount")).toEqual([25, 10]);
  });
});

const function5 = [{name: "paloma"}, {name: "jessica"}, {name: "monica"}];
describe("sortPokemons", () => {
  it("is a function", () => {
    expect(typeof app.sortPokemons).toBe("function");
  });
  it("returns array data on a new order", () => {
    expect(app.sortPokemons(function5, "name", "asc")).toEqual([ {"name": "jessica"}, {"name": "monica"}, {"name": "paloma"}]);
  });
});

const function6 = [{name: "paloma"}, {name: "jessica"}, {name: "monica"}];
describe("findPokemon", () => {
  it("is a function", () => {
    expect(typeof app.findPokemon).toBe("function");
  });
  it("returns array data on a new order", () => {
    expect(app.findPokemon(function6, "jessica")).toEqual({name: "jessica"});
  });
});

const function7 = [{height: "1.62 m"}, {height: "1.69 m"}, {height: "1.79 m"}];
describe("computeStats", () => {
  it("is a function", () => {
    expect(typeof app.computeStats).toBe("function");
  }); 
  it("returns the mean", () => {
    expect(app.computeStats(function7, "height", " m")).toEqual("1.70");
  });
});

// const function8 = {candyCount: 1.62};
// describe("showCandy", () => {
//   it("is a function", () => {
//     expect(typeof app.showCandy).toBe("function");
//   });
//   it("returns the number", () => {
//     expect(app.showCandy(function8, "candyCount")).toEqual(1.62);
//   });
// });

const function9 = [3, 4, 10, 3, 6, 7, 12, 6, 3];
describe("freq", () => {
  it("is a function", () => {
    expect(typeof app.freq).toBe("function");
  });
  it("returns one object with the item and its frequency", () => {
    expect(app.freq(function9)).toEqual( {3: 3, 4: 1, 6: 2, 7: 1, 10: 1, 12: 1});
  });
});


const function12 = [{name: "banana", spawnChance: 1}, {name: "amora", spawnChance: 3}, {name: "maçã", spawnChance: 2}];
describe("getSpawnChance", () => {
  it("is a function", () => {
    expect(typeof app.getSpawnChance).toBe("function");
  });
  it("returns array with spawnChance", () => {
    expect(app.getSpawnChance(function12, "spawnChance")).toEqual([3, 1, 2]);
  });
});

const function13 = [{name: "banana"}, {name: "amora"}, {name: "maçã"}];
describe("getName", () => {
  it("is a function", () => {
    expect(typeof app.getName).toBe("function");
  });
  it("returns array with names", () => {
    expect(app.getName(function13)).toEqual(["amora", "banana", "maçã"]);
  });
});