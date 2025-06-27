import { modalContainer } from "./main.js";

export function showModal() {
  modalContainer.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

export function closeModal() {
  modalContainer.classList.add("hidden");
  document.body.style.overflow = "";
}