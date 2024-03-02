/*Puclic key and private key has been used the create the Hash code */
const publicKey = "9ab871748d83ae2eb5527ffd69e034de";
const ts = 1;
const hash = "d35377547e551cd64a60657d2517bb7f";
const url = "https://gateway.marvel.com/v1/public/characters";
const allHeroesEle = document.getElementsByClassName("cards");
const currentURL = new URL(window.location.href);
const heroId = currentURL.searchParams.get("id");

/*Gets the Heroes based on the ID from API */
async function getHeroesById(heroId) {
  let res = await fetch(
    `${url}/${heroId}?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${name}`
  );
  let data = await res.json();
  allHeroes = data.data.results;
  addDisplayPage(allHeroes);
}
getHeroesById(heroId);

/*Adding the Hero to the Display Page*/
function addDisplayPage(allHeroes) {
  const heroContainer = document.getElementsByClassName("cards");
  heroContainer[0].innerHTML = "";
  allHeroes.forEach((hero) => {
    const heroEle = document.createElement("div");

    heroEle.innerHTML = `<div class="detail mb-3">
            <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" class="card-img-top" alt="...">
            <div class="card-body">
                <h1 class="card-title">${hero.name}</h1>
            </div>
        </div>
        <div class="info">
            <div>Comic: ${hero.comics.available}</div>
            <div>Event: ${hero.events.available}</div>
            <div>Series: ${hero.series.available}</div>
            <div>Stories: ${hero.stories.available}</div>
        </div>
        <p class="descrption">${hero.description}</p>`;
    allHeroesEle[0].append(heroEle);
  });
}
