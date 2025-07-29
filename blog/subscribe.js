document
  .getElementById("subscribe-button")
  .addEventListener("click", subscribe);

function subscribe() {
  var email = document.getElementById("email").value;
  var button = document.getElementById("subscribe-button");

  if (email.trim() === "") {
    alert("Please enter an email");
    return;
  }

  console.log(`New subscription ${email}`);

  // Fill the hidden form input and submit it
  document.getElementById("hidden-entry").value = email;
  document.getElementById("hidden-form").submit();

  button.textContent = "Iscritt!";
  button.disabled = true;
}
