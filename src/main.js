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


const data = POKEMON.pokemon;
const meuFiltro = document.getElementById('search');
const mostraPokemonDiv = document.getElementById('search-button');

meuFiltro.addEventListener("change", () => selecionados(app.filterData(data, meuFiltro.value)));

window.onload = () => {
    carregaMenuTipos(data);
};

function carregaMenuTipos(data) {
    const poketypes = [];
    data.map(poke => poke.type.map(type => {
        if (!poketypes.includes(type)){
            poketypes.push(type);
        } else {
        return false;
        }
        
    }))

meuFiltro.innerHTML = "";
meuFiltro.innerHTML = `<option value="none"> Selecione Filtro </option>`;
meuFiltro.innerHTML += poketypes.map(type => `<option value= "${type}"> ${type}</option>`).join("");

}



function selecionados(obj){
    mostraPokemonDiv.innerHTML = "";
    obj.forEach(poke => {
        mostraPokemonDiv.innerHTML += `
        <div class= "card">
        <h4>${poke.name}</h4>
        <img src="${poke.img}" />
        <p>Tipo: ${poke.type.map(type => `${type}`).join(", ")}</p>
        </div>`
    });
}
