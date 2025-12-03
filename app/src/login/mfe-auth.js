/**
 * Web Component para Autenticación
 * Maneja Login y Sign Up con validaciones completas
 */

class MfeAuth extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.state = 'login';
        this.signupStep = 1; // 1 o 2 para el flujo de registro
        this.isLoading = false;
        this.errors = {};
    }

    connectedCallback() {
        this.render();
        this.addEvents();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            :host { 
                display: block; 
                width: 100%; 
                max-width: 380px; 
                font-family: 'Poppins', sans-serif;
            }

            .container {
                padding: 25px 20px;
            }

            .tabs { 
                display: flex; 
                gap: 15px; 
                margin-bottom: 20px; 
                border-bottom: 2px solid #e0e0e0;
            }

            .tab { 
                font-size: 18px; 
                cursor: pointer; 
                color: #999; 
                padding-bottom: 8px; 
                border: none; 
                background: none; 
                font-weight: 600;
                transition: all 0.3s ease;
            }

            .tab:hover {
                color: #1a9d28;
            }

            .tab.active { 
                color: #1a9d28; 
                border-bottom: 3px solid #1a9d28;
                margin-bottom: -2px;
            }

            .input-group { 
                display: flex; 
                flex-direction: column; 
                gap: 12px; 
                margin-bottom: 15px;
            }

            .form-field {
                display: flex;
                flex-direction: column;
                gap: 3px;
            }

            label {
                font-size: 11px;
                color: #666;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.3px;
            }

            input, select { 
                width: 100%; 
                padding: 12px 16px; 
                border-radius: 20px; 
                border: 2px solid #dbeafe;
                background-color: #dbeafe; 
                font-size: 13px; 
                color: #555; 
                outline: none; 
                box-sizing: border-box;
                transition: all 0.3s ease;
                font-family: 'Poppins', sans-serif;
            }

            input:focus, select:focus {
                border-color: #1a9d28;
                background-color: #fff;
            }

            input.error {
                border-color: #e74c3c;
                background-color: #fadbd8;
            }

            .error-message {
                font-size: 11px;
                color: #e74c3c;
                margin-top: 2px;
                display: none;
            }

            .error-message.show {
                display: block;
            }

            .password-requirements {
                background-color: #f5f5f5;
                padding: 8px 10px;
                border-radius: 6px;
                margin-top: 6px;
                font-size: 11px;
                display: none;
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease;
            }

            .password-requirements.show {
                display: block;
                max-height: 150px;
            }

            .requirement {
                display: flex;
                align-items: center;
                margin-bottom: 3px;
                color: #e74c3c;
            }

            .requirement.met {
                color: #27ae60;
            }

            .requirement::before {
                content: '✗ ';
                margin-right: 6px;
                font-weight: bold;
            }

            .requirement.met::before {
                content: '✓ ';
            }

            .links-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 12px;
                margin-bottom: 15px;
                font-size: 12px;
                flex-wrap: wrap;
                gap: 8px;
            }

            .forgot {
                color: #1a9d28;
                text-decoration: none;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .forgot:hover {
                text-decoration: underline;
            }

            .hidden { 
                display: none; 
            }

            .step-indicator {
                display: flex;
                gap: 10px;
                margin-bottom: 15px;
                align-items: center;
            }

            .step {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: #e0e0e0;
                color: #666;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: 600;
                transition: all 0.3s ease;
            }

            .step.active {
                background-color: #1a9d28;
                color: white;
            }

            .step.completed {
                background-color: #27ae60;
                color: white;
            }

            .step-label {
                font-size: 12px;
                color: #666;
                flex: 1;
            }

            button { 
                background-color: #0f7f12; 
                color: white; 
                border: none; 
                padding: 11px 35px; 
                border-radius: 20px; 
                font-size: 14px; 
                cursor: pointer; 
                width: 100%;
                margin-top: 8px; 
                transition: all 0.3s;
                font-weight: 600;
                font-family: 'Poppins', sans-serif;
            }

            button:hover:not(:disabled) { 
                background-color: #0b5c0d;
            }

            button:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }

            .spinner {
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-top: 2px solid white;
                border-radius: 50%;
                width: 12px;
                height: 12px;
                animation: spin 0.8s linear infinite;
                display: inline-block;
                vertical-align: middle;
                margin-right: 6px;
            }

            @keyframes spin {
                to { transform: rotate(360deg); }
            }

            .alert {
                padding: 10px 12px;
                border-radius: 6px;
                margin-bottom: 15px;
                font-size: 13px;
                display: none;
                animation: slideDown 0.3s ease;
            }

            .alert.show {
                display: block;
            }

            .alert.success {
                background-color: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
            }

            .alert.error {
                background-color: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
            }

            .alert.info {
                background-color: #d1ecf1;
                color: #0c5460;
                border: 1px solid #bee5eb;
            }

            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        </style>

        <div class="container">
            <div id="alert" class="alert"></div>

            <div class="tabs">
                <button class="tab active" id="tab-login">Login</button>
                <button class="tab" id="tab-signup">Sign Up</button>
            </div>

            <!-- Indicador de pasos (solo en Sign Up) -->
            <div class="step-indicator hidden" id="step-indicator">
                <div class="step active" id="step-1">1</div>
                <div class="step-label">Datos</div>
                <div class="step" id="step-2">2</div>
                <div class="step-label">Seguridad</div>
            </div>

            <form id="auth-form">
                <div class="input-group">
                    <!-- ===== PASO 1: Datos Básicos ===== -->
                    
                    <!-- Campo Nombre (Solo Sign Up - Paso 1) -->
                    <div class="form-field hidden" id="field-nombre">
                        <label for="nombre">Nombre Completo</label>
                        <input type="text" id="nombre" placeholder="Tu nombre">
                        <div class="error-message" id="error-nombre"></div>
                    </div>

                    <!-- Campo Email (Login + Sign Up) -->
                    <div class="form-field">
                        <label for="email">Correo Electrónico</label>
                        <input type="email" id="email" placeholder="tu@email.com">
                        <div class="error-message" id="error-email"></div>
                    </div>

                    <!-- ===== PASO 2: Seguridad ===== -->

                    <!-- Campo Tipo de Usuario (Solo Sign Up - Paso 2) -->
                    <div class="form-field hidden" id="field-tipo">
                        <label for="tipo">Tipo de Usuario</label>
                        <select id="tipo">
                            <option value="">Selecciona tu rol</option>
                            <option value="Alumno">Alumno</option>
                            <option value="Maestro">Maestro</option>
                        </select>
                        <div class="error-message" id="error-tipo"></div>
                    </div>

                    <!-- Campo Contraseña (visible en Login y Paso 2 del Sign Up) -->
                    <div class="form-field hidden" id="field-password">
                        <label for="password">Contraseña</label>
                        <input type="password" id="password" placeholder="Tu contraseña segura">
                        <div class="error-message" id="error-password"></div>
                        <div id="password-requirements" class="password-requirements">
                            <div class="requirement" id="req-length">Mínimo 8 caracteres</div>
                            <div class="requirement" id="req-upper">Una letra mayúscula</div>
                            <div class="requirement" id="req-lower">Una letra minúscula</div>
                            <div class="requirement" id="req-number">Un número</div>
                            <div class="requirement" id="req-special">Un carácter especial (!@#$%)</div>
                        </div>
                    </div>

                    <!-- Campo Confirmar Contraseña (Solo Sign Up - Paso 2) -->
                    <div class="form-field hidden" id="field-confirm-password">
                        <label for="confirm-password">Confirmar Contraseña</label>
                        <input type="password" id="confirm-password" placeholder="Confirma tu contraseña">
                        <div class="error-message" id="error-confirm-password"></div>
                    </div>
                </div>

                <div class="links-container">
                    <a href="#" class="forgot" id="forgot-link">¿Olvidaste tu contraseña?</a>
                    <span class="forgot hidden" id="login-link">¿Ya tienes una cuenta?</span>
                </div>

                <button type="submit" id="action-btn">Iniciar Sesión</button>
                <button type="button" class="hidden" id="back-btn">Atrás</button>
            </form>
        </div>
        `;
    }

    addEvents() {
        const shadow = this.shadowRoot;
        const tabLogin = shadow.getElementById('tab-login');
        const tabSignup = shadow.getElementById('tab-signup');
        const form = shadow.getElementById('auth-form');

        // Cambio de tabs
        tabLogin.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleState('login');
        });

        tabSignup.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleState('signup');
        });

        // Validación en tiempo real
        const emailInput = shadow.getElementById('email');
        const passwordInput = shadow.getElementById('password');
        const nombreInput = shadow.getElementById('nombre');
        const confirmPasswordInput = shadow.getElementById('confirm-password');

        emailInput?.addEventListener('blur', () => this.validateEmail());
        emailInput?.addEventListener('input', () => this.validateEmail());

        passwordInput?.addEventListener('input', () => this.validatePassword());
        passwordInput?.addEventListener('blur', () => this.validatePassword());

        nombreInput?.addEventListener('blur', () => this.validateNombre());
        nombreInput?.addEventListener('input', () => this.validateNombre());

        confirmPasswordInput?.addEventListener('blur', () => this.validateConfirmPassword());
        confirmPasswordInput?.addEventListener('input', () => this.validateConfirmPassword());

        // Botón volver atrás en Sign Up
        const backBtn = shadow.getElementById('back-btn');
        backBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.signupStep === 2) {
                this.showSignupStep(1);
            }
        });

        const actionBtn = shadow.getElementById('action-btn');
        actionBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            this.state === 'login' ? this.handleLogin() : this.handleSignup();
        });

        // Prevenir submit del formulario
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }

    toggleState(state) {
        const s = this.shadowRoot;
        this.state = state;
        this.signupStep = 1;
        this.errors = {};

        if (state === 'login') {
            s.getElementById('tab-login').classList.add('active');
            s.getElementById('tab-signup').classList.remove('active');
            s.getElementById('step-indicator').classList.add('hidden');
            s.getElementById('field-nombre').classList.add('hidden');
            s.getElementById('field-tipo').classList.add('hidden');
            s.getElementById('field-password').classList.remove('hidden');
            s.getElementById('field-confirm-password').classList.add('hidden');
            s.getElementById('forgot-link').classList.remove('hidden');
            s.getElementById('login-link').classList.add('hidden');
            s.getElementById('action-btn').textContent = "Iniciar Sesión";
            s.getElementById('back-btn').classList.add('hidden');
            s.getElementById('password-requirements').classList.remove('show');
        } else {
            s.getElementById('tab-signup').classList.add('active');
            s.getElementById('tab-login').classList.remove('active');
            s.getElementById('step-indicator').classList.remove('hidden');
            s.getElementById('field-nombre').classList.remove('hidden');
            s.getElementById('field-tipo').classList.add('hidden');
            s.getElementById('field-password').classList.add('hidden');
            s.getElementById('field-confirm-password').classList.add('hidden');
            s.getElementById('forgot-link').classList.add('hidden');
            s.getElementById('login-link').classList.remove('hidden');
            s.getElementById('action-btn').textContent = "Siguiente";
            s.getElementById('back-btn').classList.add('hidden');
            this.showSignupStep(1);
        }

        this.clearForm();
        this.clearAllErrors();
    }

    showSignupStep(step) {
        const s = this.shadowRoot;
        this.signupStep = step;

        if (step === 1) {
            // Mostrar: Nombre + Email
            s.getElementById('field-nombre').classList.remove('hidden');
            s.getElementById('field-tipo').classList.add('hidden');
            s.getElementById('field-password').classList.add('hidden');
            s.getElementById('field-confirm-password').classList.add('hidden');
            s.getElementById('action-btn').textContent = "Siguiente →";
            s.getElementById('back-btn').classList.add('hidden');

            // Actualizar indicador
            s.getElementById('step-1').classList.add('active');
            s.getElementById('step-2').classList.remove('active', 'completed');
        } else if (step === 2) {
            // Mostrar: Tipo + Contraseña + Confirmar
            s.getElementById('field-nombre').classList.add('hidden');
            s.getElementById('field-tipo').classList.remove('hidden');
            s.getElementById('field-password').classList.remove('hidden');
            s.getElementById('field-confirm-password').classList.remove('hidden');
            s.getElementById('action-btn').textContent = "Crear Cuenta";
            s.getElementById('back-btn').classList.remove('hidden');
            s.getElementById('password-requirements').classList.add('show');

            // Actualizar indicador
            s.getElementById('step-1').classList.add('completed');
            s.getElementById('step-1').classList.remove('active');
            s.getElementById('step-2').classList.add('active');
        }

        this.clearAllErrors();
    }

    // VALIDACIONES

    validateEmail() {
        const s = this.shadowRoot;
        const email = s.getElementById('email').value.trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            this.showError('email', 'El correo es requerido');
            return false;
        }

        if (!regex.test(email)) {
            this.showError('email', 'Ingresa un correo válido');
            return false;
        }

        this.hideError('email');
        return true;
    }

    validatePassword() {
        const s = this.shadowRoot;
        const password = s.getElementById('password').value;

        if (!password) {
            this.showError('password', 'La contraseña es requerida');
            return false;
        }

        if (this.state === 'signup') {
            const requirements = this.getPasswordRequirements(password);
            this.updatePasswordRequirements(requirements);

            if (!requirements.all) {
                this.showError('password', 'La contraseña no cumple los requisitos');
                return false;
            }
        } else {
            if (password.length < 6) {
                this.showError('password', 'Mínimo 6 caracteres');
                return false;
            }
        }

        this.hideError('password');
        return true;
    }

    validateNombre() {
        const s = this.shadowRoot;
        const nombre = s.getElementById('nombre').value.trim();

        if (!nombre) {
            this.showError('nombre', 'El nombre es requerido');
            return false;
        }

        if (nombre.length < 3) {
            this.showError('nombre', 'Mínimo 3 caracteres');
            return false;
        }

        if (!/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/.test(nombre)) {
            this.showError('nombre', 'Solo se permiten letras y espacios');
            return false;
        }

        this.hideError('nombre');
        return true;
    }

    validateConfirmPassword() {
        const s = this.shadowRoot;
        const password = s.getElementById('password').value;
        const confirmPassword = s.getElementById('confirm-password').value;

        if (!confirmPassword) {
            this.showError('confirm-password', 'Debes confirmar la contraseña');
            return false;
        }

        if (password !== confirmPassword) {
            this.showError('confirm-password', 'Las contraseñas no coinciden');
            return false;
        }

        this.hideError('confirm-password');
        return true;
    }

    validateTipo() {
        const s = this.shadowRoot;
        const tipo = s.getElementById('tipo').value;

        if (!tipo) {
            this.showError('tipo', 'Debes seleccionar un tipo de usuario');
            return false;
        }

        this.hideError('tipo');
        return true;
    }

    getPasswordRequirements(password) {
        return {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#$%^&*()_+\-=\[\]{};:'",.<>?]/.test(password),
            get all() {
                return this.length && this.uppercase && this.lowercase && this.number && this.special;
            }
        };
    }

    updatePasswordRequirements(requirements) {
        const s = this.shadowRoot;
        s.getElementById('req-length').classList.toggle('met', requirements.length);
        s.getElementById('req-upper').classList.toggle('met', requirements.uppercase);
        s.getElementById('req-lower').classList.toggle('met', requirements.lowercase);
        s.getElementById('req-number').classList.toggle('met', requirements.number);
        s.getElementById('req-special').classList.toggle('met', requirements.special);
    }

    showError(field, message) {
        const s = this.shadowRoot;
        const errorEl = s.getElementById(`error-${field}`);
        const inputEl = s.getElementById(field);

        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('show');
        }

        if (inputEl) {
            inputEl.classList.add('error');
        }

        this.errors[field] = message;
    }

    hideError(field) {
        const s = this.shadowRoot;
        const errorEl = s.getElementById(`error-${field}`);
        const inputEl = s.getElementById(field);

        if (errorEl) {
            errorEl.classList.remove('show');
        }

        if (inputEl) {
            inputEl.classList.remove('error');
        }

        delete this.errors[field];
    }

    clearAllErrors() {
        const s = this.shadowRoot;
        const errorEls = s.querySelectorAll('.error-message');
        const inputs = s.querySelectorAll('input, select');

        errorEls.forEach(el => el.classList.remove('show'));
        inputs.forEach(el => el.classList.remove('error'));
        this.errors = {};
    }

    showAlert(message, type = 'info') {
        const s = this.shadowRoot;
        const alertEl = s.getElementById('alert');
        alertEl.textContent = message;
        alertEl.className = `alert show ${type}`;

        setTimeout(() => {
            alertEl.classList.remove('show');
        }, 5000);
    }

    clearForm() {
        const s = this.shadowRoot;
        s.getElementById('auth-form').reset();
    }

    // HANDLERS

    async handleLogin() {
        if (this.isLoading) return;

        if (!this.validateEmail() || !this.validatePassword()) {
            this.showAlert('Por favor completa todos los campos correctamente', 'error');
            return;
        }

        const s = this.shadowRoot;
        const email = s.getElementById('email').value.trim();
        const password = s.getElementById('password').value;

        this.setLoading(true);

        try {
            const response = await apiClient.login(email, password);

            if (response.success) {
                const token = response.data?.token;

                if (token) {
                    localStorage.setItem('token', token);
                    console.log('Token guardado correctamente');
                } else {
                    console.warn('La respuesta fue exitosa pero no llegó el token');
                }

                this.showAlert('¡Inicio de sesión exitoso!', 'success');

                setTimeout(() => {
                    window.location.href = '/app/src/shell/index.html';
                }, 1500);
            }
        } catch (error) {
            console.error('Login error:', error);
            const message = error.response?.data?.message || error.message || 'Error al iniciar sesión';
            this.showAlert(message, 'error');
        } finally {
            this.setLoading(false);
        }
    }

    async handleSignup() {
        if (this.isLoading) return;

        const s = this.shadowRoot;

        if (this.signupStep === 1) {
            // Validar Step 1: Nombre + Email
            const nombre = s.getElementById('nombre')?.value?.trim();
            const email = s.getElementById('email')?.value?.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!nombre) {
                this.showAlert('El nombre es requerido', 'error');
                return;
            }

            if (nombre.length < 3) {
                this.showAlert('El nombre debe tener al menos 3 caracteres', 'error');
                return;
            }

            if (!email) {
                this.showAlert('El email es requerido', 'error');
                return;
            }

            if (!emailRegex.test(email)) {
                this.showAlert('Email inválido', 'error');
                return;
            }

            console.log('✅ Paso 1 validado, avanzando a Paso 2');
            // Avanzar a Step 2
            this.showSignupStep(2);
        } else if (this.signupStep === 2) {
            // Validar Step 2: Tipo + Contraseña
            const tipo = s.getElementById('tipo')?.value;
            const password = s.getElementById('password')?.value;
            const confirmPassword = s.getElementById('confirm-password')?.value;

            if (!tipo) {
                this.showAlert('Selecciona un tipo de usuario', 'error');
                return;
            }

            if (!password) {
                this.showAlert('La contraseña es requerida', 'error');
                return;
            }

            if (password.length < 8) {
                this.showAlert('La contraseña debe tener al menos 8 caracteres', 'error');
                return;
            }

            if (!confirmPassword) {
                this.showAlert('Debes confirmar la contraseña', 'error');
                return;
            }

            if (password !== confirmPassword) {
                this.showAlert('Las contraseñas no coinciden', 'error');
                return;
            }

            console.log('✅ Paso 2 validado, creando cuenta');
            const nombre = s.getElementById('nombre')?.value?.trim();
            const email = s.getElementById('email')?.value?.trim();
            this.submitSignup(nombre, email, tipo, password);
        }
    }

    async submitSignup(nombre, email, tipo, password) {
        this.setLoading(true);

        try {
            const response = await apiClient.registrar(nombre, email, password, tipo);

            if (response.success) {
                this.showAlert('¡Cuenta creada exitosamente!', 'success');
                setTimeout(() => {
                    window.location.href = '/app/src/shell/index.html';
                }, 1500);
            }
        } catch (error) {
            console.error('Signup error:', error);
            const message = error.data?.message || error.message || 'Error al crear la cuenta';
            this.showAlert(message, 'error');
        } finally {
            this.setLoading(false);
        }
    }

    validateEmailFormat(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showSignupStep(step) {
        const s = this.shadowRoot;
        this.signupStep = step;

        if (step === 1) {
            s.getElementById('field-nombre').classList.remove('hidden');
            s.getElementById('field-tipo').classList.add('hidden');
            s.getElementById('field-password').classList.add('hidden');
            s.getElementById('field-confirm-password').classList.add('hidden');
            s.getElementById('action-btn').textContent = "Siguiente →";
            s.getElementById('back-btn').classList.add('hidden');
            s.getElementById('password-requirements').classList.remove('show');

            s.getElementById('step-1').classList.add('active');
            s.getElementById('step-2').classList.remove('active', 'completed');
        } else if (step === 2) {
            s.getElementById('field-nombre').classList.add('hidden');
            s.getElementById('field-tipo').classList.remove('hidden');
            s.getElementById('field-password').classList.remove('hidden');
            s.getElementById('field-confirm-password').classList.remove('hidden');
            s.getElementById('action-btn').textContent = "Crear Cuenta";
            s.getElementById('back-btn').classList.remove('hidden');
            s.getElementById('password-requirements').classList.add('show');

            s.getElementById('step-1').classList.add('completed');
            s.getElementById('step-1').classList.remove('active');
            s.getElementById('step-2').classList.add('active');
        }
    }

    setLoading(loading) {
        this.isLoading = loading;
        const s = this.shadowRoot;
        const btn = s.getElementById('action-btn');

        if (loading) {
            btn.disabled = true;
            btn.innerHTML = '<div class="spinner"></div>Procesando...';
        } else {
            btn.disabled = false;
            btn.textContent = this.state === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta';
        }
    }
}

customElements.define('mfe-auth', MfeAuth);