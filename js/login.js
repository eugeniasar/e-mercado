const email = document.getElementById('email')
const password = document.getElementById('password')

function enviarFormulario() { 
    if(email.value === null || email.value === ''){
        alert('Ingresa tu e-mail')
    }
    if(password.value === null || password.value === ''){
        alert('Ingresa tu contraseña')
    } else {
        localStorage.setItem("user", email.value)
        window.location.href = "portada.html";
    }
}

document.addEventListener("DOMContentLoaded", function(){
    let nomUsuario = localStorage.getItem("user")
    document.getElementById('usuario').innerHTML = nomUsuario;
})

function cerrarSesion() {
    localStorage.removeItem("user");
}