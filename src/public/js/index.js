const userName = document.querySelector('.userName')
const socket = io()

Swal.fire({
    title: "Ingresa su Nombre",
    input: "text",
    inputAttributes: {
      autocapitalize: "on"
    },
    showCancelButton: false,
    confirmButtonText: "Ingresar",
  }).then((result) => {
    userName.innerHTML = result.value
  });