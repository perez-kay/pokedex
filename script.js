const spriteDiv = document.querySelector('.top .sprite');
const dexNumSpan = document.querySelector('.top .info #dex-num');
const nameSpan = document.querySelector('.top .info .name');
const genusDiv = document.querySelector('.top .genus');
const heightSpan = document.querySelector('.top .body-info #height');
const weightSpan = document.querySelector('.top .body-info #weight');
const typeDiv = document.querySelector('.top .types');
const flavorTextDiv = document.querySelector('.top .description p');
const button = document.querySelector('.bottom button');

button.addEventListener('click', fetchPokemon);

function fetchPokemon() {
  let pokemon = Math.ceil(Math.random() * 493);
  let link = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  fetch(link)
    .then((response) => response.json())
    .then(showInfo);
}

function showInfo(response) {
  const spriteImg =
    response['sprites']['versions']['generation-iv']['heartgold-soulsilver'][
      'front_default'
    ];
  const dexNum = response['id'];
  const name = response['name'];
  const height = response['height'];
  const weight = response['weight'];
  const types = response['types'];
  setTypes(types);
  spriteDiv.innerHTML = `<img src=${spriteImg} alt="${name} sprite">`;
  dexNumSpan.innerText = formatDexNum(dexNum);
  nameSpan.innerText = name.toUpperCase();
  heightSpan.innerText = formatHeight(height);
  weightSpan.innerText = formatWeight(weight);
  fetchFlavorText(dexNum);
}

function setTypes(types) {
  let type1 = types[0]['type']['name'];
  typeDiv.innerHTML = `<img src="images/${type1}.png" alt="${type1} icon">`;
  if (types.length === 2) {
    let type2 = types[1]['type']['name'];
    typeDiv.innerHTML += `<img src="images/${type2}.png" alt="${type2} icon">`;
  }
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

function fetchFlavorText(dexNum) {
  let link = `https://pokeapi.co/api/v2/pokemon-species/${dexNum}`;
  fetch(link)
    .then((response) => response.json())
    .then(showFlavorText);
}

function showFlavorText(response) {
  let text = '';
  for (const entry of response['flavor_text_entries']) {
    if (entry['version']['name'] === 'heartgold') {
      text = entry['flavor_text'].replace(/(\f|\n)/gm, ' ');
      break;
    }
  }
  let genus = '';
  for (const entry of response['genera']) {
    if (entry['language']['name'] === 'en') {
      genus = entry['genus'];
      break;
    }
  }
  flavorTextDiv.innerText = text;
  genusDiv.innerText = genus;
}
