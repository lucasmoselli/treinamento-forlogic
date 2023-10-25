let menu = document.querySelector('.bx-menu')
let navbar = document.querySelector('.nav-header')
let perfilHeader = document.getElementById('perfil')
let cadastroLista = document.getElementById('cadastro-lista')
let sairBtn = document.getElementById('sair')

let listaCadastrados = JSON.parse(localStorage.getItem("listacadastrados") || '[]')


let nomesLogado = JSON.parse(localStorage.getItem('nomelogado') || '[]')

var nomeHeader = nomesLogado.nomeCompleto

perfilHeader.innerHTML = `<div class="fakeimg"></div>
                        <p>${nomeHeader}</p>
                        <a id="sair" onclick="sair()">Sair</a>
                        `
menu.onclick = () => {

        menu.classList.toggle('bx-x')
        navbar.classList.toggle('open')
}

function sair(){
    document.body.style.cursor = "wait"
    localStorage.removeItem('nomelogado')
    setTimeout(() => {
        window.location.href = "./../../login.html"
    }, 1500)                       
}

console.log(nomesLogado == 0)
if(nomesLogado==0){
    window.location.href = "./../../login.html"
    window.alert('Você deslogou, para voltar deve logar novamente')
}