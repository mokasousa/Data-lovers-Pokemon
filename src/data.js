app = {
  getTypes,
  getTypesEgg,
  getTypesCandy,
  filterData,
  sortPokemons,
  findPokemon,
  computeStats,
  freq,
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
  if (found) return found;
}


function computeStats(data, key, h) {
  return (data.map(poke => +(poke[key]).replace(h, "")).reduce((total, next) => total + next)/data.length).toFixed(2);
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

function getSpawnChance(data, keyName) {
  const spwanChanceAll = [];
  const dataSort = data.sort((a, b) => (a.name).localeCompare(b.name));
  dataSort.forEach(poke => spwanChanceAll.push(poke[keyName]));
  return spwanChanceAll;
};

function getName(data) {
  return data.sort((a, b) => (a.name).localeCompare(b.name)).map(({name}) => name);
};

