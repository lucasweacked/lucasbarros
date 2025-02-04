const listaCursos = document.querySelector('.formacao__conteudo__cursos__cursos');

fetch('cursos.json')
  .then(response => {
    if (!response.ok) throw new Error('Erro ao carregar o arquivo JSON');
    return response.json();
  })
  .then(cursos => {

    cursos.forEach(curso => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');

      link.href = curso.certificado;
      link.textContent = 'com certificado';
      link.target = '_blank';
      link.rel = 'noopener';

      listItem.textContent = `${curso.nome} `;
      listItem.appendChild(link);

      listaCursos.appendChild(listItem);
    });
  })
  .catch(error => {
  console.error('Erro ao carregar os dados:', error);
  listaCursos.innerHTML = "<li>Erro ao carregar os cursos. Tente novamente mais tarde.</li>";
  });

// Script de scroll inspirado por ASMR Prog (https://www.youtube.com/@AsmrProg)
function scrollToElement(elementSelector, instance = 0) {
    const elements = document.querySelectorAll(elementSelector);
    if (elements.length > instance) {
        elements[instance].scrollIntoView({ behavior: 'smooth' });
    }
}

const link1 = document.getElementById("link1");
const link2 = document.getElementById("link2");
const link3 = document.getElementById("link3");

link1.addEventListener('click', () => {
    scrollToElement('.formacao');
});

link2.addEventListener('click', () => {
    scrollToElement('.projetos');
});

link3.addEventListener('click', () => {
    scrollToElement('.contato');
});

// Script de envio do formulário para o E-Mail 
class FormSubmit {
    constructor(settings) {
        this.settings = settings;
        this.form = document.querySelector(settings.form);
        this.formButton = document.querySelector(settings.button);
        if (this.form) {
            this.url = this.form.getAttribute("action");
        }
        this.sendForm = this.sendForm.bind(this);
        this.animationInterval = null;
    }

    displaySuccess() {
        this.formButton.innerText = "Enviado com sucesso!";
        this.formButton.disabled = false;

        // Retorna para o texto original "enviar" após 3 segundos
        setTimeout(() => {
            this.formButton.innerText = "Enviar";
        }, 3000);
    }

    displayError() {
        this.formButton.innerText = "Erro, tente novamente";
        this.formButton.disabled = false;

        // Retorna para o texto original "enviar" após 3 segundos
        setTimeout(() => {
            this.formButton.innerText = "Enviar";
        }, 3000);
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
        this.formButton.disabled = true;
        
        // Inícia a animação do botão "enviando..."
        let dots = 0;
        this.formButton.innerText = "Enviando";
        this.animationInterval = setInterval(() => {
            dots = (dots + 1) % 4;
            this.formButton.innerText = "Enviando" + ".".repeat(dots);
        }, 500);
    }

    async sendForm(event) {
        try {
            this.onSubmission(event);
            await fetch(this.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(this.getFormObject()),
            });
            clearInterval(this.animationInterval); // Para a animação
            this.displaySuccess();
        } catch (error) {
            clearInterval(this.animationInterval); // Para a animação em caso de erro
            this.displayError();
            throw new Error(error);
        }
    }

    init() {
        if (this.form) this.formButton.addEventListener("click", this.sendForm);
        return this;
    }
}

// Inicialização do FormSubmit
const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
});
formSubmit.init();

// Script para pegar o ano atual para o footer
document.getElementById('ano-atual').textContent = new Date().getFullYear();