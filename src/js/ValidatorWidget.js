import getLogs from "./logsBox";
import moonAlgorithm from "./moonAlgorithm";

export default class ValidatorWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.logs = getLogs();

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  renderLogs() {
    const cards = document.createElement("div");
    cards.classList.add("cards");
    this.parentEl.appendChild(cards);

    for (let i = 0; i < this.logs.length; i++) {
      const cardsItem = document.createElement("div");
      cardsItem.classList.add("cards-item");
      cardsItem.classList.add(this.logs[i]);
      cards.appendChild(cardsItem);
    }
  }

  renderForm() {
    const form = document.createElement("form");
    form.classList.add("validator-widget-form");
    this.parentEl.appendChild(form);

    const input = document.createElement("input");
    input.classList.add("validator-widget-input");
    input.type = "text";
    form.appendChild(input);

    const crossBtn = document.createElement("span");
    crossBtn.classList.add("cross-btn");
    crossBtn.classList.add("hidden");
    crossBtn.innerHTML = "&#x2716;";
    form.appendChild(crossBtn);

    const button = document.createElement("button");
    button.classList.add("validator-widget-button");
    button.textContent = "Click to Validate";
    form.appendChild(button);

    const errorPanel = document.createElement("div");
    errorPanel.classList.add("error-panel");
    this.parentEl.appendChild(errorPanel);
  }

  bindToDOM() {
    this.renderLogs();
    this.renderForm();

    const form = document.querySelector(".validator-widget-form");
    form.addEventListener("submit", this.onSubmit);
    form.addEventListener("input", this.onChange);

    const crossBtn = document.querySelector(".cross-btn");
    crossBtn.addEventListener("click", this.onClick);
  }

  onSubmit(e) {
    e.preventDefault();
    const value = document.querySelector(".validator-widget-input").value;

    if (moonAlgorithm(value)) {
      this.showPaymentSystem(value);
    } else {
      this.resetPaymentSystem();
      this.widgetError();
    }
  }

  onChange() {
    const value = document.querySelector(".validator-widget-input").value;
    const crossBtn = document.querySelector(".cross-btn");
    if (value) {
      crossBtn.classList.remove("hidden");
    } else {
      crossBtn.classList.add("hidden");
    }
  }

  onClick() {
    document.querySelector(".validator-widget-input").value = "";
    this.onChange();
    this.resetPaymentSystem();
  }

  showPaymentSystem(number) {
    const cards = {
      2: "mir",
      3: "amex",
      4: "visa",
      5: "mastercard",
    };

    const cardsItem = Array.from(document.querySelectorAll(".cards-item"));
    this.resetPaymentSystem();
    cardsItem.forEach((item) => {
      if (!item.classList.contains(cards[number[0]])) {
        item.classList.add("grayscale");
      }
    });
  }

  resetPaymentSystem() {
    const cardsItem = Array.from(document.querySelectorAll(".cards-item"));
    cardsItem.forEach((item) => item.classList.remove("grayscale"));
  }

  widgetError() {
    const errorPanel = document.querySelector(".error-panel");
    errorPanel.textContent = "Invalid card number";

    setTimeout(() => {
      errorPanel.textContent = "";
    }, 3000);
  }
}
