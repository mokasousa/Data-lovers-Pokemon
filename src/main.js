document.addEventListener("DOMContentLoaded", () => {
    let pokemonValues = Object.values(POKEMON);
    let allPokemons = pokemonValues[0];
    allPokemons.forEach((item) => {
        let num = item["num"];
        let name = item["name"];
        let img = item["img"];
        let type = item["type"];
        type = type[0] + " " + type[1];
        let sectionCards = document.getElementById("list");
        let newCard = document.createElement("article");
        newCard.setAttribute("class", "cardPokemon");
        newCard.innerHTML = "<img src=\"" + img + "\" ><br>";
        newCard.innerHTML +=  "<p>#" + num + "<br>" + name + "<br>" +type + "</p>";
        sectionCards.appendChild(newCard);
    });


});