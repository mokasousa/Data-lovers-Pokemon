/*window.onload = () => {
    //getTypes(data);
};*/
const data = POKEMON.pokemon;
const filterType = document.getElementById('search');
const sectionCards = document.getElementById("list");
const selectionToSort = document.getElementById("new-order");
const btnInput = document.getElementById("input-search-btn");
const inputName = document.getElementById("input-search");

document.addEventListener("DOMContentLoaded", () => {
  displayTypeOptions(app.getTypes(data));
  printAllPokemons(data);
});

selectionToSort.addEventListener("change", () => {
  let targetData = selectionToSort.options[selectionToSort.selectedIndex].getAttribute('data')
  printAllPokemons(app.sortPokemons(data, selectionToSort.value, targetData));
});

btnInput.addEventListener("click", function (event) {
  event.preventDefault();
    sectionCards.innerHTML = "";
    printInCards(app.findPokemon(data, inputName.value));
  //};
}, false);

filterType.addEventListener("change", () => {
  printByType(app.filterDataByType(data, filterType.value));
});

//Printa na tela apenas os pokes filtrados pelo tipo
function printByType(filtered) {
  sectionCards.innerHTML = "";
  filtered.forEach(poke => printInCards(poke));
};

function printInCards (item) {
  sectionCards.innerHTML += `
    <article class= "cardPokemon">
    <img src="${item.img}" />
    <h4>${item.name}</h4>
    <p> ${item.num}</p>
    <p>Tipo: ${item.type.map(type => `${type}`).join(", ")}</p>
    </article>`
};

function printAllPokemons (allPokemons){
  sectionCards.innerHTML = "";
  data.forEach(poke => printInCards(poke));
};

function displayTypeOptions(allTypes) {
  filterType.innerHTML = "";
  filterType.innerHTML = `<option value="none">Filtrar Por Tipo</option>`;
  filterType.innerHTML += allTypes.map(type => `<option value= "${type}"> ${type}</option>`).join("");
};
