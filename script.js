const spriteDiv = document.querySelector('.top .sprite');
const dexNumSpan = document.querySelector('.top .info #dex-num');
const nameSpan = document.querySelector('.top .info .name');
const genusDiv = document.querySelector('.top .types');
const heightSpan = document.querySelector('.top .body-info #height');
const weightSpan = document.querySelector('.top .body-info #weight');
const button = document.querySelector('.bottom button');

button.addEventListener('click', fetchPokemon);

function fetchPokemon() {
  let pokemon = Math.ceil(Math.random() * 151);
  let link = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  fetch(link)
    .then((response) => response.json())
    .then(showPokemon);
}

function showPokemon(response) {
  const spriteImg =
    response['sprites']['versions']['generation-iv']['heartgold-soulsilver'][
      'front_default'
    ];
  const dexNum = response['id'];
  const name = response['name'];

  spriteDiv.innerHTML = `<img src=${spriteImg} alt="${name} sprite">`;
  if (Number(dexNum) < 10) {
    dexNumSpan.innerText = '00' + dexNum;
  } else if (Number(dexNum) < 100) {
    dexNumSpan.innerText = '0' + dexNum;
  } else {
    dexNumSpan.innerText = dexNum;
  }
  nameSpan.innerText = name.toUpperCase();
}

// function fetchFlavorText() {
//   let link = 'https://pokeapi.co/api/v2/pokemon-species/furret';
//   fetch(link)
//     .then((response) => response.json())
//     .then((data) => {
//       let text = data['flavor_text_entries'][0]['flavor_text'];
//     });
// }
