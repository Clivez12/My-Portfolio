document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for navigation links
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

    // Highlight active section in nav on scroll
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

    // Back-to-top functionality
    const homeIcon = document.querySelector(".home-icon");
    homeIcon.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Dynamic greeting
    const greetingElement = document.createElement("p");
    const hours = new Date().getHours();
    let greeting = hours < 12 ? "Good Morning" : hours < 18 ? "Good Afternoon" : "Good Evening";
    greetingElement.textContent = `${greeting}, Welcome to My Portfolio!`;
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) sidebar.appendChild(greetingElement);

    // Toggle navigation on small screens
    const toggleButton = document.querySelector(".toggle-nav");
    toggleButton.addEventListener("click", () => {
        const nav = document.querySelector("nav");
        nav.classList.toggle("visible");
    });
});
