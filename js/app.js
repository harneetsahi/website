
const navbar = document.querySelector(".navbar");
const menu = document.querySelector(".nav-toggle-js");

const sidebar = document.querySelector(".sidebar-js");
const sidebarLinks = document.querySelectorAll(".sidebar-links-js");

const overlay = document.querySelector(".overlay");

////////// Form and EmailJs
const form = document.querySelector(".form__container");
const userNameInput = document.getElementById("userName");
const emailInput = document.getElementById("email");
const mesageInput = document.getElementById("message");
const submitBtn = document.querySelector(".submit-btn-js");



////////// Theme load

const lightThemeIcon = document.querySelector(".light-theme");

const darkThemeIcon = document.querySelector(".dark-theme");

function calcSettingTheme({ localStorageTheme, systemSettingDark }) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }

  return "light";
}

function updateButton({ buttonEl, isDark }) {
  const newThemeLabel = isDark ? "Light theme" : "Dark theme";

  buttonEl.setAttribute("aria-label", newThemeLabel);

  if (newThemeLabel == "Dark theme") {
    buttonEl.style.backgroundImage = "url('./styles/webcons/theme-dark.svg')";
    buttonEl.style.border = "1px solid rgb(49, 49, 2)";
  } else {
    buttonEl.style.backgroundImage = "url('./styles/webcons/theme-light.svg')";
    buttonEl.style.border = "none";
  }
}

function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}

const themeBtn = document.querySelector("[data-theme-toggle");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark");

let currentThemeSetting = calcSettingTheme({
  localStorageTheme,
  systemSettingDark,
});

updateButton({ buttonEl: themeBtn, isDark: currentThemeSetting === "dark" });
updateThemeOnHtmlEl({ theme: currentThemeSetting });

themeBtn.addEventListener("click", (e) => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  updateButton({ buttonEl: themeBtn, isDark: newTheme === "dark" });
  updateThemeOnHtmlEl({ theme: newTheme });

  currentThemeSetting = newTheme;
});

////////// Event listeners

let offset = navbar.offsetTop;
let lastScrollTop;

window.addEventListener("scroll", () => {
  let scrollTop = window.scrollY || window.pageYOffset;

  if (
    scrollTop > lastScrollTop &&
    scrollTop > offset &&
    !sidebar.classList.contains("show-sidebar")
  ) {
    navbar.style.top = "-100px";
    navbar.style.transition = "top 0.3s ease-in-out";
  } else {
    navbar.style.top = "0";
  }
  lastScrollTop = scrollTop;
});

menu.addEventListener("click", () => {
  toggleSidebar();
});

sidebarLinks.forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("show-sidebar");
    menu.classList.remove("open");
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMail();
});

////////// Functions

function toggleSidebar() {
  sidebar.classList.toggle("show-sidebar");
  menu.classList.toggle("open");
}

////////// Contact page

function sendMail() {
  console.log("working");

  const inputData = {
    userName: userNameInput.value,
    email: emailInput.value,
    message: mesageInput.value,
  };

  emailjs
    .send(serviceID, templateID, inputData)
    .then(() => {
      userNameInput.value = "";
      emailInput.value = "";
      mesageInput.value = "";
      console.log("success");
    })
    .catch((error) => {
      console.log(error);
    });
}
