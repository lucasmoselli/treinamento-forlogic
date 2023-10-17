const form = document.getElementById('form');
const username = document.getElementById('nome');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('cPassword');
var nomeValido = false;
var emailValido = false;
var senhaValida = false;
var senha2Valida = false;
var emailCad = ""
var nomeCompletoCad = ""
var senhaCad = ""

let listaUsuarios = JSON.parse(localStorage.getItem("listausuario") || '[]')
//let listaUsuarios = JSON.parse(localStorage.getItem('listaUsuario') || '[]')

form.addEventListener('submit', e => {
    e.preventDefault();


    validateInputs();
    if(nomeValido && emailValido && senhaValida && senha2Valida) {
        console.log(listaUsuarios)
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

console.log('teste')

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if(usernameValue === '') {
        setError(username, 'Username is required');
    } else {
        setSuccess(username);
        nomeValido = true;
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
       
        for(var i = 0; i < listaUsuarios.length; i++){ 
            if (listaUsuarios.length == 0){
                setSuccess(email)
                emailValido = true
                console.log('teste')
            }

            else if(emailValue == listaUsuarios[i].emailCad) {  
                console.log('teste ')
                setError(email, 'Esse email ja esta cadastrado')
                break;
            }
            else{
                setSuccess(email)
                emailValido = true
            }
        }
    }
    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Password must be at least 8 character.')
    } else {
        setSuccess(password);
        senhaValida = true;
    }

    if(password2Value === '') {
        setError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords doesn't match");
    } else {
        setSuccess(password2);
        senha2Valida = true
    }
    
};

console.log(listaUsuarios)

function cadastrar() {

    console.log(listaUsuarios)
    listaUsuarios.push({
        nomeCompletoCad: username.value,
        emailCad: email.value,
        senhaCad: password.value
    })
    
    localStorage.setItem('listausuario', JSON.stringify(listaUsuarios))

}
