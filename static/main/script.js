const logOutButton = document.getElementById("logOutButton");

// sign out
logOutButton.addEventListener("click", (e) => {
  console.log(5);
  document.cookie =
    "Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "/";
});




