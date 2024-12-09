/*
    Name: Nefeli Koumpouli  
    File: assignment4.js
    Date Created: 2024-10-17
    Date Updated: 2024-10-20
    Purpose: MIS 7375 Extra Credit...  Learning JavaScript.
    Version: 2.0
    */

// Check if user is recognized via cookie
const userCookie = document.cookie.split('; ').find(row => row.startsWith('user='));
const userName = userCookie ? userCookie.split('=')[1] : null;

// Function to prefill the form using local storage
function prefillForm() {
  if (userName) {
    // Check if there's data in local storage
    const formData = JSON.parse(localStorage.getItem('formData'));
    if (formData) {
      // Prefill form fields
      for (const [key, value] of Object.entries(formData)) {
        const inputElement = document.querySelector(`[name="${key}"]`);
        if (inputElement) {
          inputElement.value = value;
        }
      }
      // Prompt user to continue from previous data
      const continuePrompt = confirm('Do you want to continue where you left off?');
      if (continuePrompt) {
        // Prefill data from local storage if user agrees
        document.querySelector('#continueCheckbox').checked = true;
      }
    }
  }
}

// Call the function to prefill the form when the page loads
document.addEventListener('DOMContentLoaded', prefillForm);


// Listen for changes in form fields and save to local storage
document.querySelector('form').addEventListener('input', (event) => {
  const formData = {};
  const formElements = event.target.form.elements;
  for (const element of formElements) {
    if (element.name) {
      formData[element.name] = element.value;
    }
  }
  localStorage.setItem('formData', JSON.stringify(formData));
});

// Clear local storage if user opts to start fresh
document.querySelector('#newUserCheckbox').addEventListener('change', () => {
  if (document.querySelector('#newUserCheckbox').checked) {
    localStorage.removeItem('formData');
    inputs.forEach((field) => setCookie(field.cookieName, "", -1)); // Clear cookies
    location.reload();
  }
});


// Function to display the "Not Jake or New User?" checkbox if data exists in local storage
function showNewUserCheckbox() {
  const formData = JSON.parse(localStorage.getItem('formData'));
  if (formData && formData.fname) {
    const newUserLabel = document.getElementById('newUserLabel');
    const newUserText = document.getElementById('newUserText');

    // Update the text to use the first name from local storage
    newUserText.textContent = `Not ${formData.fname}? Check box to start fresh.`;

    // Show the label
    newUserLabel.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  showNewUserCheckbox();
});


// Validate form ///
document.getElementById("form").onsubmit = function (event) {
  if (!validateAll()) {
    event.preventDefault(); // Prevent form submission if validation fails
    showAlert(); // Show alert for validation issues
  } else {
    // Allow the form to submit and navigate to the "Thank You" page
    return true;
  }
};


/// Validate Birth Day ///
function validateBirthdate() {
  const dob = document.getElementById('dob');
  const birthdateMessage = document.getElementById('dob-error');
  const dobInput = new Date(dob.value);

  // Define the maximum age (120 years ago)
  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(currentDate.getFullYear() - 120);

  console.log("DOB Input:", dobInput);
  console.log("Max Date (120 years ago):", maxDate);

  // Check if the date is in the future
  if (dobInput > currentDate) {
    birthdateMessage.innerHTML = "Date cannot be in the future.";
    dob.value = "";
    return false;
  }
  // Check if the date is more than 120 years ago
  else if (dobInput < maxDate) {
    birthdateMessage.innerHTML = "Date cannot be more than 120 years ago.";
    dob.value = "";
    return false;
  }
  // Clear the error message if valid
  else {
    birthdateMessage.innerHTML = "";
    return true;
  }
}

// slider///
function updateValue(value) {
  document.getElementById('demo').innerText = value;
}

// Validate username
function validateUsername() {
  let username = document.getElementById("username").value.trim();
  const usernameMessage = document.getElementById("usernameMessage");

  // Check if the username is empty
  if (username.length === 0) {
    usernameMessage.innerHTML = "Username cannot be empty.";
    return false;
  }

  // Check if the username starts with a number
  if (!isNaN(username.charAt(0))) {
    usernameMessage.innerHTML = "Username cannot start with a number.";
    return false;
  }

  // Check if the username only contains letters, numbers, or underscores
  const regex = /^[a-zA-Z0-9_]+$/;

  if (!regex.test(username)) {
    usernameMessage.innerHTML = "Username can only contain letters, numbers, or underscores.";
    return false;
  }

  // Check if the username is at least 5 characters long
  if (username.length < 5) {
    usernameMessage.innerHTML = "Username must be at least 5 characters long.";
    return false;
  }

  // Clear error message if the username is valid
  usernameMessage.innerHTML = "";
  return true;
}

//today's date
const errorElement = document.getElementById('error');
document.getElementById("today").innerHTML = new Date().toLocaleDateString();

//Password 

function validatePasswords() {
  const passwordInput = document.getElementById('password');
  const repasswordInput = document.getElementById('repassword');
  const messageElement = document.getElementById('passwordMessage');

}

// Check if passwords match
function submitPasswords() {
  const passwordInput = document.getElementById('password');
  const repasswordInput = document.getElementById('repassword');
  const messageElement = document.getElementById('passwordMessage');

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;

  messageElement.textContent = '';

  if (passwordInput.value !== repasswordInput.value) {
    messageElement.textContent = 'Passwords do not match. Please try again.';
  } else if (!passwordRegex.test(passwordInput.value)) {
    messageElement.textContent = 'Passwords must be at least 8 characters and no more than 30 characters long and contain at least 1 upper case letter, 1 number, and 1 special character.';
  } else {
    alert('Password successfully submitted!');

    passwordInput.value = '';
    repasswordInput.value = '';
    messageElement.textContent = '';
  }
}

/// Password///

function validatePassword() {
  const password = document.getElementById("password").value;
  const user = document.getElementById("username").value;

  let errorFlag = 0;

  // Check for lowercase letters
  if (!password.match(/[a-z]/)) {
    document.getElementById("ms1").innerHTML = "Enter at least 1 lowercase letter.";
    errorFlag = 1;
  } else {
    document.getElementById("ms1").innerHTML = "";
  }

  // Check for capital letters
  if (!password.match(/[A-Z]/)) {
    document.getElementById("ms2").innerHTML = "Enter at least 1 capital letter.";
    errorFlag = 1;
  } else {
    document.getElementById("ms2").innerHTML = "";
  }

  // Check for numbers
  if (!password.match(/[0-9]/)) {
    document.getElementById("ms3").innerHTML = "Enter at least one number.";
    errorFlag = 1;
  } else {
    document.getElementById("ms3").innerHTML = "";
  }

  // Check for special characters
  if (!password.match(/[!@#%&*\-_\\.+()]/)) {
    document.getElementById("ms4").innerHTML = "Enter at least 1 special character.";
    errorFlag = 1;
  } else {
    document.getElementById("ms4").innerHTML = "";
  }

  // Check for length
  if (password.length < 8) {
    document.getElementById("ms5").innerHTML = "Enter a minimum of 8 characters.";
    errorFlag = 1;
  } else {
    document.getElementById("ms5").innerHTML = "";
  }

  // Check if password equals the user ID
  if (password === user || password.includes(user)) {
    document.getElementById("ms6").innerHTML = "Password cannot be equal to or contain the username.";
    errorFlag = 1;
  } else {
    document.getElementById("ms6").innerHTML = "";
  }

  // Display a valid message if there are no errors
  if (errorFlag === 0) {
    document.getElementById("ms3").innerHTML = "Valid Password.";
  }
}


// Confrim passwords

function confirmPassword() {
  const password = document.getElementById("password").value;
  const repassword = document.getElementById("repassword").value;

  if (repassword !== password) {
    document.getElementById("repasswordMessage").innerHTML = "Passwords do not match.";
    return false;
  } else {
    document.getElementById("repasswordMessage").innerHTML = "";
    return true;
  }
}

function reviewFunction() {
  // const username = document.getElementById('username').value;
  let username = "";
  // const dob = document.getElementById('dob').value;
  let dob = "";
  const password = document.getElementById('password').value;
  const repassword = document.getElementById('repassword').value;

  const formData = JSON.parse(localStorage.getItem('formData'));
  if (formData && formData.fname) {
    username = formData.fname;
    dob = formData.dob;
  }

  const reviewMessage = `
                  Username: ${username}
                  Date of Birth: ${dob}`;

  alert('Review your information: If no info then it needs info\n' + reviewMessage);
  validateForm();
}

// Remove User Input

function removeReview() {
  document.getElementById("showinput").innerHTML = "";
}

//First Name Validation ////

function validateFirstName() {
  let fname = document.getElementById('fname');
  let regex = /^[A-Za-z'-]+$/;

  // Check if name is empty
  if (fname.value === "") {
    document.getElementById("firstNameMessage").innerHTML = "First name must not be empty.";
    return false;
  }
  // Check if name is less than 2 characters
  else if (fname.value.length < 2) {
    document.getElementById("firstNameMessage").innerHTML = "First name must be at least 2 characters.";
    return false;
  }
  // Check if name matches the pattern
  else if (!regex.test(fname.value)) {
    document.getElementById("firstNameMessage").innerHTML = "First name can contain only letters, apostrophes, and dashes.";
    return false;
  }
  // Check if name does not exceed 30 characters
  else if (fname.value.length > 30) {
    document.getElementById("firstNameMessage").innerHTML = "First name must not exceed 30 characters.";
    return false;
  }
  // If all checks pass, clear error messages
  else {
    document.getElementById("firstNameMessage").innerHTML = "";
    return true;
  }
}

//lastname validation //////

function validateLastName() {
  let lname = document.getElementById('lname');
  let regex = /^[A-Za-z'-]+$/;

  // Check if lname is empty
  if (lname.value === "") {
    document.getElementById("lastNameMessage").innerHTML = "Last name must not be empty.";
    return false;
  }
  // Check if lname is less than 2 characters
  else if (lname.value.length < 2) {
    document.getElementById("lastNameMessage").innerHTML = "Last name must be at least 2 characters.";
    return false;
  }
  // Check if lname matches the pattern
  else if (!regex.test(lname.value)) {
    document.getElementById("lastNameMessage").innerHTML = "Last name can contain only letters, apostrophes, and dashes.";
    return false;
  }
  // Check if lname does not exceed 30 characters
  else if (lname.value.length > 30) {
    document.getElementById("lastNameMessage").innerHTML = "Last name must not exceed 30 characters.";
    return false;
  }
  // If all checks pass, clear error messages
  else {
    document.getElementById("lastNameMessage").innerHTML = "";
    return true;
  }
}

///email validation\\\

function validateEmail() {
  let email = document.getElementById('email');
  const regexemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  // Check if the email field is empty
  if (email.value === "") {
    document.getElementById("emailMessage").innerHTML =
      "Email Address must not be empty.";
    return false;
  }
  // Check if the email matches the regex pattern
  else if (!regexemail.test(email.value)) {
    document.getElementById("emailMessage").innerHTML =
      "Please enter a valid email address.";
    return false;
  }
  // Clear error message if validation passes
  else {
    document.getElementById("emailMessage").innerHTML = "";
    return true;
  }
}

// Validate phone ///

function validatePhone() {
  const phoneInput = document.getElementById('phone');

  // only digits
  const phone = phoneInput.value.replace(/\D/g, "");

  // if phone number has exactly 10 digits
  if (phone.length !== 10) {
    document.getElementById("phoneMessage").innerHTML = "Invalid Phone Number";
    return false;
  }

  // Format phone number as XXX-XXX-XXXX
  const formatPhone = phone.slice(0, 3) + "-" + phone.slice(3, 6) + "-" + phone.slice(6);
  phoneInput.value = formatPhone;
  document.getElementById("phoneMessage").innerHTML = "";
  return true;
}

// Validate SSN //
function validateSSN() {
  const SSN = document.getElementById("SSN").value.trim();

  // Format SSN as XXX-XX-XXXX
  const SSNregex = /^[0-9]{3}-[0-9]{2}-[0-9]{4}$/;

  // Check if SSN matches the pattern
  if (!SSNregex.test(SSN)) {
    document.getElementById("ssn-error").innerHTML = "Please enter a valid Social Security Number (XXX-XX-XXXX)";
    return false;
  } else {
    document.getElementById("ssn-error").innerHTML = "";
    return true;
  }
}

// validate Add1 ///
function validateAdd1() {
  const add1 = document.getElementById("Add1").value;
  const add1Error = document.getElementById("add1-error");

  if (add1.length < 2 || add1.length > 30) {
    add1Error.textContent = "Address must be between 2 and 30 characters.";
    return false;
  } else {
    add1Error.textContent = "";
    return true;
  }
}

// validate Add2 ///
function validateAdd2() {
  const add1 = document.getElementById("Add2").value;
  const add1Error = document.getElementById("add2-error");

  if (add1.length < 2 || add1.length > 30) {
    add1Error.textContent = "Address must be between 2 and 30 characters.";
    return false;
  } else {
    add1Error.textContent = "";
    return true;
  }
}


// Validate city ///
function validateCity() {
  const city = document.getElementById("city").value;
  const cityError = document.getElementById("city-error");

  if (city.length < 2 || city.length > 30) {
    cityError.textContent = "City must be at least 2 and less than 30 characters.";
    return false;
  } else {
    cityError.textContent = "";
    return true;
  }
}


// Validate zip code //
function validatezip() {
  const zip = document.getElementById("zip").value;
  const zipError = document.getElementById("zip-error");
  const zipPattern = /^\d{5}(-\d{4})?$/;

  if (!zipPattern.test(zip)) {
    zipError.textContent = "Invalid Zip Code. Enter a 5-digit code or use this format (12345-12345).";
    return false;
  } else {
    zipError.textContent = "";
    return true;
  }
}


function validateAddress() {
  const isAddressLine1Valid = validateAddressLine1();
  const isCityValid = validateCity();
  const isZipValid = validatezip();

  return isAddressLine1Valid && isCityValid && isZipValid;
}

// submit if all validations pass
document.getElementById("form").onsubmit = function () {
  return validateAddress();
};

// JavaScript alerts 

function showAlert() {
  var alertBox = document.getElementById("alert-box");
  var closeBt = document.getElementById("close-alert");
  alertBox.style.display = "block";
  closeBt.onclick = function () {
    alertBox.style.display = "none";
  }
}

function validateAll() {
  let valid = true;

  if (!validateBirthdate()) {
    valid = false;
  }

  if (!validateUsername()) {
    valid = false;
  }

  if (!validatePassword()) {
    valid = false;
  }

  if (!confirmPassword()) {
    valid = false;
  }

  if (!validateFirstName()) {
    valid = false;
  }

  if (!validateLastName()) {
    valid = false;
  }

  if (!validateEmail()) {
    valid = false;
  }

  if (!validatePhone()) {
    valid = false;
  }

  if (!validateSSN()) {
    valid = false;
  }

  if (!validateAdd1()) {
    valid = false;
  }

  if (!validateAdd2()) {
    valid = false;
  }

  if (!validateCity()) {
    valid = false;
  }

  if (!validatezip()) {
    valid = false;
  }

  if (valid) {
    document.getElementById("submit").disabled = false;
  } else {
    showAlert();
  }
}

// Header //
document.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (header) {
    if (window.scrollY > 0) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  } else {
    console.error("Header element not found in DOM");
  }
});

// Function to set a cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function getCookie(name) {
  var cookieName = name + "=";
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
}

// Handle user input fields and store them in cookies
const inputs = [
  { id: "fname", cookieName: "firstName" },
  { id: "mname", cookieName: "middleInitial" },
  { id: "lname", cookieName: "lastName" },
  { id: "dob", cookieName: "dob" },
  { id: "Add1", cookieName: "addressLine1" },
  { id: "Add2", cookieName: "addressLine2" },
  { id: "city", cookieName: "city" },
  { id: "zip", cookieName: "zip" },
  { id: "email", cookieName: "email" },
  { id: "phone", cookieName: "phoneNumber" },
  { id: "username", cookieName: "userId" },
];

inputs.forEach((field) => {
  const inputElement = document.getElementById(field.id);
  if (inputElement) {
    const cookieValue = getCookie(field.cookieName);
    if (cookieValue) {
      inputElement.value = cookieValue;
    }
    inputElement.addEventListener("input", () => {
      setCookie(field.cookieName, inputElement.value, 30);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const firstName = getCookie("firstName");
  console.log("First Name Cookie:", firstName); // Debugging
  if (firstName) {
    const welcome1 = document.getElementById("Welcome1");
    const welcome2 = document.getElementById("Welcome2");

    welcome1.innerHTML = `Welcome Back, ${firstName}!<br>`;
    welcome2.innerHTML = `
          <a href="#" id="new-user">Not ${firstName}? Click here to start a new form.</a>
      `;

    // Add the sticky class
    welcome1.classList.add("sticky-message");
    welcome2.classList.add("sticky-message");

    // Add event listener to clear cookies if "Not user" link is clicked
    document.getElementById("new-user").addEventListener("click", () => {
      inputs.forEach((field) => setCookie(field.cookieName, "", -1)); // Clear cookies
      localStorage.removeItem('formData');
      location.reload();
    });

    // Make the elements visible
    welcome1.style.display = "block";
    welcome1.style.visibility = "visible";
    welcome2.style.display = "block";
    welcome2.style.visibility = "visible";
  }
});

// Function to handle "Remember Me" checkbox
function handleRememberMe() {
  const rememberMeCheckbox = document.getElementById("rememberMe");

  if (rememberMeCheckbox.checked) {
    // Save cookies and/or local data if "Remember Me" is checked
    inputs.forEach((field) => {
      const inputElement = document.getElementById(field.id);
      if (inputElement) {
        setCookie(field.cookieName, inputElement.value, 30); // Save for 30 days
      }
    });
  } else {
    // Expire cookies and delete local data if "Remember Me" is unchecked
    inputs.forEach((field) => {
      setCookie(field.cookieName, "", -1); // Expire cookies immediately
    });
  }
}

// Function to handle "Remember Me" checkbox
function handleRememberMe() {
  const rememberMeCheckbox = document.getElementById("rememberMe");

  if (!rememberMeCheckbox.checked) {
    // Expire cookies immediately and clear form data
    inputs.forEach((field) => {
      setCookie(field.cookieName, "", -1); // Delete the cookie
      const inputElement = document.getElementById(field.id);
      if (inputElement) {
        inputElement.value = ""; // Clear form field
      }
    });
  }
}

// Function to save form data only if "Remember Me" is checked
function saveDataIfRemembered() {
  const rememberMeCheckbox = document.getElementById("rememberMe");

  if (rememberMeCheckbox.checked) {
    inputs.forEach((field) => {
      const inputElement = document.getElementById(field.id);
      if (inputElement) {
        setCookie(field.cookieName, inputElement.value, 30); // Save for 30 days
      }
    });
  }
}

// Initialize the "Remember Me" state and load cookies if checked
document.addEventListener("DOMContentLoaded", () => {
  const rememberMeCheckbox = document.getElementById("rememberMe");

  inputs.forEach((field) => {
    const inputElement = document.getElementById(field.id);
    if (inputElement) {
      const cookieValue = getCookie(field.cookieName);
      if (rememberMeCheckbox.checked && cookieValue) {
        inputElement.value = cookieValue; // Load saved data into form
      } else {
        setCookie(field.cookieName, "", -1); // Clear cookies if unchecked
      }
    }
  });
});




// Select the modal and buttons
const modal = document.getElementById('reviewModal');
const reviewButton = document.getElementById('reviewButton'); 
const closeModal = document.getElementById('closeModal');
const closeReview = document.getElementById('closeReview');
const submitReview = document.getElementById('submitReview');

// Function to open the modal
reviewButton.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Function to close the modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

closeReview.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Function to handle form submission in the modal (add your logic here)
// submitReview.addEventListener('click', () => {
//   alert('Form submitted!');
//   modal.style.display = 'none';
// });

// Close the modal if the user clicks outside of it
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});


// Function to open the modal and display form data
reviewButton.addEventListener('click', () => {
  modal.style.display = 'block';

  // Get form data from local storage
  const formData = JSON.parse(localStorage.getItem('formData'));

  if (formData) {
    // Create a string to display the form data, excluding password, SSN, and textarea
    let formDataHTML = `
      <p><strong>First Name:</strong> ${formData.fname}</p>
      <p><strong>Last Name:</strong> ${formData.lname}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Address Line 1:</strong> ${formData.add1}</p>
      <p><strong>Address Line 2:</strong> ${formData.add2}</p>
      <p><strong>City:</strong> ${formData.city}</p>
      <p><strong>State:</strong> ${formData.state}</p>
      <p><strong>Zip Code:</strong> ${formData.zip}</p>
      <p><strong>Date of Birth:</strong> ${formData.dob}</p>
      <p><strong>Gender:</strong> ${formData.gender}</p>
      <p><strong>Insurance:</strong> ${formData.ins}</p>
      <p><strong>Vaccination Status:</strong> ${formData.vac}</p>
      <p><strong>Symptoms:</strong> ${formData.symptoms}</p>
    `;

    // Display the form data in the modal
    document.getElementById('formDataContainer').innerHTML = formDataHTML;
  } else {
    document.getElementById('formDataContainer').innerHTML = '<p>No form data found.</p>';
  }
});

document.addEventListener("DOMContentLoaded",  () => {
  const stateSelect = document.getElementById("state");
  const formData = JSON.parse(localStorage.getItem('formData'));

  if (formData && formData.State) {
    console.log(formData.State)
    stateSelect.value = formData.State;
  }
});


function checkCapsLock(event, type) {
  const input = event.target;
  let capsLockMessage;
  console.log(type)
  if (type === 'password') {
    capsLockMessage = document.getElementById("msPassword");
    console.log("fum")
  } else if (type === 'passwordConfirm') {
    capsLockMessage = document.getElementById("ms3");
  }

  if (input.value !== "") {
    // Check if Caps Lock is on
    const isCapsLock = event.getModifierState && event.getModifierState("CapsLock");

    if (isCapsLock) {
      capsLockMessage.textContent = "Caps Lock is ON. This may cause errors in password input.";
      capsLockMessage.style.color = "orange";
    } else {
      capsLockMessage.textContent = "";
    }
  }
}




// Function to validate form fields and enable/disable the submit button
function validateForm() {
  const form = document.querySelector('form');
  const submitButton = document.querySelector('#submitReview');
  const reviewMessage = document.querySelector('#reviewMessage');
  let isValid = true;

  // Loop through each form input to check validation
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    if (!input.checkValidity()) {
      isValid = false;
    }
  });

  // Show or hide the review message based on form validity
  if (!isValid) {
    reviewMessage.hidden = false;
  } else {
    reviewMessage.hidden = true;
  }

  // Enable/disable the submit button based on the validation
  submitButton.disabled = !isValid;
  submitButton.classList.toggle("modal-btn", isValid);
}

function handleModalSubmit() {
  const form = document.querySelector('form');
  const isValid = form.checkValidity(); // Check if the form is valid
  
  if (isValid) {
    // Redirect to the thank you page
    window.location.href = "homework4-thankyou.html";
  } else {
    // If invalid, you can show an error message (optional)
    console.error("Form is not valid");
  }
}

document.getElementById("today").innerHTML = new Date().toLocaleDateString();

// // Add event listeners for real-time validation
// document.querySelectorAll('input, textarea').forEach(input => {
//   input.addEventListener('input', validateForm);
//   input.addEventListener('blur', validateForm);
// });
