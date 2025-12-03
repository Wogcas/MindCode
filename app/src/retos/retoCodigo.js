/**
 * Reto de Código - ya con Integrado con Backend
 */

import "./componentes/campoNombre.js";
import "./componentes/campoDescripcion.js";
import "./componentes/editorCodigo.js";
import "./componentes/botonPrimario.js";
import "../componentes/modalAlerta.js";
import RetoAPI from "../api/RetoAPI.js";

class RetoCodigo extends HTMLElement {
  connectedCallback() {
    this.render();
    this.init();
  }

  render() {
    this.innerHTML = `
      <div class="min-h-screen bg-white px-4 py-6 sm:px-20 sm:py-10 font-sans">
        <h1 class="text-3xl font-light text-black mb-10">Detalles del reto</h1>

        <section class="space-y-6">
          <campo-nombre></campo-nombre>
          <campo-descripcion></campo-descripcion>
          <editor-codigo></editor-codigo>

          <div class="flex justify-center gap-6 pt-6">
            <boton-primario id="btnCancelar" texto="Cancelar"></boton-primario>
            <boton-primario id="btnGuardar" texto="Agregar Reto"></boton-primario>
          </div>
        </section>
      </div>
    `;
  }

  init() {
    const btnCancelar = this.querySelector("#btnCancelar button");
    const btnGuardar = this.querySelector("#btnGuardar button");

    btnCancelar.addEventListener("click", () => {
      this.mostrarConfirmacion("¿Seguro? Se perderán los cambios.", () => {
        window.location.href = "index.html?vista=retos";
      });
    });

    btnGuardar.addEventListener("click", async () => {
      await this.guardarReto();
    });
  }

  async guardarReto() {
    const campoNombre = this.querySelector("campo-nombre");
    const campoDescripcion = this.querySelector("campo-descripcion");
    const editorCodigo = this.querySelector("editor-codigo");

    const nombre = campoNombre.getValue();
    const descripcion = campoDescripcion.getValue();
    const codigoInicial = editorCodigo.getCode();

    // Validaciones
    if (!nombre) {
      return this.mostrarAlerta("Por favor ingresa el nombre del reto");
    }
    if (!descripcion) {
      return this.mostrarAlerta("Por favor ingresa la descripción del reto");
    }

    // Estructura del reto según tu backend
    const retoData = {
      titulo: nombre,
      descripcion: descripcion,
      preguntas: [
        {
          contenido: descripcion,
          tipo: "codigo",
          respuestas: [
            {
              contenido: codigoInicial || "// Escribe tu código aquí",
              es_correcta: true
            }
          ]
        }
      ],
      lecciones: []
    };

    try {
      this.mostrarCargando(true);
      
      const resultado = await RetoAPI.crearReto(retoData);
      
      console.log("✅ Reto creado exitosamente:", resultado);

      this.mostrarAlerta("¡Reto guardado correctamente!", () => {
        window.location.href = "index.html?vista=dashboardMaestro";
      });

    } catch (error) {
      console.error("❌ Error al guardar el reto:", error);
      this.mostrarAlerta(`Error: ${error.message}`);
    } finally {
      this.mostrarCargando(false);
    }
  }

  mostrarCargando(cargando) {
    const btn = this.querySelector("#btnGuardar button");
    if (!btn) return;

    btn.disabled = cargando;
    btn.textContent = cargando ? "Guardando..." : "Agregar Reto";
  }

  mostrarAlerta(texto, callback) {
    const modal = document.createElement("modal-alerta");
    modal.setAttribute("mensaje", texto);
    document.body.appendChild(modal);

    modal.addEventListener("aceptar", () => {
      if (callback) callback();
    });
  }

  mostrarConfirmacion(texto, onConfirm) {
    const modal = document.createElement("modal-alerta");
    modal.setAttribute("mensaje", texto);
    modal.setAttribute("tipo", "confirmacion");
    document.body.appendChild(modal);

    modal.addEventListener("aceptar", onConfirm);
  }
}

customElements.define("reto-codigo", RetoCodigo);
export default RetoCodigo;