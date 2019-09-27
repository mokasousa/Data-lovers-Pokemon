const data = POKEMON.pokemon;
const filterType = document.getElementById("select-type");
const filterEgg = document.getElementById("select-egg");
const filterCandy = document.getElementById("select-candy-count");
const sectionCards = document.getElementById("list");
const selectionToSort = document.getElementById("new-order");
const btnInput = document.getElementById("input-search-btn");
const inputName = document.getElementById("input-search");
//-----------------------------Event Listeners--------------------------------//

console.log(app.getWeightFreq(data));
//Eventlistener para printar os cards na tela inicial e as caixas select para os filtros
document.addEventListener("DOMContentLoaded", () => {

  //Cria um select para os tipos com lista de tipos criada por getTypes
  displayTypeOptions(app.getTypes(data));
  displayTypeEggs(app.getTypesEgg(data));
  displayTypeCandy(app.getTypesCandy(data));

  //FAZER: CRIAR SELECT PARA OVO E CANDY_COUNT

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

//FAZER: EVENTLISTENER PARA O ÍCONE HOME
//FAZER: EVENT LISTENER PARA O ÍCONE INFO

//-------------------------------Functions DOM--------------------------------//
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
    <h5>${item.name}</h5>
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
          label: "Freq: Altura",
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
      },

      tooltips: {
        mode: "index",
        intersect: true,
      },

      annotation: {
        annotations: [{
          type: "line",
          mode: "vertical",
          //scaleID: "x-axis-0",
          value: app.computeStats(data, "height", " m"),
          //borderColor: #0089CE,
          borderWidth: 3,
          label: {
            enabled: true,
            content: "Média dos Alturas"
          }
        }]
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
      },

      tooltips: {
        mode: "index",
        intersect: true,
      },

      annotation: {
        annotations: [{
          type: "line",
          mode: "vertical",
          scaleID: "x-axis-0",
          value: app.computeStats(data, "weight", " kg"),
          //borderColor: #0089CE,
          borderWidth: 3,
          label: {
            enabled: true,
            content: "Média dos Pesos"
          }
        }]
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
          data: getSpawnChance(data)
        }]
      },
      //options: {}
    });
  };
}, false);//fecha event listener click img pokémon

//-----------------------Funções para pág. de stats---------------------------//
//printa na <main> info do pokémon clicado + gráficos
function printStats(poke) {
  document.getElementById("main-stats").innerHTML = `
  <div class="main">
  <div class="poke-box">
  <section class= "poke-data" class="main-2">
  <img src="${poke.img}">
  <h4>Id#${poke.id} ${poke.name}</h4> <br>
  <p>Altura: ${poke.height} <br>
  Peso: ${poke.weight} <br>
  Candy: ${app.showCandy(poke)} ${poke.candy}<br>
  Ovo: ${poke.egg} <br>
  Tipo: ${poke.type.map(type => `${type}`).join(", ")} <br>
  Fraqueza de defesa: ${poke.weaknesses.map(type => `${type}`).join(", ")} <br>
  </p>
  </section>
  <section class= "egg-data" class="main-2">
  <h5>Ovos</h5><br>
  <p>2 KM: ${getEggPokes(data, "2 km")} <br>
  5 KM: ${getEggPokes(data, "5 km")} <br>
  10 KM: ${getEggPokes(data, "10 km")}</p>
  </section>
  </div>
  <section class="main-2">
  <p>Média de Altura: ${app.computeStats(data, "height", " m")}</p>
  <p>Média de Peso: ${app.computeStats(data, "weight", " kg")}</p>
  </section>
  <div class="bars">
  <canvas class="charts" id="heightChart"></canvas>
  <canvas class="charts" id="weightChart"></canvas>
  </div>
  <canvas class="charts" id="rarityChart"></canvas>
  </div>`;
};

//printa na caixa de ovos as imagens dos pokes correspondentes
function getEggPokes(data, km) {
  let a = data.filter(item => item.egg.includes(km));
  let b = a.map(poke => `<img src="${poke.img}">`).join("");
  return b;
};

/*
//printa na caixa de ovos as imagens dos pokes correspondentes
function getCandyPokes(data, num){
  let a = data.filter(item => item.candy_count.includes(num));
  let b = a.map(poke => `<img src="${poke.img}">`).join("");
  return b;
};*/

//console.log(getCandyPokes(data, "25"));
