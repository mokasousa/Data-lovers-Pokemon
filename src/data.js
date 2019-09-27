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

//1---------------------------------------------------------------------------//
//filtra os objetos que contém o item escolhido
function filterData(data, optionSelected, key) {
  //retorna array com objetos filtrados
  return data.filter(item =>
    item[key] ? item[key].toString().includes(optionSelected) : false
  );
};
//2-OK------------------------------------------------------------------------//
//mapeia e guarda numa array todos os tipos contidos em data
function getTypes(data) {
  const poketypes = [];
  //1-mapeia o data e 2-mapeia os tipos
  data.map(poke => poke.type.map(type => {
    //se na array poketypes não houver o tipo ainda, dar o push no tipo
    if (!poketypes.includes(type)) {
      poketypes.push(type);
    } else {
      return false;
    }
  }));
  return poketypes;
};

//3-OK------------------------------------------------------------------------//
function getTypesEgg(data) {
  const poketypesEgg = [];
  //1-mapeia o data e 2-mapeia os eggs
  data.map(poke => {
    //se na array poketypes não houver o tipo ainda, dar o push no tipo
    if (!poketypesEgg.includes(poke.egg)) {
      poketypesEgg.push(poke.egg);
    } else {
      return false;
    }

  });
  return poketypesEgg;
};

//4-OK------------------------------------------------------------------------//
function getTypesCandy(data, keyName) {
  const poketypesCandy = [];
  //1-mapeia o data e 2-mapeia os tipos
  data.map(poke => {
    //se na array poketypes não houver o tipo ainda, dar o push no tipo
    if ((!poketypesCandy.includes(poke[keyName])) && (poke[keyName])) {
      poketypesCandy.push(poke[keyName]);
    } else {
      return false;
    }
  });
  return poketypesCandy;
};

//5---------------------------------------------------------------------------//
//ordena os pokemons de acordo com option value(sortBy) e o option data(sortOrder)
function sortPokemons(data, sortBy, sortOrder) {
  if (sortOrder == "asc") {
    //coloca o item menor antes do item maior
    data.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  };
  if (sortOrder == "desc") {
    //coloca o item maior antes do item menor
    data.sort((a, b) => b[sortBy].localeCompare(a[sortBy]));
  };
  //retorna o array data reordenado
  return data;
};

//6---------------------------------------------------------------------------//
//procura o pokémon pelo nome(input value)
function findPokemon(data, name) {
  let found = data.find(el => el.name === name);
  //checa se o nome foi escrito corretamente e retorna o objeto pokemon correspondente
  if (found) {return found;};
}

//7---------------------------------------------------------------------------//
//calcula a média da altura e do peso
function computeStats(data, key, h) {
  let itemAll = [];
  data.map(poke => {
    let num = +(poke[key]).replace(h, "");
    itemAll.push(num);
  });
  let sum = itemAll.reduce((total, next) => {
    return total + next;
  });
  return (sum/data.length).toFixed(2);
};

//8---------------------------------------------------------------------------//
//função para mostrar o número de candy apenas se hover um número válido
function showCandy(el, keyName) {
  if (typeof el[keyName] !== "undefined") {
    return el[keyName];
  } else {
    return "";
  };
};

//9---------------------------------------------------------------------------//
//Contabiliza o números de vezes que cada item que aparece na array,
//retorna objeto onde as keys são os itens da array e os values é a quantidade
function freq(arr) {
  return arr.reduce((counter, item) => {
    counter[item] = counter.hasOwnProperty(item) ? counter[item] + 1 : 1;
    return counter;
  }, {});
};

//10---------------------------------------------------------------------------//
//calcula a frequencia das alturas
function getHeightFreq(data) {
  const heightAll = [];
  data.map(poke => heightAll.push(poke.height));
  heightAll.sort((a, b) => a.localeCompare(b));
  return app.freq(heightAll);
};

//11---------------------------------------------------------------------------//
//calcula a frequencia dos pesos
function getWeightFreq(data) {
  const weightAll = [];
  data.map(poke => {
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
    weightAll.push(num);
  });
  weightAll.sort((a, b) => a.localeCompare(b));
  return app.freq(weightAll);
};

//12--------------------------------------------------------------------------//
function getSpawnChance(data, keyName) {
  const spwanChanceAll = [];
  const dataSort = data.sort((a, b) => (a.name).localeCompare(b.name));
  dataSort.map(poke => spwanChanceAll.push(poke[keyName]));
  return spwanChanceAll;
};

//13--------------------------------------------------------------------------//
//forma uma array de nomes em ordem alfabética
function getName(data) {
  const nameAll = [];
  const dataSort = data.sort((a, b) => (a.name).localeCompare(b.name));
  dataSort.map(poke => nameAll.push(poke.name));
  return nameAll;
};
