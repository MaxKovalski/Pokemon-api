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
  if (response.status == 200) {
    return response.json().then((data) => {
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
      }
    });
  } else {
    console.error("***Call Api Error***");
  }
}

search.addEventListener("click", () => {
  callApi();
  document.getElementById("resultsAll").innerHTML = "";
});

let counter = "";
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
let a = true;
function showResults(val) {
  res = document.getElementById("result");
  a = false;
  console.log(a);
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
