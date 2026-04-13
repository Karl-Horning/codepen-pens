// Scroll-triggered visibility, based on Donovan Hutchinson's Level Up Your CSS
// Animation Skills Udemy course.
const elementsToShow = document.querySelectorAll(".show-on-scroll");

function loop() {
    elementsToShow.forEach((element) => {
        if (isElementInViewport(element)) {
            element.classList.add("is-visible");
        } else {
            element.classList.remove("is-visible");
        }
    });

    requestAnimationFrame(loop);
}

loop();

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    return (
        (rect.top <= 0 && rect.bottom >= 0) ||
        (rect.bottom >= vh && rect.top <= vh) ||
        (rect.top >= 0 && rect.bottom <= vh)
    );
}

// Scrolls smoothly to the contact form.
const headerBtn = document.getElementById("header-btn");
const socialContact = document.getElementById("social-contact");
const contactForm = document.getElementById("contact");

function scrollToForm() {
    contactForm.scrollIntoView({ behavior: "smooth" });
}

headerBtn.addEventListener("click", scrollToForm);
socialContact.addEventListener("click", scrollToForm);

// Removes the honeypot field from the DOM so it does not confuse real users.
const contactFormNoBots = document.getElementById("contact-form-no-bots");
contactFormNoBots.parentNode.removeChild(contactFormNoBots);

// Updates the copyright year if the current year is after 2019.
const currentYear = new Date().getFullYear();
if (currentYear > 2019) {
    document.getElementById("copyright-year").textContent = currentYear;
}
