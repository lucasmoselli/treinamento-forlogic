
let menu = document.querySelector('.bx-menu')
let navbar = document.querySelector('.nav-header')
let perfilHeader = document.getElementById('perfil')
let cadastroLista = document.getElementById('cadastro-lista')

let nomesLogado = JSON.parse(localStorage.getItem('nomelogado') || '[]')
let listaCadastrados = JSON.parse(localStorage.getItem("listacadastrados") || '[]')


var nome = nomesLogado.nomeCompleto

perfilHeader.innerHTML = `<div class="fakeimg"></div>
                        <p>${nome}</p>
                        <a href="login.html">Sair</a>
                        `
menu.onclick = () => {
    menu.classList.toggle('bx-x')
    navbar.classList.toggle('open')
}

for (var i = 0; i < listaCadastrados.length; i++) {
    if (listaCadastrados[i].ativoCad == "true"){
        console.log('testee')
        cadastroLista.innerHTML += `<div class="cadastros-value">
                                        <p>${listaCadastrados[i].nomeCompletoCad}</p>
                                        <p>${listaCadastrados[i].emailCad}</p>
                                        <p class = "status-ativo">Ativo</p>
                                    </div>
                                     <hr>`
    } else if (listaCadastrados[i].ativoCad == "false") {
        cadastroLista.innerHTML += `<div class="cadastros-value">
                                        <p>${listaCadastrados[i].nomeCompletoCad}</p>
                                        <p>${listaCadastrados[i].emailCad}</p>
                                        <p class = "status-inativo">Inativo</p>
                                    </div>
                                    <hr>`
    } else {
        cadastroLista.innerHTML += `<div class="cadastros-value">
                                        <p>${listaCadastrados[i].nomeCompletoCad}</p>
                                        <p>${listaCadastrados[i].emailCad}</p>
                                         <p class = "status-ativo">Ativo</p>
                                    </div>
                                    <hr>`
    }
}