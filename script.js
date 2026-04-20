/* ============================================================
   script.js — ARCHIVE_01 // Jérémie Gartner
   ============================================================ */


/* ------------------------------------------------------------
   1. Configuration Tailwind CSS
   ─────────────────────────────────────────────────────────────
   Doit être déclarée AVANT le chargement du CDN Tailwind.
   Ce fichier est inclus en premier dans le <head> d'index.html.
   ------------------------------------------------------------ */
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {

            /* -- Palette de couleurs Material You (light mode) -- */
            colors: {
                "surface-dim":                  "#dadada",
                "surface-container-high":       "#e8e8e8",
                "primary-fixed-dim":            "#832700",
                "tertiary-fixed-dim":           "#464747",
                "on-primary-container":         "#ffffff",
                "tertiary":                     "#3b3b3b",
                "on-primary-fixed-variant":     "#ffdbcf",
                "on-error":                     "#ffffff",
                "secondary":                    "#5e5e5e",
                "error":                        "#ba1a1a",
                "surface-tint":                 "#ab3600",
                "on-tertiary":                  "#e4e2e2",
                "tertiary-fixed":               "#5e5e5e",
                "on-primary":                   "#ffdbcf",
                "surface-bright":               "#f9f9f9",
                "surface-container-low":        "#f4f3f3",
                "primary-fixed":                "#ab3600",
                "surface-container":            "#eeeeee",
                "background":                   "#f9f9f9",
                "on-secondary-fixed":           "#1b1b1b",
                "outline-variant":              "#c6c6c6",
                "secondary-container":          "#d4d4d4",
                "on-surface":                   "#1a1c1c",
                "error-container":              "#ffdad6",
                "inverse-on-surface":           "#f1f1f1",
                "surface":                      "#f9f9f9",
                "primary":                      "#000000",
                "on-secondary":                 "#ffffff",
                "on-primary-fixed":             "#ffffff",
                "primary-container":            "#6f2000",
                "on-background":                "#1a1c1c",
                "surface-container-lowest":     "#ffffff",
                "on-tertiary-fixed":            "#ffffff",
                "on-surface-variant":           "#474747",
                "on-tertiary-container":        "#ffffff",
                "secondary-fixed-dim":          "#ababab",
                "surface-container-highest":    "#e2e2e2",
                "secondary-fixed":              "#c6c6c6",
                "tertiary-container":           "#757474",
                "surface-variant":              "#e2e2e2",
                "outline":                      "#777777",
                "on-secondary-fixed-variant":   "#3b3b3b",
                "on-error-container":           "#410002",
                "inverse-primary":              "#ffb59c",
                "on-tertiary-fixed-variant":    "#e4e2e2",
                "on-secondary-container":       "#1b1b1b",
                "inverse-surface":              "#2f3131"
            },

            /* -- Familles de polices -- */
            fontFamily: {
                "headline": ["Space Grotesk"],
                "body":     ["Inter"],
                "label":    ["Space Grotesk"]
            },

            /* -- Rayons de bordure : style brutaliste (angles vifs) -- */
            borderRadius: {
                "DEFAULT": "0px",
                "lg":      "0px",
                "xl":      "0px",
                "full":    "9999px"
            }
        }
    }
};


/* ------------------------------------------------------------
   2. Interactions — chargées après le DOM
   ------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {

    /* ----------------------------------------------------------
       Lien de navigation actif au scroll (IntersectionObserver)
       ─────────────────────────────────────────────────────────
       Surveille quelles sections sont visibles dans la fenêtre
       et applique la classe .is-active sur le lien correspondant.
       ---------------------------------------------------------- */
    const sections  = document.querySelectorAll("section[id], footer[id]");
    const navLinks  = document.querySelectorAll(".nav-link");

    /**
     * Met à jour l'état actif des liens selon l'id de section visible.
     * @param {string} activeId - L'id de la section actuellement visible
     */
    function setActiveLink(activeId) {
        navLinks.forEach(link => {
            const href = link.getAttribute("href"); // ex: "#projets"
            if (href === `#${activeId}`) {
                link.classList.add("is-active");
            } else {
                link.classList.remove("is-active");
            }
        });
    }

    /* Observer : déclenche dès qu'une section occupe ≥ 40% du viewport */
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        },
        {
            root:       null,        // viewport
            rootMargin: "0px",
            threshold:  0.4          // 40% de la section doit être visible
        }
    );

    sections.forEach(section => observer.observe(section));

    /* ----------------------------------------------------------
       Fermeture douce du scroll (compense la hauteur de la nav)
       ─────────────────────────────────────────────────────────
       Empêche la nav fixe de masquer le titre de la section cible.
       ---------------------------------------------------------- */
    const NAV_HEIGHT = 64; // 4rem / h-16 Tailwind

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (!href.startsWith("#")) return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const top = target.getBoundingClientRect().top
                        + window.scrollY
                        - NAV_HEIGHT;

            window.scrollTo({ top, behavior: "smooth" });
        });
    });

});
