const hamburguer = document.querySelector(".hamburguer");
const menu = document.querySelector(".menu");
const list = document.querySelectorAll("nav li");
let sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");
const sidebar = document.getElementById("sidebar");

// variable slide
const card = document.querySelector(".card-content");

// menu hamburguer
hamburguer.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// scroll bar - link active
window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offSet = sec.offsetTop - 71;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offSet && top < offSet + height) {
      navLinks.forEach((links) => {
        links.classList.remove("activeLink");
        document
          .querySelector("nav a[href*=" + id + "]")
          .classList.add("activeLink");
      });
    }
  });
};

// card project
let pressed = false;
let startX = 0;

card.addEventListener("mousedown", function (e) {
  pressed = true;
  startX = e.clientX;
  this.style.cursor = "grabbing";
});

card.addEventListener("mouseleave", function (e) {
  pressed = false;
});

window.addEventListener("mouseup", function (e) {
  pressed = false;
  card.style.cursor = "grab";
});

card.addEventListener("mousemove", function (e) {
  if (!pressed) {
    return;
  }
  this.scrollLeft += startX - e.clientX;
});

// contact me

class ContactMe {
    constructor(settings) {
        this.settings = settings;
        this.form = document.querySelector(settings.form);
        this.submitMessage = document.querySelector(settings.button);

        if (this.form) {
            this.url = this.form.getAttribute("action");
        }
        this.sendForm = this.sendForm.bind(this);
    }

    displaySuccess() {
        this.form.innerHTML = this.settings.success;
    }

    displayError() {
        this.form.innerHTML = this.settings.error;
    }

    getFormObject() {
        const formObject = {};
        const fields = this.form.querySelectorAll("[name]");
        fields.forEach((field) => {
            formObject[field.getAttribute("name")] = field.value;
        });
        return formObject;
    }

    onSubmission(event) {
        event.preventDefault();
        this.submitMessage.disabled = true;
        this.submitMessage.innerText = "Enviando...";
    }

    async sendForm(event) {
        this.onSubmission(event);
        try {
            const response = await fetch(this.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams(this.getFormObject()).toString(),
            });

            if (response.ok) {
                this.displaySuccess();
            } else {
                this.displayError();
            }
        } catch (error) {
            this.displayError();
            console.error(error);
        } finally {
            this.submitMessage.disabled = false;
            this.submitMessage.innerText = "Enviar";
        }
    }

    initForm() {
        if (this.form)
            this.submitMessage.addEventListener("click", this.sendForm);
        return this;
    }
}

const formSubmit = new ContactMe({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h1 class='success'>Mensagem enviada!</h1>",
    error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
});

formSubmit.initForm();