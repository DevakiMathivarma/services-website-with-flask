
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

        document.addEventListener('click', function () {
            document.querySelectorAll('.dropdown').forEach(drop => drop.classList.remove('open'));
        });

       
          document.querySelectorAll('.footer-contact').forEach((el, i) => {
    el.style.cursor = 'pointer';

    el.addEventListener('click', () => {
      if (i === 0) {
        // Mail
        window.location.href = "https://mail.google.com/mail/?view=cm&to=Zahrix@gmail.com","_blank";
      } else if (i === 1) {
        // Map
        window.open("https://www.google.com/maps/search/?api=1&query=23/9,+Main+Road,+Chennai", "_blank");
      } else if (i === 2) {
        // Call
        window.location.href = "tel:+9186456780987";
      }
    });
  });
   function animateCounter(element, target, suffix) {
    let count = 0;
    const duration = 2000; // 2 seconds total
    const step = Math.ceil(target / (duration / 30)); // how much to increment
    const interval = setInterval(() => {
      count += step;
      if (count >= target) {
        count = target;
        clearInterval(interval);
      }
      element.textContent = count + suffix;
    }, 30);
  }

  const statSection = document.querySelector('.stats-section');
  const statBoxes = document.querySelectorAll('.stat-box h2');
  let started = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        statBoxes.forEach(box => {
          const rawText = box.textContent.trim();
          const number = parseInt(rawText);
          const suffix = rawText.replace(/[0-9]/g, '');
          animateCounter(box, number, suffix);
        });
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statSection);
   function toggleDropdownbtn() {
    const dropdown = document.getElementById('dropdownContent');
    if (dropdown.style.display === 'block') {
      dropdown.style.display = 'none';
    } else {
      dropdown.style.display = 'block';
    }
  }