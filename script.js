/* =========================================
ADEEL AKHTAR — PORTFOLIO INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

// Initialize icons from Lucide
function initializeIcons() {
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

initializeIcons();


// =====================================
// MOBILE NAVIGATION
// =====================================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");

function closeMobileMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    menuToggle.innerHTML = '<i data-lucide="menu"></i>';
    initializeIcons();
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.innerHTML = isOpen
            ? '<i data-lucide="x"></i>'
            : '<i data-lucide="menu"></i>';

        initializeIcons();
    });

    navItems.forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMobileMenu();
        }
    });

    document.addEventListener("click", (event) => {
        const clickedInsideMenu = navLinks.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            closeMobileMenu();
        }
    });
}


// =====================================
// ACTIVE NAVIGATION LINK
// =====================================

const pageSections = document.querySelectorAll("main section[id]");

function updateActiveNavigation() {
    let currentSection = "home";
    const scrollPosition = window.scrollY + 160;

    pageSections.forEach((section) => {
        if (scrollPosition >= section.offsetTop) {
            currentSection = section.id;
        }
    });

    navItems.forEach((link) => {
        const target = link.getAttribute("href");

        link.classList.toggle(
            "active",
            target === `#${currentSection}`
        );
    });
}

window.addEventListener("scroll", updateActiveNavigation, {
    passive: true
});

updateActiveNavigation();


// =====================================
// PROJECT FILTERING
// =====================================

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const projectCount = document.getElementById("project-count");

function updateProjectCount() {
    if (!projectCount) return;

    const visibleProjects = Array.from(projectCards).filter((card) => {
        return !card.classList.contains("is-hidden");
    });

    const total = String(visibleProjects.length).padStart(2, "0");

    projectCount.textContent = `${total} PROJECTS`;
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter;

        filterButtons.forEach((item) => {
            item.classList.remove("active");
            item.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        projectCards.forEach((card) => {
            const categories = (card.dataset.category || "").split(" ");

            const shouldShow =
                selectedFilter === "all" ||
                categories.includes(selectedFilter);

            card.classList.toggle("is-hidden", !shouldShow);
        });

        updateProjectCount();
    });

    button.setAttribute(
        "aria-pressed",
        button.classList.contains("active") ? "true" : "false"
    );
});

updateProjectCount();


// =====================================
// SCROLL REVEAL ANIMATIONS
// =====================================

const revealElements = document.querySelectorAll(".reveal");

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    revealElements.forEach((element, index) => {
        element.style.transitionDelay = `${(index % 4) * 75}ms`;
        revealObserver.observe(element);
    });

} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}


// =====================================
// FOOTER YEAR
// =====================================

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// =====================================
// SMOOTH SCROLL FOR INTERNAL LINKS
// =====================================

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const targetElement = document.querySelector(targetId);

        if (!targetElement) return;

        event.preventDefault();

        targetElement.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start"
        });

        if (window.location.hash !== targetId) {
            history.replaceState(null, "", targetId);
        }
    });
});


// =====================================
// CONSOLE BRANDING
// =====================================

console.log(
    "%c Muhammad Adeel Akhtar | Portfolio ",
    "background: #6d52d9; color: white; padding: 8px 12px; border-radius: 5px; font-weight: bold;"
);

console.log(
    "%cLearning, building, and improving — one project at a time.",
    "color: #9b72ff; font-size: 12px;"
);

});
