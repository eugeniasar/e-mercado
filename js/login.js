const email = document.getElementById('email')
const password = document.getElementById('password')

function enviarFormulario() { 
    if(email.value === null || email.value === ''){
        alert('Ingresa tu e-mail')
    }
    if(password.value === null || password.value === ''){
        alert('Ingresa tu contraseña')
    } else {
        redireccionar();
    }
}

function redireccionar() {
    window.location.href = "portada.html"
}
