class MfeAuth extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEvents();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            :host { display: block; width: 100%; max-width: 400px; }
            .tabs { display: flex; gap: 20px; margin-bottom: 30px; }
            .tab { font-size: 24px; cursor: pointer; color: #ccc; padding-bottom: 5px; border: none; background: none; }
            .tab.active { color: #1a9d28; border-bottom: 2px solid #1a9d28; }
            .input-group { display: flex; flex-direction: column; gap: 15px; }
            input { width: 100%; padding: 15px; border-radius: 25px; border: none; background-color: #dbeafe; font-size: 14px; color: #555; outline: none; box-sizing: border-box; }
            .forgot { display: block; margin-top: 15px; color: #1a9d28; text-decoration: none; font-size: 14px; }
            button { background-color: #0f7f12; color: white; border: none; padding: 12px 40px; border-radius: 25px; font-size: 16px; cursor: pointer; margin-top: 30px; transition: background 0.3s; }
            button:hover { background-color: #0b5c0d; color: #ffffffff; }
            .hidden { display: none; }
        </style>

        <div class="container">
            <div class="tabs">
                <button class="tab active" id="tab-login">Login</button>
                <button class="tab" id="tab-signup">Sign Up</button>
            </div>
            <form id="auth-form">
                <div class="input-group">
                    <input type="text" id="username" placeholder="Nombre de usuario" class="hidden">
                    <input type="email" id="email" placeholder="Correo electrónico">
                    <input type="password" id="password" placeholder="Contraseña">
                </div>
                <a href="#" class="forgot" id="forgot-link">¿Olvidaste tu contraseña?</a>
                <span class="forgot hidden" id="login-link">¿Ya tienes una cuenta?</span>
                <button type="submit" id="action-btn">Aceptar</button>
            </form>
        </div>
        `;
    }

    addEvents() {
        const shadow = this.shadowRoot;
        const tabLogin = shadow.getElementById('tab-login');
        const tabSignup = shadow.getElementById('tab-signup');
        
        tabLogin.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleState('login');
        });

        tabSignup.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleState('signup');
        });
    }

    toggleState(state) {
        const s = this.shadowRoot;
        if (state === 'login') {
            s.getElementById('tab-login').classList.add('active');
            s.getElementById('tab-signup').classList.remove('active');
            s.getElementById('username').classList.add('hidden');
            s.getElementById('forgot-link').classList.remove('hidden');
            s.getElementById('login-link').classList.add('hidden');
            s.getElementById('action-btn').textContent = "Aceptar";
        } else {
            s.getElementById('tab-signup').classList.add('active');
            s.getElementById('tab-login').classList.remove('active');
            s.getElementById('username').classList.remove('hidden');
            s.getElementById('forgot-link').classList.add('hidden');
            s.getElementById('login-link').classList.remove('hidden');
            s.getElementById('action-btn').textContent = "Siguiente";
        }
    }
}

customElements.define('mfe-auth', MfeAuth);