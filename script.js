const spriteDiv = document.querySelector('.top .sprite');
const dexNumSpan = document.querySelector('.top .info .dex-num');
const nameSpan = document.querySelector('.top .info .name');
const genusDiv = document.querySelector('.top .types');
const heightSpan = document.querySelector('.top .body-info #height');
const weightSpan = document.querySelector('.top .body-info #weight');

function fetchPokemon() {
  let pokemon = Math.ceil(Math.random() * 10);
  let link = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  fetch(link)
    .then((response) => response.json())
    .then(showPokemon);
}

function showPokemon(response) {
  // h2.classList.remove('hidden');
  // nameDiv.innerText = response['name'];
  // spriteDiv.innerHTML = `<img src=${response['sprites']['front_default']}>`;
  const spriteLink = response['sprites']['front_default'];
}

function fetchFlavorText() {
  let link = 'https://pokeapi.co/api/v2/pokemon-species/furret';
  fetch(link)
    .then((response) => response.json())
    .then((data) => {
      let text = data['flavor_text_entries'][0]['flavor_text'];
    });
}
