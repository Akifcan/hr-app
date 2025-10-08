import {LitElement, css, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {dbService} from '../services/indexed-db';
import './employee-grid-item';
import './pagination';

@customElement('employee-grid')
export class EmployeeGrid extends LitElement {

  static styles = css`
  
    .employees-grid-view {
    --grid-count: 1fr;
    display: grid;
    grid-template-columns: var(--grid-count);
    gap: 1rem;
}

@media (min-width: 1000px){
    .employees-grid-view {
        --grid-count: 1fr 1fr;
    }
}
  `

  @state()
  private employees: Employee[] = [];

  @state()
  private allEmployees: Employee[] = [];

  @state()
  private currentPage: number = 1;

  private readonly itemsPerPage: number = 4;

  async connectedCallback() {
    super.connectedCallback();
    await this.loadEmployees();
  }


  async loadEmployees() {
    try {
      this.allEmployees = await dbService.getAllEmployees();
      this.updatePaginatedEmployees();
    } catch (error) {
      console.error('Error loading employees:', error);
    }
  }

  private updatePaginatedEmployees() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.employees = this.allEmployees.slice(startIndex, endIndex);
  }

  private handlePageChange(event: CustomEvent) {
    this.currentPage = event.detail.page;
    this.updatePaginatedEmployees();
  }

  private get totalPages(): number {
    return Math.ceil(this.allEmployees.length / this.itemsPerPage);
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
      <div>
        <div class="employees-grid-view" @employee-deleted="${this.handleEmployeeDeleted}">
          ${this.employees.map(employee => html`
            <employee-grid-item .employee=${employee}></employee-grid-item>
          `)}
        </div>
        <pagination-component
          .currentPage=${this.currentPage}
          .totalPages=${this.totalPages}
          @page-change=${this.handlePageChange}>
        </pagination-component>
      </div>
    `;
  }
}
