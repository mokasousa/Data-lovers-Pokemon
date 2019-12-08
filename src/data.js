app = {
  getTypes,
  getTypesEgg,
  getTypesCandy,
  filterData,
  sortPokemons,
  findPokemon,
  computeStats,
  showCandy,
  freq,
  getHeightFreq,
  getWeightFreq,
  getSpawnChance,
  getName
};

function filterData(data, optionSelected, key) {
  return data.filter(item =>
    item[key] ? item[key].toString().includes(optionSelected) : false
  );
};

function getTypes(data) {
  return data.map(({type}) => type).flat().reduce((unique, item) => {
    return unique.includes(item) ? unique : [...unique, item]
  }, []);
}

function getTypesEgg(data) {
  const pokeEggs = data.map(({egg}) => egg);
  return pokeEggs.filter((item, index) => {
    return pokeEggs.indexOf(item) === index;
  }, {});
};

//4---------------------------------------------------------------------------//
function getTypesCandy(data, keyName) {
  const pokeCandy = data.map(({candy_count}) => candy_count).filter(i => typeof i !== "undefined");
  return pokeCandy.reduce((unique, item) => {
    return unique.includes(item) ? unique : [...unique, item]
  }, []);
};

function sortPokemons(data, sortBy, sortOrder) {
  if (sortOrder == "asc") {
    data.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  };
  if (sortOrder == "desc") {
    data.sort((a, b) => b[sortBy].localeCompare(a[sortBy]));
  };
  return data;
};

function findPokemon(data, name) {
  const found = data.find(el => el.name.toUpperCase() === name.toUpperCase());
  if (found) return;
}


function computeStats(data, key, h) {
  return (data.map(poke => +(poke[key]).replace(h, "")).reduce((total, next) => total + next)/data.length).toFixed(2);
};

function showCandy(el, keyName) {
  return typeof el[keyName] !== "undefined" ? el[keyName] : "";
};

function freq(arr) {
  return arr.reduce((counter, item) => {
    if (item in counter) {
      counter[item]++;
    } else {
      counter[item] = 1;
    }
    return counter;
  }, {});
};

function getHeightFreq(data) {
  return freq(data.map(({height}) => height).sort((a, b) => a.localeCompare(b)));
};

//11---------------------------------------------------------------------------//
//calcula a frequencia dos pesos
function getWeightFreq(data) {
  const weightAll = data.map(poke => {
    let num = +(poke.weight).replace(" kg", "");
    if (num <= 5) {
      num = "0.1 - 5.0 kg";
    } else if (5 > num || num <= 50) {
      num = "5.1 - 50.0 kg";
    } else if (50 > num || num <= 200) {
      num = "50.1 - 100 kg";
    } else if (200 > num || num <= 400) {
      num = "100.1 - 300.0 kg";
    } else if (400 > num || num <= 999) {
      num = "300.1 - 999.0 kg";
    }
  });
  weightAll.sort((a, b) => a.localeCompare(b));
  return app.freq(weightAll);
};

function getSpawnChance(data, keyName) {
  const spwanChanceAll = [];
  const dataSort = data.sort((a, b) => (a.name).localeCompare(b.name));
  dataSort.forEach(poke => spwanChanceAll.push(poke[keyName]));
  return spwanChanceAll;
};

function getName(data) {
  return data.sort((a, b) => (a.name).localeCompare(b.name)).map(({name}) => name);
};

