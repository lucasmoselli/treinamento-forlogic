const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('senha');
var emailValido = false;
var senhaValida = false;
var nome = ""

let nomeLogado = JSON.parse(localStorage.getItem('nomelogado') || '[]')
let listaUsuarios = JSON.parse(localStorage.getItem('listausuario') || '[]')



form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
    logar()
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
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        for(var i = 0; i < listaUsuarios.length; i++){
            if(emailValue == listaUsuarios[i].emailCad){
                setSuccess(email)
                break;
            } else setError(email,'Esse email nao esta cadastrado');
        }
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Password must be at least 8 character.')
    } else {
        for(var i = 0; i < listaUsuarios.length; i++) {
            console.log(listaUsuarios[i].nomeCompletoCad)
            if((emailValue == listaUsuarios[i].emailCad) && (passwordValue == listaUsuarios[i].senhaCad)){
                setSuccess(password)
                emailValido = true;
                senhaValida = true;
                nome = listaUsuarios[i].nomeCompletoCad
                break;
            } else {
                setError(password, 'Senha errada!')
            }
        }
    }

};


function logar() {
    if (emailValido && senhaValida) {
        // Certifique-se de que a chave "nomelogado" seja removida
        localStorage.removeItem("nomelogado");

        // Em seguida, adicione os dados desejados à chave "nomelogado"
        const nomeLogado = {
            nomeCompleto: nome
        };

        // Armazene nomeLogado no Local Storage
        localStorage.setItem('nomelogado', JSON.stringify(nomeLogado));

        console.log(nomeLogado);
        console.log(listaUsuarios);
        setTimeout(() => {
            window.location.href = "home.html";
        }, 3000);
    }
}
