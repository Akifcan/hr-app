import {LitElement, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {dbService} from '../services/indexedDB';
import './employee-grid-item';

@customElement('employee-grid')
export class EmployeeGrid extends LitElement {

  @state()
  private employees: Employee[] = [];

  async connectedCallback() {
    super.connectedCallback();
    await this.loadEmployees();
  }

   createRenderRoot() {
    return this;
  }


  async loadEmployees() {
    try {
      this.employees = await dbService.getAllEmployees();
    } catch (error) {
      console.error('Error loading employees:', error);
    }
  }

  render() {
    return html`
      <div class="employees-grid-view">
        ${this.employees.map(employee => html`
          <employee-grid-item .employee=${employee}></employee-grid-item>
        `)}
      </div>
    `;
  }
}
