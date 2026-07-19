const templateString = `
      <style>
        .modal-container {
          position: fixed;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background-color: rgba(0, 0, 0, 0.2);
          opacity: 0;
        }
        .modal {
          position: relative;
          z-index: 2;
          width: 300px;
          overflow: auto;
          border-radius: 15px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          padding: 20px;
          background-color: #fff;
          opacity: 0;
          transform: scale(0.8);
        }
        .modal-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .modal-content {
        }
        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
        }
        .close:hover,
        .close:focus {
          color: black;
          text-decoration: none;
          cursor: pointer;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.8);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes scaleOut {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(0.8);
          }
        }
      </style>
      <div class="modal-container">
        <div class="overlay">
        </div>
        <div class="modal">
          <span class="close">&times;</span>
          <div class="modal-title">
            <slot name="title"></slot>
          </div>
          <div class="modal-content">
            <slot name="content"></slot>
          </div>
        </div>
      </div>
    `;

class AppModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {}

  open() {
    const template = document.createElement("template");
    template.innerHTML = templateString;
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.querySelector(".modal").style.animation =
      "fadeIn 0.3s forwards, scaleIn 0.3s forwards";
    this.shadowRoot.querySelector(".overlay").style.animation =
      "fadeIn 0.3s forwards";

    const closeButton = this.shadowRoot.querySelector(".close");
    const overlay = this.shadowRoot.querySelector(".overlay");

    closeButton.addEventListener("click", () => {
      this.close();
    });
    overlay.addEventListener("click", () => {
      this.close();
    });

    this.dispatchEvent(new CustomEvent("open"));
  }

  close() {
    const modal = this.shadowRoot.querySelector(".modal");
    modal.style.animation = "fadeOut 0.3s, scaleOut 0.3s";
    const overlay = this.shadowRoot.querySelector(".overlay");
    overlay.style.animation = "fadeOut 0.3s";

    setTimeout(() => {
      this.shadowRoot.innerHTML = "";
      this.dispatchEvent(new CustomEvent("close"));
    }, 300);
  }
}

customElements.define("app-modal", AppModal);

const button = document.getElementById("toggleModal");
const modal = document.querySelector("app-modal");

button.addEventListener("click", () => {
  modal.open();
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    modal.close();
  }
});

modal.addEventListener("open", () => {
  console.log("Modal opened");
});

modal.addEventListener("close", () => {
  console.log("Modal closed");
});
