document.addEventListener('DOMContentLoaded', () => {
  // --- MOBILE NAVIGATION MENU ---
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // --- SCROLL EFFECTS: NAVBAR & SCROLL REVEAL ---
  const navbar = document.getElementById('navbar');
  const revealElements = document.querySelectorAll('.scroll-reveal');

  // Sticky navbar logic
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial call

  // IntersectionObserver for scroll reveal
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Reveal once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(element => {
      element.classList.add('revealed');
    });
  }

  // --- SCROLLSPY (Highlighting active nav links) ---
  const sections = document.querySelectorAll('section, header');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 200; // Offset for trigger

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentSectionId}`) {
        item.classList.add('active');
      }
    });
  });

  // --- COPY EMAIL TO CLIPBOARD ---
  const btnCopyEmail = document.getElementById('btn-copy-email');
  const emailText = document.getElementById('email-text');
  const toastMessage = document.getElementById('toast-message');

  if (btnCopyEmail && emailText && toastMessage) {
    btnCopyEmail.addEventListener('click', () => {
      const email = emailText.textContent.trim();
      
      // Use modern Clipboard API
      navigator.clipboard.writeText(email).then(() => {
        // Show Toast
        toastMessage.classList.add('show');
        
        // Change icon to checkmark temporarily
        const originalBtnContent = btnCopyEmail.innerHTML;
        btnCopyEmail.innerHTML = '<i class="fa-solid fa-check"></i> Copié !';
        btnCopyEmail.style.borderColor = 'var(--secondary)';
        btnCopyEmail.style.color = 'var(--secondary-light)';

        setTimeout(() => {
          toastMessage.classList.remove('show');
          btnCopyEmail.innerHTML = originalBtnContent;
          btnCopyEmail.style.borderColor = '';
          btnCopyEmail.style.color = '';
        }, 2500);
      }).catch(err => {
        console.error('Erreur lors de la copie : ', err);
      });
    });
  }
});
