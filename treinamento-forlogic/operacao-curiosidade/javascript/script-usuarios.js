let menu = document.querySelector('.bx-menu')
let navbar = document.querySelector('.nav-header')

menu.onclick = () => {
    menu.classList.toggle('bx-x')
    navbar.classList.toggle('open')
}