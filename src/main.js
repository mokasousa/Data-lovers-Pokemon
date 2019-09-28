const data = POKEMON.pokemon;
const filterType = document.getElementById("select-type");
const filterEgg = document.getElementById("select-egg");
const filterCandy = document.getElementById("select-candy-count");
const sectionCards = document.getElementById("list");
const selectionToSort = document.getElementById("new-order");
const btnInput = document.getElementById("input-search-btn");
const inputName = document.getElementById("input-search");

//-----------------------------Event Listeners--------------------------------//

//Eventlistener para printar os cards na tela inicial e as caixas select para os filtros
document.addEventListener("DOMContentLoaded", () => {

  //Cria um select para os tipos com lista de tipos criada por getTypes
  displayTypeOptions(app.getTypes(data));
  displayTypeEggs(app.getTypesEgg(data));
  displayTypeCandy(app.getTypesCandy(data, "candy_count"));

  //printa os cards de todos os pokémons
  printAllPokemons(data);
});

//Eventlistener para o botão Procurar
// TRAVAR O USUARIO QUANDO NÃO ESCREVE NADA
btnInput.addEventListener("click", function (event) {
  event.preventDefault();
  sectionCards.innerHTML = "";
  printInCards(app.findPokemon(data, inputName.value));
  //};
}, false);

//Eventlistener para o select de ordenação
selectionToSort.addEventListener("change", () => {

  //guarda o valor de <option data="..."> DÁ PRA FAZER DE OUTRA FORMA?
  let targetData = selectionToSort.options[selectionToSort.selectedIndex].getAttribute("data");

  printAllPokemons(app.sortPokemons(data, selectionToSort.value, targetData));
});

//Eventlistener para o select por tipo, ovos e raridade
filterType.addEventListener("change", () => {
  printFilter(app.filterData(data, filterType.value, "type"));
});

filterEgg.addEventListener("change", () => {
  printFilter(app.filterData(data, filterEgg.value, "egg"));
});

filterCandy.addEventListener("change", () => {
  printFilter(app.filterData(data, filterCandy.value, "candy_count"));
});

//------------------------------Funções do DOM--------------------------------//
//Printa na <section class="cards"> os cards de todos os Pokémons que correspondem
//ao tipo selecionado
function printFilter(filtered) {
  sectionCards.innerHTML = "";
  filtered.forEach(poke => printInCards(poke));
};

//Add na <section id="list"> as infos de cada Pokémon
function printInCards (item) {
  sectionCards.innerHTML += `
    <article class= "cardPokemon">
    <img src="${item.img}" id="${item.name}">
    <h4>${item.name}</h4>
    <p>${item.num}<br>
    ${item.type.map(type => `${type}`).join(", ")}</p>
    </article>`;
};

//Printa na tela inicial os cards de todos os Pokémons
function printAllPokemons (data) {
  sectionCards.innerHTML = "";
  data.forEach(poke => printInCards(poke));
};

//Cria options para os <select id="select-type", id= "elect-candy-count" e id="select-egg">
function displayTypeOptions(allTypes) {
  filterType.innerHTML = "";
  filterType.innerHTML = "<option value=\"none\">Filtrar Por Tipo</option>";
  filterType.innerHTML += allTypes.map(type => `<option value= "${type}"> ${type}</option>`).join("");
};

function displayTypeEggs(egg) {
  filterEgg.innerHTML = "";
  filterEgg.innerHTML = "<option value=\"none\">Filtrar Por Ovos</option>";
  filterEgg.innerHTML += egg.map(egg => `<option value= "${egg}"> ${egg}</option>`).join("");
};

function displayTypeCandy(candy) {
  filterCandy.innerHTML = "";
  filterCandy.innerHTML = "<option value=\"none\">Filtrar Por Doces</option>";
  filterCandy.innerHTML += candy.map(candy => `<option value= "${candy}"> ${candy}</option>`).join("");
};

//-----------------------Event listener click no Pokémon----------------------//
//Eventlistener para o click na imagem do pokémon
sectionCards.addEventListener( "click", function( e ) {

  //se o click for na imagem do pokémon
  if (e.target.nodeName == "IMG") {

    //encontra em data o objeto correspondente ao pokémon clicado
    let poke = findPokemon(data, e.target.id);

    //printa na <main> info do pokémon clicado + gráficos
    printStats(poke);

    //Chart 1...............................................................
    var ctxHeight = document.getElementById("heightChart").getContext("2d");
    var chart = new Chart(ctxHeight, {
      type: "bar",

      data: {
        labels: Object.keys(app.getHeightFreq(data)),
        datasets: [{
          label: "Altura",
          backgroundColor: "#DD545F",
          data: Object.values(app.getHeightFreq(data))
        }]
      },
      options: {
        responsive: true,
        mantainAspectRatio: false,
        title: {
          display: true,
          text: "Frequência das Alturas"
        }
      }

    });

    //Chart 2...............................................................
    var ctxWeight = document.getElementById("weightChart").getContext("2d");
    var chart = new Chart(ctxWeight, {

      type: "bar",

      data: {
        labels: Object.keys(app.getWeightFreq(data)),
        datasets: [{
          label: "Peso",
          backgroundColor: "#DD545F",
          data: Object.values(app.getWeightFreq(data))
        }]
      },

      options: {
        responsive: true,
        mantainAspectRatio: false,
        title: {
          display: true,
          text: "Frequência dos Pesos"
        }
      }

    });

    //Chart 3............................................................
    var ctxSpawn = document.getElementById("rarityChart").getContext("2d");
    var chart = new Chart(ctxSpawn, {

      type: "line",

      data: {
        labels: getName(data),
        datasets: [{
          label: "Probabilidade de encontrar Pokémon em %",
          borderColor: "#DD545F",
          data: getSpawnChance(data, "spawn_chance")
        }]
      }
    });
  };
}, false);

//-----------------------Funções para pág. de stats---------------------------//

//printa na <main> info do pokémon clicado + gráficos
function printStats(poke) {
  document.getElementById("main-stats").innerHTML = `
  <div class="main">
  <div class="poke-box">
  <section class= "poke-data" class="main-2">
  <img src="${poke.img}">
  <h3>Id#${poke.id} ${poke.name}</h3> <br>
  <p>Altura: ${poke.height} <br>
  Peso: ${poke.weight} <br>
  Candy: ${app.showCandy(poke, "candy_count")} ${poke.candy}<br>
  Ovo: ${poke.egg} <br>
  Tipo: ${poke.type.map(type => `${type}`).join(", ")} <br>
  Fraco contra os tipos: ${poke.weaknesses.map(type => `${type}`).join(", ")} <br>
  ${evolutions(poke, "prev_evolution", "next_evolution")}
  </p>
  </section>
  <section class= "candy-data" class="main-2">
  <h4>Doces</h4>
  <p>12:${filterData(data, "12", "candy_count").map(poke => `<img src="${poke.img}">`).join("")} <br>
  25:${filterData(data, "25", "candy_count").map(poke => `<img src="${poke.img}">`).join("")} <br>
  50:${filterData(data, "50", "candy_count").map(poke => `<img src="${poke.img}">`).join("")} <br>
  100:${filterData(data, "100", "candy_count").map(poke => `<img src="${poke.img}">`).join("")} <br>
  400:${filterData(data, "400", "candy_count").map(poke => `<img src="${poke.img}">`).join("")}</p>
  </section>
  <section class= "egg-data" class="main-2">
  <h4>Ovos</h4>
  <p>2 KM: ${filterData(data, "2 km", "egg").map(poke => `<img src="${poke.img}">`).join("")} <br>
  5 KM: ${filterData(data, "5 km", "egg").map(poke => `<img src="${poke.img}">`).join("")} <br>
  10 KM: ${filterData(data, "10 km", "egg").map(poke => `<img src="${poke.img}">`).join("")}</p>
  </section>
  </div>
  <section class="main-2">
  <p>Média de Altura: ${app.computeStats(data, "height", " m")} m</p>
  <p>Média de Peso: ${app.computeStats(data, "weight", " kg")} kg</p>
  </section>
  <div class="bars">
  <canvas class="charts" id="heightChart"></canvas>
  <canvas class="charts" id="weightChart"></canvas>
  </div>
  <canvas class="charts" id="rarityChart"></canvas>
  </div>`;
};

//printa as evoluções
function evolutions(poke, prev, next) {
  //condicional ternário: se existe prev_evolution printa, se não deixa vazio
  let a = poke[prev] ? `Evoluções anteriores: ${poke[prev].map(i => `${i.name}`).join(", ")} <br>` : "";
  //condicional ternário: se existe next_evolution printa, se não deixa vazio
  let b = poke[next] ? `Evoluções posteriores: ${poke[next].map(i => `${i.name}`).join(", ")}` : "";
  return a + b;
};
