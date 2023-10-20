
let menu = document.querySelector('.bx-menu')
let navbar = document.querySelector('.nav-header')
let perfilHeader = document.getElementById('perfil')
let cadastroLista = document.getElementById('cadastro-lista')
let card1 = document.getElementById('card1')
let card2 = document.getElementById('card2')
let card3 = document.getElementById('card3')

let nomesLogado = JSON.parse(localStorage.getItem('nomelogado') || '[]')
let listaCadastrados = JSON.parse(localStorage.getItem("listacadastrados") || '[]')

var nomeHeader = nomesLogado.nomeCompleto

function inativos(){
    let inativoQtd = 0
    if(listaCadastrados.length!=0){
        for(var i = 0; i <listaCadastrados.length; i++) {
            if(listaCadastrados[i].ativoCad == 'false') {
                inativoQtd++
                console.log(inativoQtd)
            }
        }
    }
    console.log(inativoQtd)
    return inativoQtd
}

card1.innerHTML = `<h1>${listaCadastrados.length}</h1>
                      <span>Total de Cadastros</span>`

card2.innerHTML = `<h1>${listaCadastrados.length}</h1>
                      <span>Cadastros no ultimo mes</span>`

card3.innerHTML = `<h1>${inativos()}</h1>
                      <span>Cadastros com pendencia de revisão</span>`

perfilHeader.innerHTML = `<div class="fakeimg"></div>
                        <p>${nomeHeader}</p>
                        <a href="login.html">Sair</a>
                        `


menu.onclick = () => {
    menu.classList.toggle('bx-x')
    navbar.classList.toggle('open')
}
