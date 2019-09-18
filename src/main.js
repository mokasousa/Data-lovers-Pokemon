let allPokemons = POKEMON.pokemon;

document.addEventListener("DOMContentLoaded", () => {
  printPokemons(allPokemons);
});

let select = document.getElementById("new-order");
select.addEventListener('input', function (event) {
  if (event.target.value === "lowest-num") {
      let allPokesLowest = allPokemons.sort(function(a, b) {return a.num.localeCompare(b.num)});
      printPokemons(allPokesLowest);
  } else if (event.target.value === "highest-num") {
      let allPokesHighest = allPokemons.sort(function(a, b) {return b.num.localeCompare(a.num)});
      printPokemons(allPokesHighest);
  } else if (event.target.value === "a") {
      let allPokesAZ = allPokemons.sort(function(a, b) {return a.name.localeCompare(b.name)});
      printPokemons(allPokesAZ);
  } else if (event.target.value === "z") {
      let allPokesZA = allPokemons.sort(function(a, b) {return b.name.localeCompare(a.name)});
      printPokemons(allPokesZA);
  };
}, false);

let btn = document.getElementById("input-search-btn");
btn.addEventListener("click", function (event) {
  event.preventDefault();
  let inputName = document.getElementById("input-search").value;
  let found = allPokemons.find(el => el.name === inputName);
  if (found) {
    console.log(found);
    let sectionCards = document.getElementById("list");
    sectionCards.innerHTML = "";
    let newCard = document.createElement("article");
    newCard.setAttribute("class", "cardPokemon");
    newCard.innerHTML = "<img src=\"" + found.img + "\" ><br>";
    newCard.innerHTML +=  "<p>#" + found.num + "<br>" + found.name + "<br>" + found.type.map(el => el).join(", ") + "</p>";
    sectionCards.appendChild(newCard);
  };
}, false);

function printPokemons(allPokemons) {
  let sectionCards = document.getElementById("list");
  sectionCards.innerHTML = "";
  allPokemons.forEach((item) => {
      let num = item["num"];
      let name = item["name"];
      let img = item["img"];
      let type = item["type"];
      let allTypes = "";
      type.forEach((eachType) => {
        allTypes += " "+eachType;
      });
      let newCard = document.createElement("article");
      newCard.setAttribute("class", "cardPokemon");
      newCard.innerHTML = "<img src=\"" + img + "\" ><br>";
      newCard.innerHTML +=  "<p>#" + num + "<br>" + name + "<br>" +allTypes + "</p>";
      sectionCards.appendChild(newCard);
  });
};
