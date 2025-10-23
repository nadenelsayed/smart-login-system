const registerSection = document.getElementById("registerSection");
const loginSection = document.getElementById("loginSection");
const homeSection = document.getElementById("homeSection");
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const goToLogin = document.getElementById("goToLogin");
const goToRegister = document.getElementById("goToRegister");
const welcomeMessage = document.getElementById("welcomeMessage");
const logoutBtn = document.getElementById("logoutBtn");

goToLogin.addEventListener("click", () => {
  registerSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
});

goToRegister.addEventListener("click", () => {
  loginSection.classList.add("hidden");
  registerSection.classList.remove("hidden");
});

let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser) {
  showHome();
}

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("regMessage");
  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (!name || !email || !password) {
    msg.style.color = "red";
    msg.textContent = "Please fill all fields.";
    return;
  }
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    msg.style.color = "red";
    msg.textContent = "Invalid email format.";
    return;
  }
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    msg.style.color = "red";
    msg.textContent = "This email already exists.";
    return;
  }
  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  msg.style.color = "green";
  msg.textContent = "Registration successful! Redirecting...";
  setTimeout(() => {
    msg.textContent = "";
    registerSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
  }, 1500);
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const msg = document.getElementById("loginMessage");
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.email === email);
  if (!user) {
    msg.style.color = "red";
    msg.textContent = "Email not registered.";
    return;
  }
  if (user.password !== password) {
    msg.style.color = "red";
    msg.textContent = "Incorrect password.";
    return;
  }
  localStorage.setItem("currentUser", JSON.stringify(user));
  showHome();
});

function showHome() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) {
    registerSection.classList.add("hidden");
    loginSection.classList.add("hidden");
    homeSection.classList.remove("hidden");
    welcomeMessage.textContent = `Welcome, ${user.name}!`;
  }
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  homeSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
});
