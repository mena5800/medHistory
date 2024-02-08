const convertButton = document.getElementById("convert-button");
const signUp = document.getElementById("signUp");
const singIn = document.getElementById("signIn");

convertButton.addEventListener("click", (e) => {
  if (signIn.style.display === "none") {
    singIn.style.display = "flex";
    signUp.style.display = "none";
  } else {
    singIn.style.display = "none";
    signUp.style.display = "flex";
  }
});

// Get a reference to the form element
const singInForm = document.getElementById("signInForm");
const singUpForm = document.getElementById("signUpForm");

// Add a submit event listener to the form
singUpForm.addEventListener("submit", function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values from the form fields
  const name = document.getElementById("name-sign-up").value;
  const email = document.getElementById("email-sign-up").value;
  const password = document.getElementById("password-sign-up").value;
  const passwordConfirm = document.getElementById(
    "confirm_password-sign-up"
  ).value;

  if (password != passwordConfirm) {
    alert("password not match");
  } else {
    const body = { fullName: name, password: password, email: email };
    submitFormPost("/auth/regigster", body, signUpHandler);
  }
});

singInForm.addEventListener("submit", function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values from the form fields
  const email = document.getElementById("email-sign-in").value;
  const password = document.getElementById("password-sign-in").value;

  const body = { password: password, email: email };
  submitFormPost("/auth/sign_in", body, signInHandler);
});

const signInHandler = (data) => {
  setCookie("Authorization", data["token"], 7);
};


const signUpHandler = (data) => {
  setCookie("Authorization", data["token"], 7);
};
const submitFormPost = (uri, body, handler) => {
  // Create a new POST request
  fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Specify the content type as JSON
      // Add any other headers as needed
    },
    body: JSON.stringify(
      // Convert data to JSON format
      body
    ),
  })
    .then((response) => {
      // Handle response

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse the JSON response
    })
    .then((data) => {
      // Handle data returned by the server
      handler(data);
      console.log("Response from server:", data);
      window.location.href = '/tasks';

    })
    .catch((error) => {
      // Handle errors
      console.error("Error during fetch operation:", error);
    });
};

// Function to set a cookie
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

