import {LitElement, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {dbService} from '../services/indexed-db';
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

  private async handleEmployeeDeleted(event: CustomEvent) {
    const { employeeId } = event.detail;
    if (employeeId) {
      await dbService.deleteEmployee(employeeId);
      await this.loadEmployees();
    }
  }

  render() {
    return html`
      <div class="employees-grid-view" @employee-deleted="${this.handleEmployeeDeleted}">
        ${this.employees.map(employee => html`
          <employee-grid-item .employee=${employee}></employee-grid-item>
        `)}
      </div>
    `;
  }
}
