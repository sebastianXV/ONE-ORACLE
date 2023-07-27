import { clientServices } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]")



const obtenerInformacion = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    clientServices.detalleCliente(id).then(perfil => console.log(perfil));

    if (id == null) {
        window.location.href = "error.html"
    }
    const nombre = document.querySelector("[data-nombre]");
    const email = document.querySelector("[data-email]");

    try{
        const perfil = await clientServices.detalleCliente(id)
        console.log(perfil)

        if(perfil.nombre && perfil.email){
            nombre.value = perfil.nombre;
            email.value = perfil.email;
        }
        else{
            throw new Error();
        }
    }
    catch(error){
        console.log("Catch Error", error)
        alert("Ocurrio un error")
        window.location.href = "error.html"
    }



};

obtenerInformacion();


formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    const nombre = document.querySelector("[data-nombre]").value;
    const email = document.querySelector("[data-email]").value;

    clientServices.actualizarCLiente(nombre, email, id).then(() => {
        window.location.href = "edicion_concluida.html"
    });
});