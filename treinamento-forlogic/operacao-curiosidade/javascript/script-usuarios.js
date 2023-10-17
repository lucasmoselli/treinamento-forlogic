
let menu = document.querySelector('.bx-menu')
let navbar = document.querySelector('.nav-header')
let perfilHeader = document.getElementById('perfil')

let nomesLogado = JSON.parse(localStorage.getItem('nomelogado') || '[]')

var nome = nomesLogado.nomeCompleto
console.log(nome)

perfilHeader.innerHTML = `<div class="fakeimg"></div>
                        <p>${nome}</p>
                        <a href="login.html">Sair</a>
                        `
menu.onclick = () => {
    menu.classList.toggle('bx-x')
    navbar.classList.toggle('open')
}
