import type { SimpleGreeting } from "../components/demo";

declare global {
  interface HTMLElementTagNameMap {
    "simple-greeting": SimpleGreeting;
  }
}