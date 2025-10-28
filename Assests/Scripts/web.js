document.addEventListener("DOMContentLoaded", () => {
    // === SMOOTH SCROLLING FOR NAVIGATION LINKS ===
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const targetId = link.getAttribute("href").slice(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60,
                    behavior: "smooth"
                });
            }
        });
    });

    // === HIGHLIGHT ACTIVE SECTION IN NAV ON SCROLL ===
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove("active"));
                const activeLink = document.querySelector(`nav a[href="#${entry.target.id}"]`);
                if (activeLink) activeLink.classList.add("active");
            }
        });
    }, { threshold: 0.6 });
    sections.forEach(section => observer.observe(section));

    // === BACK-TO-TOP FUNCTIONALITY ===
    const homeIcon = document.querySelector(".home-icon");
    if (homeIcon) {
        homeIcon.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // === DYNAMIC GREETING ===
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
        const greetingElement = document.createElement("p");
        const hours = new Date().getHours();
        const greeting = hours < 12 ? "Good Morning" : hours < 18 ? "Good Afternoon" : "Good Evening";
        greetingElement.textContent = `${greeting}, Welcome to My Portfolio!`;
        greetingElement.style.marginTop = "10px";
        greetingElement.style.fontWeight = "bold";
        greetingElement.style.textAlign = "center";
        sidebar.appendChild(greetingElement);
    }

    // === MOBILE NAV TOGGLE WITH AUTO CLOSE ===
    const toggleButton = document.querySelector(".toggle-nav");
    const navMenu = document.querySelector("header nav");

    if (toggleButton && navMenu) {
        toggleButton.addEventListener("click", (e) => {
            e.stopPropagation();
            navMenu.classList.toggle("visible");
        });

        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("visible");
            });
        });

        document.addEventListener("click", (e) => {
            if (!navMenu.contains(e.target) && !toggleButton.contains(e.target)) {
                navMenu.classList.remove("visible");
            }
        });
    }

    // === CONTACT FORM SUCCESS/ERROR ANIMATION ===
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);

            const successMsg = contactForm.querySelector('.success-message');
            const errorMsg = contactForm.querySelector('.error-message');
            const envelope = successMsg ? successMsg.querySelector('.envelope') : null;

            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData
                });

                if (response.ok) {
                    if (successMsg) {
                        // Reset animation
                        successMsg.style.display = 'flex';
                        successMsg.classList.remove('show');
                        if (envelope) envelope.classList.remove('animate');
                        void successMsg.offsetWidth; // Trigger reflow
                        successMsg.classList.add('show');
                        if (envelope) void envelope.offsetWidth;
                        if (envelope) envelope.classList.add('animate');

                        contactForm.reset();

                        // Hide success message after 4 seconds
                        setTimeout(() => {
                            successMsg.classList.remove('show');
                            successMsg.style.display = 'none';
                            if (envelope) envelope.classList.remove('animate');
                        }, 4000);
                    }
                    if (errorMsg) errorMsg.style.display = 'none';
                } else {
                    throw new Error('Network error');
                }
            } catch (error) {
                if (errorMsg) errorMsg.style.display = 'block';
                if (successMsg) successMsg.style.display = 'none';
                if (envelope) envelope.classList.remove('animate');
            }
        });
    }
});
