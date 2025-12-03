import "./componentes/perfilFoto.js";
import "./componentes/perfilCampoTexto.js";
import "./componentes/perfilCampoParrafo.js";
import "./componentes/iconoEditar.js";
import "./componentes/iconoPassword.js";


class EditarPerfil extends HTMLElement {

  connectedCallback() {
    this.tipo = this.getAttribute("tipo") || "alumno";
    this.modoEdicion = false;
    this.cargarDatos();
    this.render();
    this.init();
  }

  cargarDatos() {
    this.datos = this.tipo === "maestro"
      ? {
          nombre: "Antonio Nuevo Leon",
          correo: "antonio@mindcode.com",
          ubicacion: "Sonora, México",
          perfil: "Mentor apasionado por enseñar programación."
        }
      : {
          nombre: "Josefino Huerta Cabrera",
          correo: "josefino@mindcode.com",
          ubicacion: "Sonora, México",
          perfil: "Estudiante interesado en desarrollo web."
        };
  }

  render() {
    const ed = this.modoEdicion ? "true" : "false";

    this.innerHTML = `
      <div class="min-h-screen px-6 py-10 sm:px-20 font-sans bg-white">

        <h1 class="text-3xl font-light text-black mb-10">Editar Perfil</h1>

        <div class="flex flex-col md:flex-row gap-10">

          <perfil-foto tipo="${this.tipo}"></perfil-foto>

          <div class="space-y-6">

            <perfil-campo-texto label="Nombre" valor="${this.datos.nombre}" editable="${ed}"></perfil-campo-texto>
            <perfil-campo-texto label="Correo" valor="${this.datos.correo}" editable="${ed}"></perfil-campo-texto>
            <perfil-campo-texto label="Ubicación" valor="${this.datos.ubicacion}" editable="${ed}"></perfil-campo-texto>

            <div>
  <p class="text-sm text-gray-700 mb-1">Contraseña</p>

  <div class="flex items-center gap-2 bg-[#F5F7FA] rounded-lg px-3 py-2 w-fit">
    <input id="passInput"
           type="password"
           value="*************"
           class="bg-transparent outline-none text-gray-900" disabled>

    <icono-password id="togglePass"></icono-password>
  </div>
</div>

            <perfil-campo-parrafo label="Perfil" valor="${this.datos.perfil}" editable="${ed}"></perfil-campo-parrafo>

          </div>
        </div>

        <!-- Botón de edición flotante -->
        <button id="btnEdit"
          class="fixed bottom-10 right-10 bg-[#2A6BBF] text-white rounded-full shadow-lg p-4">
          <icono-editar></icono-editar>
        </button>
      </div>`;
  }

  init() {
    this.querySelector("#btnEdit").addEventListener("click", () => {
      if (!this.modoEdicion) {
        this.modoEdicion = true;
        this.render();
        this.init();
      } else {
        this.guardarCambios();
      }
    });
  }

  guardarCambios() {
    const campos = this.querySelectorAll("perfil-campo-texto input");
    const perfilTxt = this.querySelector("perfil-campo-parrafo textarea");

    this.datos.nombre = campos[0].value;
    this.datos.correo = campos[1].value;
    this.datos.ubicacion = campos[2].value;
    this.datos.perfil = perfilTxt.value;

    // Bloquear edición otra vez
    this.modoEdicion = false;

    this.mostrarToast("¡Perfil actualizado correctamente!");
    this.render();
    this.init();
  }

  mostrarToast(msg) {
    const div = document.createElement("div");
    div.className = `
      fixed bottom-5 left-1/2 -translate-x-1/2 bg-[#2A6BBF]
      text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in
    `;
    div.textContent = msg;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 2000);
  }
}

customElements.define("editar-perfil", EditarPerfil);
export default EditarPerfil;
