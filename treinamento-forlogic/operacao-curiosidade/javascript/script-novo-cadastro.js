let menu = document.querySelector('.bx-menu')
let navbar = document.querySelector('.nav-header')
let perfilHeader = document.getElementById('perfil')
let nome = document.getElementById('nome')
let email = document.getElementById('email')
let idade = document.getElementById('idade')
let endereco = document.getElementById('endereco')
let outras = document.getElementById('outras')
let interesses = document.getElementById('interesses')
let sentimentos = document.getElementById('sentimentos')
let valores = document.getElementById('valores')
let ativo = document.getElementById('checkbox')
const form = document.getElementById('form');

var nomeValido = false;
var emailValido = false;

const checkboxHelper = checkbox => {
	const output = checkbox.checked ? true : false
    checkbox.value = output;
	console.log(output) // 1 || 0
}

let listaCadastrados = JSON.parse(localStorage.getItem("listacadastrados") || '[]')


let nomesLogado = JSON.parse(localStorage.getItem('nomelogado') || '[]')

var nomeHeader = nomesLogado.nomeCompleto
console.log(nome)

perfilHeader.innerHTML = `<div class="fakeimg"></div>
                        <p>${nomeHeader}</p>
                        <a href="login.html">Sair</a>
                        `
menu.onclick = () => {
    menu.classList.toggle('bx-x')
    navbar.classList.toggle('open')
}

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();

    if (nomeValido && emailValido) {
        console.log('teste')
        cadastrar()
        setTimeout(() => {
            window.location.href = "./cadastros.html"
        }, 3000)
    }
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const validateInputs = () => {
    const usernameValue = nome.value.trim();
    const emailValue = email.value.trim();
    const idadeValue = idade.value.trim();
    const enderecoValue = endereco.value.trim();
    const outrasValue = outras.value.trim();
    const interessesValue = interesses.value;
    const sentimentosValue = sentimentos.value.trim();
    const valoresValue = valores.value.trim();

    console.log()

    if (usernameValue === '') {
        setError(nome, 'Nome é um campo obrigatório!');
    } else {
        setSuccess(nome);
        nomeValido = true
    }

    console.log(listaCadastrados)
    if (emailValue === '') {
        setError(email, 'E-mail é um campo obrigatório!');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Digite um e-mail válido!');
    } else {
        for (var i = 0; i < listaCadastrados.length; i++) {
            if (listaCadastrados.length == 0) {
                setSuccess(email)
                emailValido = true
            }

            else if (emailValue == listaCadastrados[i].emailCad) {
                setError(email, 'Esse email já esta cadastrado!')
                break;
            }
            else {
                setSuccess(email)
                emailValido = true
            }
        }
    }
    if (idadeValue === '') {
        setError(idade, 'Idade é um campo obrigatório!');
    } else if (idadeValue.value > 18 && idadeValue.value < 100) {
        setError(idade, 'Idade entre 18 e 100 anos!')
    } else {
        setSuccess(idade);
    }

    if (enderecoValue === '') {
        setError(endereco, 'Endereço é um campo obrigatório!');
    } else {
        setSuccess(endereco);
    }

    if (outrasValue === '') {
        setError(outras, 'Outras informações é um campo obrigatório!');
    } else {
        setSuccess(outras);
    }

    if (interessesValue === '') {
        setError(interesses, 'Interesses é um campo obrigatório!');
    } else {
        setSuccess(interesses);
    }

    if (sentimentosValue === '') {
        console.log(sentimentosValue === '')
        setError(sentimentos, 'Sentimentos é um campo obrigatório!');
    } else {
        setSuccess(sentimentos);
    }

    if (valoresValue === '') {
        setError(valores, 'Valores é um campo obrigatório!');
    } else {
        setSuccess(valores);
    }
};


function cadastrar() {

    listaCadastrados.push({
        nomeCompletoCad: nome.value,
        emailCad: email.value,
        idadeCad: idade.value,
        enderecoCad: endereco.value,
        outrasCad: outras.value,
        interessesCad: interesses.value,
        sentimentosCad: sentimentos.value,
        valoresCad: valores.value,
        ativoCad: ativo.value

    })

    localStorage.setItem('listacadastrados', JSON.stringify(listaCadastrados))

}
