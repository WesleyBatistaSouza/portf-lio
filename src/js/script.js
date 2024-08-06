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
    this.submitButton = document.querySelector(settings.button);
    this.messageContainer = document.getElementById("form-messages");

    if (this.form) {
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    this.messageContainer.innerHTML = this.settings.success;
    this.messageContainer.classList.add("success-message");
    this.messageContainer.classList.remove("error-message");
  }

  displayError(message) {
    this.messageContainer.innerHTML = this.settings.error + `<p>${message}</p>`;
    this.messageContainer.classList.add("error-message");
    this.messageContainer.classList.remove("success-message");
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  }

  resetForm() {
    this.form.reset();
    this.submitButton.disabled = false;
    this.submitButton.innerText = "Enviar";
  }

  onSubmission(event) {
    event.preventDefault();
    this.submitButton.disabled = true;
    this.submitButton.innerText = "Enviando...";
  }

  validateForm() {
    const email = this.form.querySelector('input[name="email"]').value;
    const telefone = this.form.querySelector('input[name="telefone"]').value;
    const assunto = this.form.querySelector('input[name="assunto"]').value;
    const message = this.form.querySelector('textarea[name="message"]').value;

    if (!email || !telefone || !assunto || !message) {
      this.displayError("Todos os campos são obrigatórios.");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      this.displayError("Por favor, insira um e-mail válido.");
      return false;
    }
    return true;
  }

  async sendForm(event) {
    this.onSubmission(event);
    if (!this.validateForm()) {
      this.submitButton.disabled = false;
      this.submitButton.innerText = "Enviar";
      return;
    }
    try {
      const response = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      });

      if (response.ok) {
        this.displaySuccess();
        this.resetForm();
      } else {
        this.displayError("Erro ao enviar o formulário.");
        this.submitButton.disabled = false;
        this.submitButton.innerText = "Enviar";
      }
    } catch (error) {
      this.displayError("Erro ao enviar o formulário.");
      console.error(error);
      this.submitButton.disabled = false;
      this.submitButton.innerText = "Enviar";
    }
  }

  initForm() {
    if (this.form) this.submitButton.addEventListener("click", this.sendForm);
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
