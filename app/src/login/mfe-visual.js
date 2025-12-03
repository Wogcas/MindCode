class MfeVisual extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const bgImage = "https://picsum.photos/800/1200"; 

        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }

            .graphic-container {
                width: 100%;
                height: 100%;
                background-color: transparent;
                position: relative;
            }

            .green-circle {
                position: absolute;
                top: 62%; 
                left: 30%; 
                transform: translateY(-50%);
                width: 100vh;
                height: 100vh; 
                background-color: transparent; 
                border-radius: 50%;
                border: 50px solid #0f7f12; 
                box-sizing: border-box;
                z-index: 0;
                display: block;
            }

            .circle-mask {
                position: absolute;
                top: 62%; 
                left: 32%; 
                transform: translateY(-50%);
                width: 90vh; 
                height: 88vh; 
                background-color: transparent; 
                border-radius: 50%;
                border: 12px solid #cfdce6; 
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1; 
            }

            .inner-image {
                width: 100%;
                height: 100%;
                background-image: url('${bgImage}'); 
                background-size: cover;
                background-position: center;
                opacity: 1;
                z-index: 2; 
            }
            
            .overlay {
                position: absolute;
                top: 20px;
                right: 40px;
                color: #0f7f12;
                font-weight: bold;
                font-size: 20px;
                z-index: 10;
                background: rgba(255,255,255,0.8);
                padding: 5px 10px;
                border-radius: 5px;
            }
        </style>

        <div class="graphic-container">
            <div class="overlay">MindCode</div>
            <div class="green-circle"></div>
            <div class="circle-mask">
                <div class="inner-image"></div>
            </div>
        </div>
        `;
    }
}

customElements.define('mfe-visual', MfeVisual);