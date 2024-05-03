// index.js

// Callbacks
const handleClick = (ramen) => {
  // Add code
  ramen.addEventListener("click", event => {
    console.log(ramen.id);
    const ramenId = ramen.id;
    fetch(`http://localhost:3000/ramens/${ramenId}`)
    .then(response => response.json())
    .then(bigRamen => {
      console.log(bigRamen);
      document.querySelector("img.detail-image").src = bigRamen.image;
      document.querySelector("h2.name").textContent = bigRamen.name;
      document.querySelector("h3.restaurant").textContent = bigRamen.restaurant;
      document.querySelector("span#rating-display").textContent = bigRamen.rating;
      document.querySelector("p#comment-display").textContent = bigRamen.comment;
    });
  });
};

const addSubmitListener = () => {
  // Add code
  const form = document.getElementById('new-ramen');
  form.addEventListener("submit", event => {
    event.preventDefault()
    fetch("http://localhost:3000/ramens", {
      method: "POST",
      headers: {
        "Content-Type": "applications/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: event.target.name.value,
        restaurant: event.target.restaurant.value,
        image: event.target.image.value,
        rating: event.target.rating.value,
        comment: event.target["new-comment"].value
      })
    })
    .then(response => response.json())
    .then((addRamen) => {
      const ramenMenu = document.querySelector("div#ramen-menu");
      const newRamen = document.createElement("img");
      newRamen.src = addRamen.image;
      newRamen.id = addRamen.id;
      ramenMenu.append(newRamen);
      handleClick(newRamen);
    })
  });
}

const displayRamens = () => {
  // Add code
  fetch("http://localhost:3000/ramens")
  .then(response => response.json())
  .then((ramens) => {
    ramens.forEach((ramen) => {
      // console.log(ramen);
      // console.log(ramen.image);
      const ramenMenu = document.querySelector("#ramen-menu");
      const newRamen = document.createElement("img");
      newRamen.src = ramen.image;
      newRamen.id = ramen.id;
      ramenMenu.append(newRamen);
      handleClick(newRamen);
    })
  })
};

const main = () => {
  document.addEventListener("DOMContentLoaded", (event) => {
    displayRamens();
    addSubmitListener();
  })
  // Invoke displayRamens here
  // Invoke addSubmitListener here
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
