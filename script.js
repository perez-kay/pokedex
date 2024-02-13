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
  const height = response['height'];
  const weight = response['weight'];

  spriteDiv.innerHTML = `<img src=${spriteImg} alt="${name} sprite">`;
  dexNumSpan.innerText = formatDexNum(dexNum);
  nameSpan.innerText = name.toUpperCase();
  heightSpan.innerText = formatHeight(height);
  weightSpan.innerText = formatWeight(weight);
}

function formatDexNum(dexNum) {
  if (Number(dexNum) < 10) {
    return '00' + dexNum;
  } else if (Number(dexNum) < 100) {
    return '0' + dexNum;
  } else {
    return dexNum;
  }
}

function formatHeight(height) {
  let totalInches = height * 3.937;
  let feet = Math.floor(totalInches / 12);
  let inches = Math.floor(totalInches % 12);
  return `${feet}' ${inches}"`;
}

function formatWeight(weight) {
  let pounds = weight / 4.536;
  let rounded = Math.round(pounds * 10) / 10;
  return `${rounded} lbs.`;
}

// function fetchFlavorText() {
//   let link = 'https://pokeapi.co/api/v2/pokemon-species/furret';
//   fetch(link)
//     .then((response) => response.json())
//     .then((data) => {
//       let text = data['flavor_text_entries'][0]['flavor_text'];
//     });
// }
