function startTypingEffect() {
    const textArray = ["Larry Daniels", "Designer", "Developer"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;
    const element = document.getElementById("animated-text");

    function typeEffect() {
        let currentText = textArray[textIndex];
        element.textContent = isDeleting
            ? currentText.substring(0, charIndex--)
            : currentText.substring(0, charIndex++);

        if (!isDeleting && charIndex > currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, pauseTime);
        }
        else if (isDeleting && charIndex < 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            setTimeout(typeEffect, typingSpeed);
        }
        else {
            const currentSpeed = isDeleting ? deletingSpeed : typingSpeed;
            setTimeout(typeEffect, currentSpeed);
        }
    }

    typeEffect();
}

function navWhenArrived(id) {
    const element = document.getElementById(id);
    const nav = document.getElementById("navbar-example");
    const navLinks = nav.querySelectorAll(".navbar-link");
    const logo = nav.querySelector(".navbar-brand");

    const rect = element.getBoundingClientRect();
    const scrollPosition = window.scrollY + window.innerHeight;
    const elementPosition = rect.top + rect.height + window.scrollY;
    nav.style.transition = "1s";

    if (scrollPosition >= elementPosition) {
        nav.style.backgroundColor = "#f0f0f0";
        nav.classList.add("fixed-top", "navbar-white-bg");
        nav.classList.remove("position-absolute", "w-100");
        navLinks.forEach(link => {
            link.style.color = "#000";
        });
        logo.style.color = "#000";
    } else {
        nav.style.backgroundColor = "transparent";
        nav.classList.remove("fixed-top", "navbar-white-bg");
        nav.classList.add("position-absolute", "w-100");

        navLinks.forEach(link => {
            link.style.color = "#fff";
        });
        logo.style.color = "#fff";
    }
}

function animateCount(elementID, target, duration) {
    const element = document.getElementById(elementID);
    const targetNumber = parseInt(target, 10);
    const increment = targetNumber / (duration / 16);
    let currentNumber = 0;

    const counter = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= targetNumber) {
            element.innerText = targetNumber;
            clearInterval(counter);
        } else {
            element.innerText = Math.floor(currentNumber);
        }
    }, 16);
}

let counterAnimated = false;

function counterWhenArrived(id) {
    if (counterAnimated) return;

    const element = document.getElementById(id);
    const rect = element.getBoundingClientRect();
    const scrollPosition = window.scrollY + window.innerHeight;
    const elementPosition = rect.top + window.scrollY;

    if (scrollPosition >= elementPosition) {
        animateCount("Happy-customers", 850, 2000);
        animateCount("Complete-Projects", 230, 2000);
        animateCount("Lines-Of-Code", 9450, 2000);
        animateCount("Files-Downloaded", 780, 2000);
        counterAnimated = true;
    }
}

function reachID() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar-link");

    let currentSectionId = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 70;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").substring(1) === currentSectionId) {
            link.classList.add("active");
        }
    });
}

window.addEventListener('load', () => {
    navWhenArrived('About');
});

window.addEventListener('scroll', () => {
    navWhenArrived('About');
});

window.addEventListener("scroll", () => counterWhenArrived("counter"));

document.addEventListener("scroll", () => reachID());

window.onload(startTypingEffect());