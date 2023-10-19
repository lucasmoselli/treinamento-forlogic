const form = document.getElementById('form');
const username = document.getElementById('nome');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('cPassword');
const inputFoto = document.getElementById('input-foto')
const foto = document.getElementById('foto')
var nomeValido = false;
var emailValido = false;
var senhaValida = false;
var senha2Valida = false;
var emailCad = ""
var nomeCompletoCad = ""
var senhaCad = ""
var fotoCad = foto.value

// Foto
inputFoto.onchange = evt => {
    const [file] = inputFoto.files
    if (file) {
        foto.src = URL.createObjectURL(file)
        console.log(foto.src)
    }
}


let listaUsuarios = JSON.parse(localStorage.getItem("listausuario") || '[]')
//let listaUsuarios = JSON.parse(localStorage.getItem('listaUsuario') || '[]')

form.addEventListener('submit', e => {
    e.preventDefault();


    validateInputs();
    if (nomeValido && emailValido && senhaValida && senha2Valida) {
        cadastrar()
        setTimeout(() => {
            window.location.href = "./login.html"
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
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if (usernameValue === '') {
        setError(username, 'Nome é um campo obrigatório!');
    } else {
        setSuccess(username);
        nomeValido = true;
    }

    if (emailValue === '') {
        setError(email, 'Email é um campo obrigatório!');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Digite um e-mail válido!');
    } else {

        for (var i = 0; i < listaUsuarios.length || i <= listaUsuarios.length; i++) {
            if (listaUsuarios.length == 0) {
                setSuccess(email)
                emailValido = true
            }

            else if (emailValue == listaUsuarios[i].emailCad) {
                setError(email, 'Esse email já está cadastrado!')
                break;
            }
            else {
                setSuccess(email)
                emailValido = true
            }
        }
    }
    if (passwordValue === '') {
        setError(password, 'Senha é um campo obrigatório!');
    } else if (passwordValue.length < 8) {
        setError(password, 'A senha precisa de no mínimo de 8 letras!')
    } else {
        setSuccess(password);
        senhaValida = true;
    }

    if (password2Value === '') {
        setError(password2, 'Confirmar senha é um campo obrigatório!');
    } else if (password2Value !== passwordValue) {
        setError(password2, "As senhas não batem!");
    } else {
        setSuccess(password2);
        senha2Valida = true
    }

};

function cadastrar() {

    console.log(listaUsuarios)
    listaUsuarios.push({
        nomeCompletoCad: username.value,
        emailCad: email.value,
        senhaCad: password.value,
        fotoCad: foto.src
    })

    localStorage.setItem('listausuario', JSON.stringify(listaUsuarios))

}
