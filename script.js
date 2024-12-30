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
  });

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
    scrollToElement('.formacao__conteudo');
});

link2.addEventListener('click', () => {
    scrollToElement('.header', 1);
});

link3.addEventListener('click', () => {
    scrollToElement('.column');
});