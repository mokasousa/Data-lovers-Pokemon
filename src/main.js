const data = POKEMON.pokemon;
const filterType = document.getElementById("select-type");
const filterEgg = document.getElementById("select-egg");
const filterCandy = document.getElementById("select-candy-count");
const sectionCards = document.getElementById("list");
const selectionToSort = document.getElementById("new-order");
const btnInput = document.getElementById("input-search-btn");
const inputName = document.getElementById("input-search");

document.addEventListener("DOMContentLoaded", () => {

  displayTypeOptions(app.getTypes(data));
  displayTypeEggs(app.getTypesEgg(data));
  displayTypeCandy(app.getTypesCandy(data, "candy_count"));

  printInCards(data);
});

btnInput.addEventListener("click", function (event) {
  event.preventDefault();
  let poke = app.findPokemon(data, inputName.value)
  if (typeof poke !== "undefined") {
    printFound(poke);
  };
}, false);

selectionToSort.addEventListener("change", () => {

  let targetData = selectionToSort.options[selectionToSort.selectedIndex].getAttribute("data");
  printInCards(app.sortPokemons(data, selectionToSort.value, targetData));
});

filterType.addEventListener("change", () => {
  printInCards(app.filterData(data, filterType.value, "type"));
});

filterEgg.addEventListener("change", () => {
  printInCards(app.filterData(data, filterEgg.value, "egg"));
});

filterCandy.addEventListener("change", () => {
  printInCards(app.filterData(data, filterCandy.value, "candy_count"));
});

function printInCards(data) {
  let layout = "";
  data.forEach(item => {
    const types = item.type.map(type => `<div class="label label-${type}">${type}</div>`).join("");
    layout += `
      <article class= "cardPokemon">
        <img src="${item.img}" id="${item.name}">
        <h4>${item.name}</h4>
        <p>
          # ${item.num}<br>
          <div class="types">${types}</div>
        </p>
      </article>`
  });
  sectionCards.innerHTML = layout;
};

function printFound(item) {
  const types = item.type.map(type => `<div class="label label-${type}">${type}</div>`).join("");
  let layout = "";
  layout += `
    <article class= "cardPokemon">
      <img src="${item.img}" id="${item.name}">
      <h4>${item.name}</h4>
      <p>${item.num}<br>
      ${types}</p>
    </article>`;
  sectionCards.innerHTML = layout;
};

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

sectionCards.addEventListener("click", (e) => {

  if (e.target.nodeName === "IMG") {

    let poke = findPokemon(data, e.target.id);

    printStats(poke);

    // const ctxHeight = document.getElementById("heightChart").getContext("2d");
    // const chart = new Chart(ctxHeight, {
    //   type: "bar",

    //   data: {
    //     labels: Object.keys(app.getHeightFreq(data)),
    //     datasets: [{
    //       label: "Altura",
    //       backgroundColor: "#DD545F",
    //       data: Object.values(app.getHeightFreq(data))
    //     }]
    //   },
    //   options: {
    //     responsive: true,
    //     mantainAspectRatio: false,
    //     title: {
    //       display: true,
    //       text: "Frequência das Alturas"
    //     }
    //   }

    // });

    // const ctxWeight = document.getElementById("weightChart").getContext("2d");
    // const chart1 = new Chart(ctxWeight, {

    //   type: "bar",

    //   data: {
    //     labels: Object.keys(app.getWeightFreq(data)),
    //     datasets: [{
    //       label: "Peso",
    //       backgroundColor: "#DD545F",
    //       data: Object.values(app.getWeightFreq(data))
    //     }]
    //   },

    //   options: {
    //     responsive: true,
    //     mantainAspectRatio: false,
    //     title: {
    //       display: true,
    //       text: "Frequência dos Pesos"
    //     }
    //   }

    // });

    const ctxSpawn = document.getElementById("rarityChart").getContext("2d");
    const chart2 = new Chart(ctxSpawn, {

      type: "scatter",

      data: {
        labels: getName(data),
        datasets: [{
          label: "Probabilidade de encontrar Pokémon em %",
          borderColor: "#DD545F",
          data: getSpawnChance(data, "spawn_chance", "spawn_time")
        }]
      }
    });
  };
}, false);

console.log(getSpawnChance(data, "spawn_chance"))

function printStats(poke) {
  const types = poke.type.map(type => `<div class="label label-${type}">${type}</div>`).join("");
  const weaknessArr = poke.weaknesses.map(type => filterData(data, type, "type")).flat();
  const weakness = weaknessArr.reduce((unique, poke) => unique.includes(poke) ? unique : [...unique, poke], []).map(poke => `<img src="${poke.img}">`).join('')
  //
  document.getElementById("main-stats").innerHTML = `
  <div class="main">
    <div class="poke-box">
      <section class= "poke-data" >
        <img src="${poke.img}">
        <h3>Id#${poke.id} ${poke.name}</h3> <br>
        <p>Mede ${poke.height} e pesa ${poke.weight} </p>
        <p>${poke.candy} ${showCandy(poke, "candy_count")}</p>
        <p>${poke.egg === 'Not in Eggs' ? 'Não está em ovos!' : 'Pode eclodir em ovos de '+poke.egg} </p>
        <p>${types}
        <p>${evolutions(poke, "prev_evolution", "next_evolution")}</p>
        <p class="weakness">Fraco contra: <br> ${weakness} </p>
      </section>
      <section class="main-2">
        <h3>Compare o Pokemón</h3>
        <br>
        <h4>Médias</h4>
        <p>Média de Altura: ${app.computeStats(data, "height", " m")} m</p>
        <p>Média de Peso: ${app.computeStats(data, "weight", " kg")} kg</p>
        <br>
        <h4>Raridade</h4>
        <canvas class="charts" id="rarityChart"></canvas>
        <br>
        <h4>Doces</h4>
        <p>
          12:${filterData(data, "12", "candy_count").map(el => `<img src="${el.img}">`).join("")} <br>
          25:${filterData(data, "25", "candy_count").map(el => `<img src="${el.img}">`).join("")} <br>
          50:${filterData(data, "50", "candy_count").map(el => `<img src="${el.img}">`).join("")} <br>
          100:${filterData(data, "100", "candy_count").map(el => `<img src="${el.img}">`).join("")} <br>
          400:${filterData(data, "400", "candy_count").map(el => `<img src="${el.img}">`).join("")}
        </p>
        <br>
        <h4>Ovos</h4>
        <p>
          2 KM: ${filterData(data, "2 km", "egg").map(el => `<img src="${el.img}">`).join("")} <br>
          5 KM: ${filterData(data, "5 km", "egg").map(el => `<img src="${el.img}">`).join("")} <br>
          10 KM: ${filterData(data, "10 km", "egg").map(el => `<img src="${el.img}">`).join("")}
        </p> 
      </section>
    </div>
  </div>`;
};

function evolutions(poke, prev, next) {
  let a = poke[prev] ? `Evoluções anteriores: ${poke[prev].map(i => `${i.name}`).join(", ")} <br>` : "";
  let b = poke[next] ? `Evoluções posteriores: ${poke[next].map(i => `${i.name}`).join(", ")}` : "";
  return a + b;
};

function showCandy(el, keyName) {
  return typeof el[keyName] !== "undefined" ? "(Precisa de "+el[keyName]+" para evoluir)" : "";
};
