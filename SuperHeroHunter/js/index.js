/*Puclic key and private key has been used the create the Hash code */
const publicKey = "9ab871748d83ae2eb5527ffd69e034de";
const ts = 1;
const hash = "d35377547e551cd64a60657d2517bb7f";
const url = "https://gateway.marvel.com/v1/public/characters";

let allHeroes = [];
const allHeroesEle = document.getElementsByClassName("cards");
const search = document.getElementById("search");
let favouriteBtn;
let favouriteHeroId = JSON.parse(localStorage.getItem("favouriteHeroId"));


/* Gets all the Heroes from the API */
async function getAllHeroes() {
  let res = await fetch(`${url}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
  let data = await res.json();
  allHeroes = data.data.results;
  addToHomePage(allHeroes);
}
getAllHeroes();


/* Gets the Heroes based on the name search */
async function getHeroesByName(name) {
  let res = await fetch(
    `${url}?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${name}`
  );
  let data = await res.json();
  allHeroes = data.data.results;
  addToHomePage(allHeroes);
}

/*Display the Heroes into the home page based on the API results */
function addToHomePage(allHeroes) {
  const heroContainer = document.getElementsByClassName("cards");
  heroContainer[0].innerHTML = "";
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
    if (favouriteHeroId.includes(hero.id.toString())) {
      favouriteBtn.classList.add(
        "fa-solid",
        "fa-heart-circle-minus",
        "favouriteBtn"
      );
    } else {
      favouriteBtn.classList.add(
        "fa-solid",
        "fa-heart-circle-plus",
        "favouriteBtn"
      );
    }

    heroEle.append(heroTextEle);
    heroEle.append(favouriteBtn);
    allHeroesEle[0].append(heroEle);
  });
  favouriteBtn = document.querySelectorAll(".favouriteBtn");
  addingFavouriteHero(favouriteBtn);
}

/*Adding Hero to Favourite List*/
function addingFavouriteHero(favouriteBtn) {
  favouriteBtn.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      favouriteHeroId.push(event.target.id);
      if (event.target.classList.contains("fa-heart-circle-plus")) {
        favouriteHeroId = [...new Set(favouriteHeroId)];
        localStorage.setItem(
          "favouriteHeroId",
          JSON.stringify(favouriteHeroId)
        );
        event.target.classList.remove("fa-heart-circle-plus");
        event.target.classList.add("fa-heart-circle-minus");
      } else {
        let filteredFavouriteHeroId = favouriteHeroId.filter(function (item) {
          return item !== event.target.id;
        });
        localStorage.setItem(
          "favouriteHeroId",
          JSON.stringify(filteredFavouriteHeroId)
        );
        event.target.classList.remove("fa-heart-circle-minus");
        event.target.classList.add("fa-heart-circle-plus");
      }
    });
  });
}

/*Searching hero based on the key pressed*/
search.addEventListener("keypress", function (event) {
  let searchVal = search.value.trim();
  if (searchVal == 0) {
    getAllHeroes();
  } else {
    getHeroesByName(searchVal);
  }
});
