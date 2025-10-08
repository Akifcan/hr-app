import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
      color: blue;
    }
  `;

  // Declare reactive properties
  @property()
  name?: string = 'World';

  constructor() {
    super();
    this.name = 'akif';
  }

  private _setName() {
    this.name = 'asdfasdf'
  }

  // Render the UI as a function of component state
  render() {
    return html`<div>
      <button @click="${this._setName}">asdfasdf</button>
      <p>Helloads, ${this.name}!</p>
    </div>`;
  }
}