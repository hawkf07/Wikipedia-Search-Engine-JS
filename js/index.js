let searchInput = document.querySelector("#searchInput");
const timesIcon = document.querySelector(".fas.fa-times");
const searchIcon = document.querySelector(".fas.fa-search");
const form = document.querySelector("#form")
const wikiH1 = document.querySelector(".wiki-h1");
const wikiResult = document.querySelector(".wiki-result");
const wikiArticle = document.querySelector(".wiki-article");
let wikiForm = document.querySelector(".search-input");

const wikipediaSearch = async () => {
  let api = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srsearch=${searchInput.value}&srlimit=15`
  );
  let data = await api.json();
  console.log(data);
  timesIcon.addEventListener("click", (e) => {
    e.preventDefault();
  });
  data.query.search.forEach((result) => {
    url = `https://en.wikipedia.org/?curid=${result.pageid}`;
    wikiH1.textContent = `result for ${searchInput.value}, totalhits ${data.query.searchinfo.totalhits}...`;
    wikiArticle.insertAdjacentHTML(
      "afterend",
      `
         <a href='${url}' target='blank'> ${result.title} </a>
         <p class="snippet"> ${result.snippet} </p>
         `
    );
  });
};
timesIcon.addEventListener("click", (e) => (searchInput.value = ""));
searchIcon.addEventListener("click", wikipediaSearch);
form.onsubmit = (e) =>{
	e.preventDefault()	
	wikipediaSearch()
}
