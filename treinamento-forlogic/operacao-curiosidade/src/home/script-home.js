let menu = document.querySelector('.bx-menu')
let navbar = document.querySelector('.nav-header')
let perfilHeader = document.getElementById('perfil')
let cadastroLista = document.getElementById('cadastro-lista')
let sairBtn = document.getElementById('sair')
let card1 = document.getElementById('card1')
let card2 = document.getElementById('card2')
let card3 = document.getElementById('card3')

let nomesLogado = JSON.parse(localStorage.getItem('nomelogado') || '[]')
let listaCadastrados = JSON.parse(localStorage.getItem("listacadastrados") || '[]')


menu.onclick = () => {
    menu.classList.toggle('bx-x')
    navbar.classList.toggle('open')
}

function inativos(){
    let inativoQtd = 0
    if(listaCadastrados.length!=0){
        for(var i = 0; i <listaCadastrados.length; i++) {
            if(listaCadastrados[i].ativoCad == 'false') {
                inativoQtd++
            }
        }
    }
    return inativoQtd
}

card1.innerHTML = `<h1>${listaCadastrados.length}</h1>
                      <span>Total de Cadastros</span>`

card2.innerHTML = `<h1>${listaCadastrados.length}</h1>
                      <span>Cadastros no ultimo mes</span>`

card3.innerHTML = `<h1>${inativos()}</h1>
                      <span>Cadastros com pendencia de revisão</span>`

perfilHeader.innerHTML = `<div class="fakeimg"></div>
                        <p>${nomesLogado.nomeCompleto}</p>
                        <a id="sair" onclick="sair()">Sair</a>
                        `
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