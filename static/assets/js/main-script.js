
        function toggleMenu() {
            const nav = document.getElementById('navbar');
            nav.classList.toggle('active');
        }

        function toggleDropdown(event) {
            event.stopPropagation();
            document.querySelectorAll('.dropdown').forEach(drop => {
                if (drop !== event.currentTarget.parentElement) {
                    drop.classList.remove('open');
                }
            });
            event.currentTarget.parentElement.classList.toggle('open');
        }

        // Close dropdown if clicking outside
        document.addEventListener('click', function () {
            document.querySelectorAll('.dropdown').forEach(drop => drop.classList.remove('open'));
        });
          function validateEmail(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            if (email) {
                alert('Thank you for subscribing!');
            }
        }
    
          document.querySelectorAll('.footer-contact').forEach((el, i) => {
    el.style.cursor = 'pointer';

    el.addEventListener('click', () => {
      if (i === 0) {
        // Mail
        window.location.href = "mailto:Zahrix@gmail.com";
      } else if (i === 1) {
        // Map
        window.open("https://www.google.com/maps/search/?api=1&query=23/9,+Main+Road,+Chennai", "_blank");
      } else if (i === 2) {
        // Call
        window.location.href = "tel:+9186456780987";
      }
    });
  });