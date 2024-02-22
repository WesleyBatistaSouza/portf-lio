const hamburguer = document.querySelector(".hamburguer");
const menu = document.querySelector(".menu");
const linkOff = document.querySelectorAll("nav a");
const list = document.querySelectorAll("nav li")
// dark theme variable

// const check = document.getElementById("check");
// const mode = document.querySelector(".mode");
// const theme = window.localStorage.getItem("theme");
// variable slide 
const card = document.querySelector(".card-content")

// menu hamburguer 

hamburguer.addEventListener("click", () => {
    menu.classList.toggle("active");
});
console.log(linkOff)
console.log(list)

// verifica se o tema armazenado no localStorage é escuro, se sim aplica o tema escuro no body
// if(theme === "dark") document.body.classList.add("dark");

// mode.addEventListener("click", () => {
//     document.body.classList.toggle("dark")
//     if(theme === "dark") {
//         window.localStorage.setItem("theme", "light");
//     } else (window.localStorage.setItem("theme", "dark"))


// });

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





// window.onscroll = ( => {
//     sec.forEach(section => {
//         let top = window.screenY;
//         let offSet = section.offsetTop
//         let height = section.offsetHeight;
//         let id = section.getAttribute('id');
//     };
// })
