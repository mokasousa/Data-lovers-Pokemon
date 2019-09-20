const app = {
  getTypes,
  filterDataByType,
  sortPokemons,
  findPokemon
};

function filterDataByType(data, optionSelected) {
   return data.filter(item => item.type.includes(optionSelected));
};

function getTypes(allTypes) {
  const poketypes = [];
  allTypes.map(poke => poke.type.map(type => {
    if (!poketypes.includes(type)){
        poketypes.push(type);
    } else {
    return false;
    }
  }));
  return poketypes;
};
function sortPokemons(data, sortBy, sortOrder) {
  if(sortOrder == "asc") {
    data.sort((a,b) => a[sortBy].localeCompare(b[sortBy]));
  };
  if(sortOrder == "desc") {
    data.sort((a,b) => b[sortBy].localeCompare(a[sortBy]));
  };
  return data;
};

function findPokemon(data, name) {
  let found = data.find(el => el.name === name);
  if (found) {return found};
}
