// Toggle Menu Functionality
const toggleMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
  
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active'); // animate ☰ to ✖
  };
  
// Highlight active nav link on click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener("click", function () {
        document.querySelectorAll('.nav-links a').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});



// Scroll-based nav highlight
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.fly-section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - window.innerHeight / 2;
        const sectionHeight = section.offsetHeight;

        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

function scrollToTop(e) {
    e.preventDefault(); // Prevent default anchor behavior
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

  


// Ensure menu closes when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener("click", () => {
        document.querySelector('.nav-links').classList.remove("active");
        document.querySelector('.menu-toggle').classList.remove("active"); // <--- ADD THIS
    });
});


// Tab Switching Functionality with Smooth Transition
const tablinks = document.querySelectorAll(".tab-links");
const tabcontents = document.querySelectorAll(".tab-contents");


function opentab(event, tabname) {

    
    tablinks.forEach(tab => tab.classList.remove("active-link"));
    tabcontents.forEach(tab => {
        tab.classList.remove("active-tab");
        tab.style.opacity = 0;  // Set opacity to 0 before transition
    });

    event.currentTarget.classList.add("active-link");
    const activeTab = document.getElementById(tabname);
    activeTab.classList.add("active-tab");

 setTimeout(() => {
        activeTab.style.opacity = 1;  // Fade in after active-tab is added
    }, 100); 
}





// Popup Functionality with Smooth Fade In/Out
const show = (id) => {
    const popup = document.getElementById(id);
    popup.style.display = 'block';
    setTimeout(() => popup.style.opacity = 1, 10);
};

const hide = (id) => {
    const popup = document.getElementById(id);
    popup.style.opacity = 0;
    setTimeout(() => popup.style.display = 'none', 300);
};


// Form Validation
const form = document.querySelector("form");
if (form) {
    form.addEventListener("submit", function (e) {
        let email = document.querySelector("input[type='email']").value;
        if (!email.includes("@")) {
            alert("Please enter a valid email.");
            e.preventDefault();
        }
    });
}

// FIREFLIES
document.addEventListener('DOMContentLoaded', () => {
    const firefliesContainer = document.querySelector('.fireflies');
    const fireflies = [];
    const numFireflies = 25;
    const attractionRadius = 150;
    const shakeThreshold = 40;

    let mouse = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        prevX: window.innerWidth / 2,
        prevY: window.innerHeight / 2,
        speed: 0
    };

    window.addEventListener('mousemove', e => {
        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;

        mouse.x = e.clientX;
        mouse.y = e.clientY;

        const dx = mouse.x - mouse.prevX;
        const dy = mouse.y - mouse.prevY;
        mouse.speed = Math.sqrt(dx * dx + dy * dy);
    });

    for (let i = 0; i < numFireflies; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';

        const size = Math.random() * 4 + 3;
        firefly.style.width = `${size}px`;
        firefly.style.height = `${size}px`;

        const initialX = Math.random() * window.innerWidth;
        const initialY = Math.random() * window.innerHeight;

        firefliesContainer.appendChild(firefly);

        fireflies.push({
            el: firefly,
            x: initialX,
            y: initialY,
            vx: 0,
            vy: 0,
            orbiting: false,
            orbitAngle: Math.random() * Math.PI * 2,
            orbitSpeed: Math.random() * 0.02 + 0.01,
            orbitRadius: Math.random() * 40 + 30,
            wanderAngle: Math.random() * Math.PI * 2,
            wanderSpeed: Math.random() * 0.5 + 0.5,
            fleeing: false,
            fleeTimer: 0
        });
    }

    function spawnTrail(x, y) {
        const particle = document.createElement('div');
        particle.className = 'firefly-trail';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        firefliesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 400);
    }

    function animateFireflies() {
        fireflies.forEach(f => {
            const dx = mouse.x - f.x;
            const dy = mouse.y - f.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Shake-to-flee
            if (mouse.speed > shakeThreshold && distance < attractionRadius + 50 && !f.fleeing) {
                f.fleeing = true;
                f.fleeTimer = 30 + Math.random() * 30;

                // Add flee glow
                f.el.classList.add('fleeing');

                const angle = Math.atan2(dy, dx) + Math.PI + (Math.random() - 0.5);
                const speed = 6 + Math.random() * 3;
                f.vx = Math.cos(angle) * speed;
                f.vy = Math.sin(angle) * speed;
            }

            if (f.fleeing) {
                f.fleeTimer--;
                f.x += f.vx;
                f.y += f.vy;
                f.vx *= 0.95;
                f.vy *= 0.95;

                // Trail
                spawnTrail(f.x, f.y);

                if (f.fleeTimer <= 0) {
                    f.fleeing = false;
                    f.el.classList.remove('fleeing');
                }
            } else if (distance < attractionRadius) {
                f.orbiting = true;
                f.orbitAngle += f.orbitSpeed;
                f.x = mouse.x + Math.cos(f.orbitAngle) * f.orbitRadius;
                f.y = mouse.y + Math.sin(f.orbitAngle) * f.orbitRadius;
            } else {
                f.orbiting = false;
                f.wanderAngle += (Math.random() - 0.5) * 0.3;
                f.vx += Math.cos(f.wanderAngle) * f.wanderSpeed * 0.2;
                f.vy += Math.sin(f.wanderAngle) * f.wanderSpeed * 0.2;
                f.vx *= 0.92;
                f.vy *= 0.92;
                f.x += f.vx;
                f.y += f.vy;
            }

            // Bounds
            f.x = Math.max(0, Math.min(window.innerWidth, f.x));
            f.y = Math.max(0, Math.min(window.innerHeight, f.y));

            f.el.style.transform = `translate(${f.x}px, ${f.y}px)`;
        });

        requestAnimationFrame(animateFireflies);
    }

    animateFireflies();
});









function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Close the modal if clicked outside of content
window.onclick = function (event) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    });
};

// Custom cursor movement
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.custom-cursor');
  
    window.addEventListener('mousemove', (e) => {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
    });
  
    // Add hover ring effect for links and buttons
    const hoverTargets = document.querySelectorAll('a, button, .tab-links');
  
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('ring'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('ring'));
    });
  
    // Hide cursor when leaving viewport
    document.addEventListener('mouseleave', () => cursor.style.display = 'none');
    document.addEventListener('mouseenter', () => cursor.style.display = 'block');
});
  


document.addEventListener('scroll', () => {
  requestAnimationFrame(() => {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.scrollY;
    const fadeEnd = window.innerHeight * 0.8;
    let opacity = Math.max(1 - scrollPosition / fadeEnd, 0);
    hero.style.opacity = opacity;
  });
});

document.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    let offset = window.scrollY * 0.3; // Parallax factor
    hero.style.backgroundPositionY = `${offset}px`;
  });
  

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.fade-section');
    
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('hidden');
          } else {
            entry.target.classList.add('hidden');
          }
        });
      },
      {
        threshold: 0.3 // Trigger when 30% of the section is visible
      }
    );
  
    sections.forEach(section => {
      observer.observe(section);
      section.classList.add('hidden'); // Start hidden
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.fly-section');
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, { threshold: 0.2 });
  
    sections.forEach(section => {
      section.classList.add('fade-section'); // initial fade-in state
      observer.observe(section);
    });
  });

// MEDIA USAGE
// Check if the screen width is greater than 768px before running the firefly animation
if (window.innerWidth > 768) {
    // Run firefly animation
  }
