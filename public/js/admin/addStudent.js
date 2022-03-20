// GETTING VALUES
let fullname = document.querySelector("#fullname");
let number = document.querySelector("#number");
let email = document.querySelector("#email");
let password = document.querySelector("#password");

// ADD VALIDATION
let fullnameValidation = document.getElementById("fullname-validation");
let numberValidation = document.getElementById("number-validation");
let emailValidation = document.getElementById("email-validation");
let passwordValidation = document.getElementById("password-validation");

// REGISTER BUTTON
let registerBtn = document.querySelector("button");

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let registerInfo;

  // AFTER VALIDATION COMPLETES

  registerInfo = {
    fullname: fullname.value,
    number: number.value,
    email: email.value,
    password: password.value,
  };

  // SENDING DATA TO SERVER
  fetch("/registerStudent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerInfo),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message == "All Fields Are Required") {
        alert(data.message);
      } else if (data.message == "Email Exist") {
        alert(data.message);
      } else {
        alert(data.message);

        fullname.value = "";
        number.value = "";
        email.value = "";
        password.value = "";
      }
    });
});
