/*Puclic key and private key has been used the create the Hash code */
const publicKey = "9ab871748d83ae2eb5527ffd69e034de";
const ts = 1;
const hash = "d35377547e551cd64a60657d2517bb7f";
const url = "https://gateway.marvel.com/v1/public/characters";
const allHeroesEle = document.getElementsByClassName("cards");
let favouriteHeroId = JSON.parse(localStorage.getItem("favouriteHeroId"));
const heroContainer = document.getElementsByClassName("cards");
let deleteBtn;

/*Gets the Heroes based on the ID from API */
async function getHeroesByID(id) {
  let res = await fetch(
    `${url}/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
  );
  let data = await res.json();
  let heroData = data.data.results;
  addToFavouritePage(heroData);
}

favouriteHeroId.forEach((heroid) => {
  getHeroesByID(heroid);
});

/*Adding Heroes to the Favourites Page based on the API results*/
function addToFavouritePage(allHeroes) {
  favouriteHeroId = JSON.parse(localStorage.getItem("favouriteHeroId"));
  allHeroes.forEach((hero) => {
    const heroEle = document.createElement("div");
    heroEle.classList.add("card");
    heroEle.style.backgroundImage = `url(${hero.thumbnail.path}.${hero.thumbnail.extension})`;
    const heroTextEle = document.createElement("a");
    heroTextEle.classList.add("card-text");
    heroTextEle.textContent = hero.name;
    heroTextEle.href = `details.html?id=${hero.id}`;
    favouriteBtn = document.createElement("i");
    favouriteBtn.id = hero.id;
    favouriteBtn.classList.add(
      "fa-solid",
      "fa-heart-circle-minus",
      "favouriteBtn",
      "deleteBtn"
    );
    heroEle.append(heroTextEle);
    heroEle.append(favouriteBtn);
    allHeroesEle[0].append(heroEle);
  });
  deleteBtn = document.querySelectorAll(".deleteBtn");

  /*Removing the hero from the Favourite List*/
  deleteBtn.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      let id = event.target.id;
      let filteredFavouriteHeroId = favouriteHeroId.filter(function (item) {
        return item !== id;
      });
      localStorage.setItem(
        "favouriteHeroId",
        JSON.stringify(filteredFavouriteHeroId)
      );
      location.reload();
    });
  });
  favouriteHeroId = JSON.parse(localStorage.getItem("favouriteHeroId"));
}
