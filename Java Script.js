// Toggle Menu Functionality
const toggleMenu = () => {
    document.querySelector('.nav-links').classList.toggle('active');
};



// Tab Switching Functionality
const tablinks = document.querySelectorAll(".tab-links");
const tabcontents = document.querySelectorAll(".tab-contents");

function opentab(event, tabname){
    for(let tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for(let tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// Popup Functionality
const show = (id) => {
    document.getElementById(id).style.display = 'block';
};

const hide = (id) => {
    document.getElementById(id).style.display = 'none';
};

// Form Validation
const form = document.querySelector("form");
if (form) {
    form.addEventListener("submit", function(e) {
        let email = document.querySelector("input[type='email']").value;
        if (!email.includes("@")) {
            alert("Please enter a valid email.");
            e.preventDefault();
        }
    });
}
// Fireflies 
document.addEventListener('DOMContentLoaded', () => {
    const firefliesContainer = document.querySelector('.fireflies');

    for (let i = 0; i < 25; i++) {
        let firefly = document.createElement('div');
        firefly.className = 'firefly';
        
        // Random positions
        firefly.style.left = Math.random() * 100 + 'vw';
        firefly.style.top = Math.random() * 100 + 'vh';
        
        // Random size and animation delay
        firefly.style.width = firefly.style.height = Math.random() * 5 + 5 + 'px';
        firefly.style.animationDuration = Math.random() * 5 + 3 + 's';
        firefly.style.animationDelay = Math.random() * 5 + 's';
        
        firefliesContainer.appendChild(firefly);
    }
});
