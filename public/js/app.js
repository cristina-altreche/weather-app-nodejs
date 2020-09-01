const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// use form create event on submit
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //use input and store the value entered
  const location = searchElement.value;
  //   console.log(location);
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        // console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        // console.log(data.location);
        messageOne.textContent = data.location;
        // console.log(data.forecast);
        messageTwo.textContent = data.forecast;
      }
      // How I solved it:
      // if (!data.address) {
      //   console.log("Please enter address");
      // } else if (data) console.log(data.location, data.forecast);
    });
  });
});
