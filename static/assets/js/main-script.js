
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
        // document.addEventListener('click', function () {
        //     document.querySelectorAll('.dropdown').forEach(drop => drop.classList.remove('open'));
        // });
        //   function validateEmail(e) {
        //     e.preventDefault();
        //     const email = document.getElementById('email').value;
        //     if (email) {
        //         alert('Thank you for subscribing!');
        //     }
        // }
         document.addEventListener('click', function () {
        document.querySelectorAll('.dropdown').forEach(drop => drop.classList.remove('open'));
    });

    function validateEmail(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        
        // Basic email regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            alert('Please enter an email address.');
        } else if (!emailPattern.test(email)) {
            alert('Invalid email address.');
        } 
        else if (!email.endsWith('.com')) {
        alert('Email must end with ".com".');
    }else {
            alert('Thank you for subscribing!');
        }
    }
    
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
    function toggleDropdownbtn() {
    const dropdown = document.getElementById('dropdownContent');
    if (dropdown.style.display === 'block') {
      dropdown.style.display = 'none';
    } else {
      dropdown.style.display = 'block';
    }
  }