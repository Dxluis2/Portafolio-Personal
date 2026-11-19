
document.addEventListener("DOMContentLoaded", function () {

    const header = document.querySelector(".header");
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const links = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("main section[id]");
    const year = document.getElementById("year");

    // ACTUALIZAR AÑO

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // MENU PARA CELULARES

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            const abierto = navLinks.classList.toggle("show");

            menuToggle.textContent = abierto ? "✕" : "☰";

            menuToggle.setAttribute(
                "aria-expanded",
                String(abierto)
            );

            menuToggle.setAttribute(
                "aria-label",
                abierto ? "Cerrar menú" : "Abrir menú"
            );

        });

        // CERRAR MENU AL SELECCIONAR UNA SECCION

        links.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("show");

                menuToggle.textContent = "☰";

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.setAttribute("aria-label", "Abrir menú");

            });

        });

        // CERRAR MENU CON ESCAPE

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                navLinks.classList.remove("show");

                menuToggle.textContent = "☰";

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.setAttribute("aria-label", "Abrir menú");

            }

        });

    }

    // SOMBRA EN LA BARRA DE NAVEGACION

    function actualizarHeader() {

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", actualizarHeader, {
        passive: true
    });

    actualizarHeader();

    // ANIMACIONES AL DESPLAZARSE

    const elementosAnimados = document.querySelectorAll(
        ".section-heading, " +
        ".about-text, " +
        ".about-info, " +
        ".education-card, " +
        ".skills-title, " +
        ".skill-card, " +
        ".project-card, " +
        ".contact-box"
    );

    const reducirMovimiento = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reducirMovimiento) {

        elementosAnimados.forEach(function (elemento) {
            elemento.classList.add("reveal");
        });

        const observer = new IntersectionObserver(
            function (entradas, observador) {

                entradas.forEach(function (entrada) {

                    if (entrada.isIntersecting) {

                        entrada.target.classList.add("active");

                        observador.unobserve(entrada.target);

                    }

                });

            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -20px 0px"
            }
        );

        elementosAnimados.forEach(function (elemento) {
            observer.observe(elemento);
        });

    }

    // RESALTAR LA SECCION ACTUAL DEL MENU

    function actualizarSeccionActiva() {

        let seccionActual = "inicio";

        sections.forEach(function (seccion) {

            const posicion = seccion.offsetTop - 150;

            if (window.scrollY >= posicion) {
                seccionActual = seccion.getAttribute("id");
            }

        });

        links.forEach(function (link) {

            const destino = link.getAttribute("href");

            if (destino === "#" + seccionActual) {

                link.classList.add("active-link");

                link.setAttribute("aria-current", "location");

            } else {

                link.classList.remove("active-link");

                link.removeAttribute("aria-current");

            }

        });

    }

    window.addEventListener("scroll", actualizarSeccionActiva, {
        passive: true
    });

    actualizarSeccionActiva();

    // ANIMACION SUAVE DE LOS ENLACES INTERNOS

    document.querySelectorAll('a[href^="#"]').forEach(
        function (enlace) {

            enlace.addEventListener("click", function (event) {

                const destino = enlace.getAttribute("href");

                if (!destino || destino === "#") {
                    return;
                }

                const elemento = document.querySelector(destino);

                if (elemento) {

                    event.preventDefault();

                    elemento.scrollIntoView({
                        behavior: reducirMovimiento ? "auto" : "smooth",
                        block: "start"
                    });

                    history.replaceState(null, "", destino);

                }

            });

        }
    );

});

