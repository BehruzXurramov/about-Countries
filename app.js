let cardWrapper = document.getElementById("card-wrapper");
let count = document.getElementById("count");
let input = document.getElementById("input");
let btn = document.getElementById("btn");

async function getData() {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    let { data } = response;
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

let data = await getData();
let dataForSearch = data;
let lnght = data.length;

async function searchData() {
  let country = input.value;
  data = dataForSearch.filter((val) => {
    return val.name.common.toLowerCase().includes(country.toLowerCase());
  });

  showData();
}

btn.addEventListener("click", () => {
    searchData()
});

input.addEventListener("change", () => {
    searchData()
})

async function showData() {
  let items = "";
  data.forEach((val) => {
    items += `<div class="card" style="width: 18rem">
        <img src="${val.flags.png}" class="card-img-top card" alt="Country img""/>
        <div class="card-body">
          <h5 class="card-title">${val.name.common}</h5>
          <p class="card-text">
            Capital: ${val.capital}
          </p>
          <p class="card-text">
            Area: ${val.area} km<sup>2</sup>
          </p>
          <p class="card-text">
            Population: ${val.population}
          </p>
          <a href="https://restcountries.com/v3.1/name/${val.name.common}" class="btn btn-primary">Batafsil</a>
        </div>
      </div>`;
  });

  let countCountry = `<label style="padding: 10px 0 0 120px;">Soni: ${data.length}</label>`;
  cardWrapper.innerHTML = items;
  count.innerHTML = countCountry;
}

showData();
