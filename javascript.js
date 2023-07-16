const search = document.getElementById("search");
const pokemonTitle = document.getElementById("pokemonTitle");
const pokemonImageDiv = document.getElementById("pokemonImgDiv");
const pokemonImg = document.createElement("img");
const pokemonAbility = document.getElementById("ability");
const pokemonType = document.getElementById("type");
const pokemonWeight = document.getElementById("weight");
let pokemonArray = [];
async function callApi() {
  const pokemonName = document.querySelector("#pokemonName").value;
  let response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  response.json().then((data) => {
    if (data.name === undefined) {
      pokemonTitle.innerHTML = " ";
      return;
    } else {
      pokemonTitle.innerHTML = data.name;
      pokemonAbility.innerHTML = data.abilities[0].ability.name;
      pokemonImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
      pokemonImageDiv.appendChild(pokemonImg);
      pokemonType.innerHTML = data.types[0].type.name;
      pokemonWeight.innerHTML = data.weight;
      typeCheck();
    }
  });
}

search.addEventListener("click", () => {
  document.querySelector(".pokemon-display").style.display = "flex";
  callApi();
  document.getElementById("resultsAll").innerHTML = "";
  pokemonName.value = "";
});

async function getAllPokemons() {
  let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=811")
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((pokemon) => {
        pokemonArray.push(pokemon.name);
      });
    });
}

getAllPokemons();

function autocompleteMatch(input) {
  if (input == "") {
    return;
  }
  let reg = new RegExp(input);
  return pokemonArray.filter(function (term) {
    if (term.match(reg)) {
      return term;
    }
  });
}
function showResults(val) {
  res = document.getElementById("result");
  res.innerHTML = "";
  let list = "";
  let terms = autocompleteMatch(val);
  for (i = 0; i < terms.length; i++) {
    list += `<button class="result-btn" onclick=btnClick(this) value="${terms[i]}"><h4 >${terms[i]}</h4></button>`;
  }
  res.innerHTML = `<ul id="resultsAll">${list}</ul>`;
}
function btnClick(e) {
  const pokemonName = (document.querySelector("#pokemonName").value = e.value);
}

function typeCheck() {
  if (pokemonType.innerHTML == "fire") {
    pokemonTitle.style.color = "red";
    pokemonAbility.style.color = "red";
    pokemonWeight.style.color = "red";
    pokemonType.style.color = "red";
  } else if (pokemonType.innerHTML == "water") {
    pokemonTitle.style.color = "blue";
    pokemonAbility.style.color = "blue";
    pokemonWeight.style.color = "blue";
    pokemonType.style.color = "blue";
  } else if (pokemonType.innerHTML == "grass") {
    pokemonTitle.style.color = "green";
    pokemonAbility.style.color = "green";
    pokemonWeight.style.color = "green";
    pokemonType.style.color = "green";
  } else if (pokemonType.innerHTML == "electric") {
    pokemonTitle.style.color = "yellow";
    pokemonAbility.style.color = "yellow";
    pokemonWeight.style.color = "yellow";
    pokemonType.style.color = "yellow";
  } else if (pokemonType.innerHTML == "poison") {
    pokemonTitle.style.color = "violet";
    pokemonAbility.style.color = "violet";
    pokemonWeight.style.color = "violet";
    pokemonType.style.color = "violet";
  } else if (pokemonType.innerHTML == "rock") {
    pokemonTitle.style.color = "brown";
    pokemonAbility.style.color = "brown";
    pokemonWeight.style.color = "brown";
    pokemonType.style.color = "brown";
  } else if (pokemonType.innerHTML == "dark") {
    pokemonTitle.style.color = "lightgrey";
    pokemonAbility.style.color = "lightgrey";
    pokemonWeight.style.color = "lightgrey";
    pokemonType.style.color = "lightgrey";
  } else {
    pokemonTitle.style.color = "white";
    pokemonAbility.style.color = "white";
    pokemonWeight.style.color = "white";
    pokemonType.style.color = "white";
  }
}
