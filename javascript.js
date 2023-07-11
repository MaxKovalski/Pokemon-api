const search = document.getElementById("search");
const pokemonTitle = document.getElementById("pokemonTitle");
let pokemonArray = [];
async function callApi() {
  //   let pokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.name..id}.png`;
  const pokemonName = document.querySelector("#pokemonName").value;
  let response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  if (response.status == 200) {
    return response.json().then((data) => {
      pokemonTitle.innerHTML = data.name;
    });
  } else {
    console.error("***Call Api Error***");
  }
}

search.addEventListener("click", () => {
  callApi();
  console.log("test");
  document.getElementById("test4").innerHTML = "";
});

let counter = "";
async function getAllPokemons() {
  let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=811")
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((pokemon) => {
        pokemonArray.push(pokemon.name);
        // console.log(pokemonArray);
      });
    });
}
getAllPokemons();

function autocompleteMatch(input) {
  if (input == "") {
    return [];
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
    list += `<button class="test" onclick=btnClick(this) value="${terms[i]}"><h4 class="test1">${terms[i]}</h4></button>`;
  }
  res.innerHTML = `<ul id="test4">${list}</ul>`;
}
function btnClick(e) {
  const pokemonName = (document.querySelector("#pokemonName").value = e.value);
}
