document.addEventListener('DOMContentLoaded', function(){
    const inputEmail = document.querySelector('#email')
    const inputAsunto = document.querySelector('#asunto')
    const inputMensaje = document.querySelector('#mensaje')
    const formulario = document.querySelector('#formulario')

    inputEmail.addEventListener('blur', validar)

    inputAsunto.addEventListener('blur', validar)

    inputMensaje.addEventListener('blur', validar)

    function validar(e){
        if(e.target.value.trim() === ''){
            const posicion = e.target.parentElement
            mostrarAlerta(`el campo ${e.target.id} esta vacio`, posicion)
        }else{
            console.log('hay algo')
        }
    }

    function mostrarAlerta(mensaje, posicion){
        const alerta = document.createElement('P')
        alerta.textContent = mensaje
        alerta.classList.add('bg-red-600','text-white','p-2', 'text-center')
        posicion.appendChild(alerta)
      
    }
















})