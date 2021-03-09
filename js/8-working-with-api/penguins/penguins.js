"use strict"

const contextPath = "http://localhost:8080";
const output = document.getElementById("output");

function getPenguins() {
  axios.get(contextPath + "/getPenguins")
    .then(res => {
      output.innerHTML = "";

      const penguins = res.data;

      penguins.forEach(penguin => {
        const newPenguin = renderPenguin(penguin);
        // console.log("New penguin: ", newPenguin);
        output.appendChild(newPenguin);
      });
    }).catch(err => console.error(err))
}

{/* <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div> */}

function renderPenguin(penguin) {

  const newColumn = document.createElement("div");
  newColumn.className = "col";

  const newPenguin = document.createElement("div");
  newPenguin.className = "card";
  newColumn.appendChild(newPenguin);

  const penguinBody = document.createElement("div");
  penguinBody.className = "card-body";
  newPenguin.appendChild(penguinBody);

  const penguinName = document.createElement("h5");
  penguinName.className = "card-title";
  penguinName.innerText = penguin.name;
  penguinBody.appendChild(penguinName);

  const penguinText = document.createElement("p");
  penguinText.className = "card-text";
  penguinText.innerHTML = "Age: " + penguin.age;
  penguinText.innerHTML += "<br>";
  penguinText.innerHTML += "Tuxedo Size: " + penguin.tuxedoSize;
  penguinBody.appendChild(penguinText);

  const penguinFooter = document.createElement("div");
  penguinFooter.className = "card-footer"
  newPenguin.appendChild(penguinFooter);

  const deletePenguinButton = document.createElement("a");
  deletePenguinButton.className = "card-link";
  deletePenguinButton.innerText = "Delete";
  deletePenguinButton.addEventListener('click', () => deletePenguin(penguin.id));
  penguinFooter.appendChild(deletePenguinButton);

  return newColumn;
}

function deletePenguin(id) {
  axios.delete(contextPath + "/removePenguin/" + id)
    .then(() => getPenguins())
    .catch(err => console.error(err));
}

document.getElementById("penguinForm").addEventListener('submit', function (event) {
  event.preventDefault();

  console.log("this: ", this);
  console.log("this.name:", this.name);
  console.log("this.age:", this.age);
  console.log("this.tuxedoSize:", this.tuxedoSize);

  const data = {
    name: this.name.value,
    age: this.age.value,
    tuxedoSize: this.tuxedoSize.value
  };

  axios.post(contextPath + "/createPenguin", data, {
    headers: {
      "Content-Type": "application/json", // sending JSON
      "Accept": "application/json" // gimme JSON
    }
  }).then(() => {
    this.reset();
    this.name.focus();
    getPenguins();
  })
    .catch(err => console.error(err));

});

getPenguins();