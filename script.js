let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelector('section');
let navLinks = document.querySelector('header nav a');

window.onscroll = () => {
    sections.onbeforematch(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a [href*=' 
                    + id + ' ]').classList.add('active')
            })
        }
    })
}






menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}


// PUBLIC_KEY
emailjs.init("u50CFanx0S8QgplxU");

// Espera a que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const submitBtn = form?.querySelector(".btn"); // tu botón "Send Message"

  if (!form) {
    console.error("No se encontró el formulario con id='contactForm'.");
    return;
  }

  // Validación simple (opcional pero recomendable)
  const validators = {
    fullName: (v) => v.trim().length >= 2,
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    subject: (v) => v.trim().length >= 2,
    message: (v) => v.trim().length >= 5,
    phone: (v) => v === "" || /^[0-9+()\-\s]{7,}$/.test(v),
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Lee los valores por name=""
    const data = Object.fromEntries(new FormData(form));

    // Validación mínima
    const required = ["fullName", "email", "subject", "message"];
    for (const key of required) {
      if (!validatorskey) {
        alert("Por favor, completa correctamente los campos requeridos.");
        return;
      }
    }
    // Validación de phone si viene
    if (!validators.phone(data.phone || "")) {
      alert("El número de teléfono no es válido.");
      return;
    }

    // Deshabilita botón mientras envía
    if (submitBtn) {
      submitBtn.disabled = true;
      if ("value" in submitBtn) submitBtn.value = "Sending...";
      else submitBtn.textContent = "Sending...";
    }

    // Envía usando EmailJS (usa tus IDs)
    emailjs
      .sendForm("service_1", "template_1", this)
      .then(() => {
        alert("¡Mensaje enviado correctamente! 💗📩");
        form.reset();
      })
      .catch((error) => {
        console.error("Error al enviar con EmailJS:", error);
        alert("Hubo un problema al enviar. Inténtalo de nuevo.");
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          if ("value" in submitBtn) submitBtn.value = "Send Message";
          else submitBtn.textContent = "Send Message";
        }
      });
  });
});
