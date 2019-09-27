const app = {
  getTypes,
  getTypesEgg,
  getTypesCandy,
  filterData,
  sortPokemons,
  findPokemon,
  computeStats
};

//1---------------------------------------------------------------------------//
//filtra os objetos que contém o item escolhido
function filterData(data, optionSelected, key) {
  //retorna array com objetos filtrados
return data.filter(item => 
    item[key] ? item[key].toString().includes(optionSelected) : false
  )
};
//2-OK------------------------------------------------------------------------//
//mapeia e guarda numa array todos os tipos contidos em data
function getTypes(data) {
  const poketypes = [];
  //1-mapeia o data e 2-mapeia os tipos
  data.map(poke => poke.type.map(type => {
    //se na array poketypes não houver o tipo ainda, dar o push no tipo
    if (!poketypes.includes(type)){
        poketypes.push(type);
    } else {
    return false;
    }
  }));
  return poketypes;
};


function getTypesEgg(data) {
  const poketypesEgg = [];
  //1-mapeia o data e 2-mapeia os tipos
  data.map(poke => {
    //se na array poketypes não houver o tipo ainda, dar o push no tipo
    if (!poketypesEgg.includes(poke.egg)){
      poketypesEgg.push(poke.egg);
    } else {
      return false;
    }

  });
  return poketypesEgg;
};



function getTypesCandy(data) {
  const poketypesCandy = [];
  //1-mapeia o data e 2-mapeia os tipos
  data.map(poke => {
    //se na array poketypes não houver o tipo ainda, dar o push no tipo
    if ((!poketypesCandy.includes(poke.candy_count)) && (poke.candy_count)){       
        poketypesCandy.push(poke.candy_count);
    } else {
    return false;
    }
  });
  return poketypesCandy;
};



//----------------------------------------------------------------------------//
//FAZER: UMA FUNÇÃO GETEGGS E GETCANDYCOUNTS EEE VER SE DÁ PRA JUNTAR TUDO EM 1
//FUNÇÃO(JUNTO COM GET TYPES)
//
// function getInfo(data) {
//   const pokeInfo = [];
//   //1-mapeia o data e 2-mapeia os tipos
//   data.map(poke => pokeInfo.push(poke.egg));
//     //se na array poketypes não houver o tipo ainda, dar o push no tipo
//     //if (!poketypes.includes(poke["egg"])) {
//
//     //} else {
//     //return false;
//     //}
//   };
//   return pokeInfo;
// };

//console.log(getInfo(data));



//3---------------------------------------------------------------------------//
//ordena os pokemons de acordo com option value(sortBy) e o option data(sortOrder)
function sortPokemons(data, sortBy, sortOrder) {
  if(sortOrder == "asc") {
    //coloca o item menor antes do item maior
    data.sort((a,b) => a[sortBy].localeCompare(b[sortBy]));
  };
  if(sortOrder == "desc") {
    //coloca o item maior antes do item menor
    data.sort((a,b) => b[sortBy].localeCompare(a[sortBy]));
  };
  //retorna o array data reordenado
  return data;
};

//4---------------------------------------------------------------------------//
//procura o pokémon pelo nome(input value)
function findPokemon(data, name) {
  let found = data.find(el => el.name === name);
  //checa se o nome foi escrito corretamente e retorna o objeto pokemon correspondente
  if (found) {return found};
}

//5---------------------------------------------------------------------------//
//calcula a média da altura e do peso
function computeStats(data, key, h) {
  let itemAll = [];
  data.map(poke => {
    let num = +(poke[key]).replace(h,'');
    itemAll.push(num);
  })
  let sum = itemAll.reduce((total, next) => {
    return total + next;
  });
  return (sum/data.length).toFixed(2);
};
