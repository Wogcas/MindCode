class SelectorRol extends HTMLElement {

    connectedCallback() {
      this.innerHTML = `
        <style>
          .wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 70vh;
            font-family: 'Poppins', sans-serif;
          }
  
          .roles {
            display: flex;
            gap: 40px;
            margin-bottom: 20px;
          }
  
          .card {
            width: 140px;
            text-align: center;
            padding: 15px;
            border-radius: 15px;
            background: #eef2ff;
            cursor: pointer;
            border: 2px solid transparent;
            transition: 0.2s;
          }
  
          .card img {
            width: 50px;
            opacity: 0.8;
          }
  
          .card:hover,
          .card.selected {
            background: #c7d2fe;
            border-color: #3b82f6;
          }
  
          button {
            background: #128128;
            padding: 10px 30px;
            font-weight: 600;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
          }
  
          button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        </style>
  
        <div class="wrapper">
          <h2>Selecciona tu rol:</h2>
  
          <div class="roles">
            <div class="card" id="alumno">
              <img src="../../assets/images/student.png">
              <p>Alumno</p>
            </div>
  
            <div class="card" id="maestro">
              <img src="../../assets/images/teacher.png">
              <p>Maestro</p>
            </div>
          </div>
  
          <button id="aceptar" disabled>Aceptar</button>
        </div>
      `;
  
      this.iniciar();
    }
  
    iniciar() {
      const alumno = this.querySelector('#alumno');
      const maestro = this.querySelector('#maestro');
      const btn = this.querySelector('#aceptar');
      let seleccionado = null;
  
      alumno.addEventListener("click", () => {
        seleccionado = "Alumno";
        alumno.classList.add("selected");
        maestro.classList.remove("selected");
        btn.disabled = false;
      });
  
      maestro.addEventListener("click", () => {
        seleccionado = "Maestro";
        maestro.classList.add("selected");
        alumno.classList.remove("selected");
        btn.disabled = false;
      });
  
      btn.addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("rolSeleccionado", { detail: seleccionado })
        );
      });
    }
  }
  
  customElements.define("selector-rol", SelectorRol);
  export default SelectorRol;
  