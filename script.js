const spriteDiv = document.querySelector('.top .sprite');
const dexNumSpan = document.querySelector('.top .info #dex-num');
const nameSpan = document.querySelector('.top .info .name');
const genusDiv = document.querySelector('.top .genus');
const heightSpan = document.querySelector('.top .body-info #height');
const weightSpan = document.querySelector('.top .body-info #weight');
const type1Img = document.querySelector('.type1');
const type2Img = document.querySelector('.type2');
const flavorTextDiv = document.querySelector('.top .description p');
const button = document.querySelector('.bottom button');
const content = document.querySelector('#content');

button.addEventListener('click', fetchPokemon);
let cache = {};

function fetchPokemon() {
  type1Img.src = '';
  type2Img.src = '';
  let pokemon = Math.ceil(Math.random() * 493); // 493
  console.log(`checking pokemon ${pokemon}`);

  if (!cache.hasOwnProperty(pokemon)) {
    let link = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        cache[pokemon] = {
          sprite:
            data['sprites']['versions']['generation-iv'][
              'heartgold-soulsilver'
            ]['front_default'],
          dexNum: data['id'],
          name: data['name'],
          height: data['height'],
          weight: data['weight'],
          types: data['types'],
        };
        console.log(`cached pokemon ${pokemon}`);
        showInfo(pokemon);
      });
  } else {
    console.log(`reading pokemon ${pokemon} from cache`);
    showInfo(pokemon);
  }
}

function showInfo(pokemon) {
  const spriteImg = cache[pokemon]['sprite'];
  const dexNum = cache[pokemon]['dexNum'];
  const name = cache[pokemon]['name'];
  const height = cache[pokemon]['height'];
  const weight = cache[pokemon]['weight'];
  const types = cache[pokemon]['types'];
  setTypes(types);
  spriteDiv.innerHTML = `<img src=${spriteImg} class="w-100" alt="${name} sprite">`;
  dexNumSpan.innerText = formatDexNum(dexNum);
  nameSpan.innerText = name.toUpperCase();
  heightSpan.innerText = formatHeight(height);
  weightSpan.innerText = formatWeight(weight);
  fetchFlavorText(dexNum);
  content.classList.remove('d-none');
  content.classList.add('fade-in');
}

function setTypes(types) {
  let type1 = types[0]['type']['name'];
  type1Img.src = `images/${type1}.png`;
  if (types.length === 2) {
    let type2 = types[1]['type']['name'];
    type2Img.src = `images/${type2}.png`;
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
