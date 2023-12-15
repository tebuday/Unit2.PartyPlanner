const app = document.getElementById("app");
const submit = document.getElementById("submit");

const deleteParty = async (e) => {
  const user_id = e.target.id;
  try {
    const response = await fetch(
      `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2311-fsa-et-web-ft-sf/events/${user_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response;
    console.log("Success:", result);
    render();
  } catch (error) {
    console.error("Error:", error);
  }
};

// GET all
const render = async () => {
  console.log("message");
  try {
    const response = await fetch(
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2311-fsa-et-web-ft-sf/events",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    console.log(result);
    //have to reference the "data" key within the object for the data to pull
    result.data.forEach((element) => {
      const div = document.createElement("div");
      div.style.margin = "5%";

      const pName = document.createElement("p");
      pName.innerHTML = `Party Name: ${element.name}`;
      div.appendChild(pName);

      const pDateTime = document.createElement("p");
      pDateTime.innerHTML = `Date and Time: ${element.date}`;
      div.appendChild(pDateTime);

      const pDescrip = document.createElement("p");
      pDescrip.innerHTML = `Description: ${element.description}`;
      div.appendChild(pDescrip);

      const pLocation = document.createElement("p");
      pLocation.innerHTML = `Location: ${element.location}`;
      div.appendChild(pLocation);

      const button = document.createElement("button");
      button.innerHTML = "Delete";
      button.id = element._id;
      button.addEventListener("click", deleteParty);
      div.appendChild(button);

      app.appendChild(div);
    });
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
};

render();

const addParty = async (e) => {
  e.preventDefault();
  const party = document.getElementById("party").value;
  const datetime = document.getElementById("datetime").value;
  const description = document.getElementById("description").value;
  const location = document.getElementById("location").value;

  const obj = {
    party,
    datetime,
    description,
    location,
  };

  try {
    const response = await fetch(
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2311-fsa-et-web-ft-sf/events",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }
    );

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
};

submit.addEventListener("click", addParty);
