const data = POKEMON.pokemon;
//const filterType = document.getElementById('search');
//const printType = document.getElementById('type-list');
//const sectionCards = document.getElementById("list");

document.addEventListener("DOMContentLoaded", () => {
  const pokeTypes = getTypes(data);
  //constrói a caixa de seleção para os tipos
  displayTypeOptions(pokeTypes);
  printAllPokemons(data);
});

document.getElementById("new-order").addEventListener('input', function (event) {
  if (event.target.value === "lowest-num") {
      let allPokesLowest = data.sort(function(a, b) {return a.num.localeCompare(b.num)});
      printAllPokemons(allPokesLowest);
  } else if (event.target.value === "highest-num") {
      let allPokesHighest = data.sort(function(a, b) {return b.num.localeCompare(a.num)});
      printAllPokemons(allPokesHighest);
  } else if (event.target.value === "a") {
      let allPokesAZ = data.name.sort(function(a, b) {return a.name.localeCompare(b.name)});
      printAllPokemons(allPokesAZ);
  } else if (event.target.value === "z") {
      let allPokesZA = data.sort(function(a, b) {return b.name.localeCompare(a.name)});
      printAllPokemons(allPokesZA);
  };
}, false);
/*
document.getElementById('search').addEventListener("change", () => {
  printByType(filterDataByType(data, document.getElementById('search').value));
});*/


document.getElementById("input-search-btn").addEventListener("click", function (event) {
  event.preventDefault();
  let inputName = document.getElementById("input-search").value;
  let found = data.find(el => el.name === inputName);
  if (found) {
    let sectionCards = document.getElementById("list");
    sectionCards.innerHTML = "";
    sectionCards.innerHTML +=
      `<article class= "cardPokemon">
       <img src="${found.img}" />
       <h4>${found.name}</h4>
       <p> ${found.num}</p>
       <p>Tipo: ${found.type.map(type => `${type}`).join(", ")}</p>
       </article>`

  };
}, false);



document.getElementById('search').addEventListener("change", () => {
  printByType(/*window.*/filterDataByType(data, document.getElementById('search').value));
});

/*window.onload = () => {
    getTypes(data);
};*/

//Cria um array contendo todos os tipos de pokes existentes em data
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

//Printa na tela apenas os pokes filtrados pelo tipo
function printByType(filtered) {
  document.getElementById('type-list').innerHTML = "";
  filtered.forEach(poke => {
    document.getElementById('type-list').innerHTML += `
      <article class= "cardPokemon">
      <img src="${poke.img}" />
      <h4>${poke.name}</h4>
      <p> ${poke.num}</p>
      <p>Tipo: ${poke.type.map(type => `${type}`).join(", ")}</p>
      </article>`
    });
};

//printa na tela todos os pokemons de data
function printAllPokemons (allPokemons){
  document.getElementById("list").innerHTML = "";
  allPokemons.forEach(poke => {
      document.getElementById("list").innerHTML += `
      <article class= "cardPokemon">
      <img src="${poke.img}" />
      <h4>${poke.name}</h4>
      <p> ${poke.num}</p>
      <p>Tipo: ${poke.type.map(type => `${type}`).join(", ")}</p>
      </article>`
  });
};

function filterDataByType(data, optionSelected) {
  return data.filter(item => item.type.includes(optionSelected));
};

function displayTypeOptions(allTypes) {
  document.getElementById('search').innerHTML = "";
  document.getElementById('search').innerHTML = `<option value="none">Filtrar Por Tipo</option>`;
  document.getElementById('search').innerHTML += allTypes.map(type => `<option value= "${type}"> ${type}</option>`).join("");
};
