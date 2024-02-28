const hamburguer = document.querySelector(".hamburguer");
const menu = document.querySelector(".menu");
const list = document.querySelectorAll("nav li");
let sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");
const sidebar = document.getElementById("sidebar")

// variable slide 
const card = document.querySelector(".card-content")

// menu hamburguer
hamburguer.addEventListener('click', () => {
    menu.classList.toggle('active');
})

// scroll bar - link active
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offSet = sec.offsetTop - 71;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if(top >= offSet && top < offSet + height) {
                navLinks.forEach(links => {
                    links.classList.remove('activeLink');
                    document.querySelector('nav a[href*=' + id +']').classList.add('activeLink');
                });
            };
        })
};


// card project
let pressed = false;
let startX = 0;

card.addEventListener("mousedown", function(e) {
    pressed = true
    startX = e.clientX
    this.style.cursor = 'grabbing'
});

card.addEventListener("mouseleave", function(e) {
    pressed = false;
})

window.addEventListener("mouseup", function(e) {
    pressed = false;
    card.style.cursor = 'grab';
});

card.addEventListener("mousemove", function(e) {
    if(!pressed) {
        return
    }
    this.scrollLeft += startX - e.clientX
})