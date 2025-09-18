const students = [
  { name: "Favour", age: 20, gender: "female", student: true },
  { name: "Joshua", age: 23, gender: "male", student: true },
  { name: "Olisa", age: 21, gender: "male", student: true },
  { name: "Sam", age: 21, gender: "male", student: true },
  { name: "Marvellous", age: 21, gender: "female", student: true },
  { name: "Kindness", age: 25, gender: "male", student: true },
  { name: "Mmesoma", age: 18, gender: "female", student: true },
];

const signupForm = document.getElementById("signupForm");
const signupContainer = document.getElementById("signupContainer");
const dashboard = document.getElementById("dashboard");
const userWelcome = document.getElementById("userWelcome");
const logoutBtn = document.getElementById("logoutBtn");
const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

//Validate form
function validateInput(username, email, password, confirmPassword) {
  let isValid = true;

  usernameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";

  if (!username) {
    usernameError.textContent = "Username is required.";
    isValid = false;
  } else if (
    students.some(function (s) {
      return s.name.toLowerCase() === username.toLowerCase();
    })
  ) {
    usernameError.textContent = "Username already exists, choose another.";
    isValid = false;
  }

  if (!email) {
    emailError.textContent = "Email is required.";
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    emailError.textContent = "Enter a valid email.";
    isValid = false;
  }

  if (!password) {
    passwordError.textContent = "Password is required.";
    isValid = false;
  } else if (password.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters.";
    isValid = false;
  }

  if (!confirmPassword) {
    confirmPasswordError.textContent = "Please confirm your password.";
    isValid = false;
  } else if (password !== confirmPassword) {
    confirmPasswordError.textContent = "Passwords do not match.";
    isValid = false;
  }

  return isValid;
}

// post to dummy json
async function handleSignup(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document
    .getElementById("confirmPassword")
    .value.trim();

  if (!validateInput(username, email, password, confirmPassword)) {
    return;
  }

  const url = "https://dummyjson.com/users/add";
  const data = { username, email, password };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error code: ${response.status}`);
    }

    const result = await response.json();

    if (response.status === 200 || response.status === 201) {
     
      showDashboard(result.username);

      signupForm.reset();
    }

    if (data.username === "" || data.email === "" || data.password === "") {
      alert("Please fill in all fields.");
    }
  } catch (error) {
    console.log("Oops, you have an error:", error);
    alert("Something went wrong. Please try again.");
  }
}

//Show dashboard
function showDashboard(username) {
  signupContainer.style.display = "none";
  dashboard.style.display = "flex";
  userWelcome.textContent = username;
}

//Logout
function handleLogout() {
  dashboard.style.display = "none";
  signupContainer.style.display = "block";
  signupForm.reset();
}

signupForm.addEventListener("submit", handleSignup);
logoutBtn.addEventListener("click", handleLogout);
