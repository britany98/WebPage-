let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('header nav a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`header nav a[href*="${id}"]`);
    if (!link) return;

    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { threshold: 0.6 });

sections.forEach(sec => observer.observe(sec));


menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}


// ====== Toast SweetAlert2 (config global) ======
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',        // esquina superior derecha
  showConfirmButton: false,   // sin botón
  timer: 4000,                // se cierra solo
  timerProgressBar: true,
  background: '#151515',      // fondo oscuro
  color: '#e9e9e9',           // texto claro
  customClass: {
    popup: 'toast-popup'
  },
  didOpen: (toast) => {
    // pausa el temporizador al pasar el mouse
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

// ====== Ejemplo: tu envío con EmailJS ======
emailjs.init("u50CFanx0S8QgplxU");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return console.error("Falta #contactForm");
  const submitBtn = form.querySelector(".btn");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Deshabilitar botón mientras envía
    if (submitBtn) {
      submitBtn.disabled = true;
      if ("value" in submitBtn) submitBtn.value = "Sending...";
      else submitBtn.textContent = "Sending...";
    }

    emailjs.sendForm("service_1", "template_1", this)
      .then(() => {
        // ✅ Toast de éxito
        Toast.fire({
          icon: 'success',
          title: '¡Mensaje enviado!'
        });
        form.reset();
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        // ❌ Toast de error
        Toast.fire({
          icon: 'error',
          title: 'No se pudo enviar. Inténtalo de nuevo.'
        });
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