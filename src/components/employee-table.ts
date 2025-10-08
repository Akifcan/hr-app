import {LitElement, html, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {dbService} from '../services/indexedDB';
import './delete-dialog';

@customElement('employee-table')
export class EmployeeTable extends LitElement {
  @state()
  private employees: Employee[] = [];

  @state()
  private selectedEmployee: Employee | null = null;
  static styles = css`
    :host {
      display: block;
    }

    .table-wrapper {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    table {
      background-color: white;
      padding: 1rem;
      border-radius: .4rem;
      width: 100%;
      min-width: 800px;
      margin-block-start: 1rem;
      border-collapse: collapse;
      overflow: hidden;
    }

    td, thead {
      border-bottom: 1px solid #dedede;
    }

    th {
      color: var(--ing-primary-color, #FF6600);
      font-weight: 500;
      text-align: start;
      height: 60px;
    }

    tr {
      text-align: start;
    }

    td {
      height: 60px;
    }

    td, th {
      padding-inline-start: 1rem;
      padding-inline-end: .3rem;
      white-space: nowrap;
    }

    input[type="checkbox"] {
      width: 30px;
      height: 30px;
      cursor: pointer;
    }

    .action-button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      padding: 4px;
    }

    .action-button:hover {
      opacity: 0.7;
    }

    tbody tr:hover {
      background-color: #fafafa;
    }
  `;

  async connectedCallback() {
    super.connectedCallback();
    await this.loadEmployees();
  }

  async loadEmployees() {
    try {
      this.employees = await dbService.getAllEmployees();
    } catch (error) {
      console.error('Error loading employees:', error);
    }
  }

  private handleDeleteClick(employee: Employee) {
    this.selectedEmployee = employee;
    const dialog = this.shadowRoot?.querySelector('delete-dialog') as any;
    dialog?.open();
  }

  render() {
    const employeeName = this.selectedEmployee
      ? `${this.selectedEmployee.firstName} ${this.selectedEmployee.lastName}`
      : '';

    return html`
      <delete-dialog .employeeName="${employeeName}"></delete-dialog>
      <div class="table-wrapper">
        <table>
          <thead>
            <th>
              <input type="checkbox">
            </th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Employment</th>
            <th>Date of Birth</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Actions</th>
          </thead>
          <tbody>
            ${this.employees.map(employee => this.renderRow(employee))}
          </tbody>
        </table>
      </div>
    `;
  }

  renderRow(employee: Employee) {
    return html`
      <tr>
        <td>
          <input type="checkbox">
        </td>
        <td>${employee.firstName}</td>
        <td>${employee.lastName}</td>
        <td>${employee.dateOfEmployment}</td>
        <td>${employee.dateOfBirth}</td>
        <td>${employee.phone}</td>
        <td>${employee.email}</td>
        <td>${employee.department}</td>
        <td>${employee.position}</td>
        <td>
          <button class="action-button" title="Edit this record" aria-label="Edit this record">
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <g id="Complete">
                <g id="edit">
                  <g>
                    <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke="#FF6600"
                      stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                    <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke="#FF6600"
                      stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                  </g>
                </g>
              </g>
            </svg>
          </button>
          <button class="action-button remove-button" @click=${() => this.handleDeleteClick(employee)} title="Remove this record" aria-label="Remove this record">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.75 6.16667C2.75 5.70644 3.09538 5.33335 3.52143 5.33335L6.18567 5.3329C6.71502 5.31841 7.18202 4.95482 7.36214 4.41691C7.36688 4.40277 7.37232 4.38532 7.39185 4.32203L7.50665 3.94993C7.5769 3.72179 7.6381 3.52303 7.72375 3.34536C8.06209 2.64349 8.68808 2.1561 9.41147 2.03132C9.59457 1.99973 9.78848 1.99987 10.0111 2.00002H13.4891C13.7117 1.99987 13.9056 1.99973 14.0887 2.03132C14.8121 2.1561 15.4381 2.64349 15.7764 3.34536C15.8621 3.52303 15.9233 3.72179 15.9935 3.94993L16.1083 4.32203C16.1279 4.38532 16.1333 4.40277 16.138 4.41691C16.3182 4.95482 16.8778 5.31886 17.4071 5.33335H19.9786C20.4046 5.33335 20.75 5.70644 20.75 6.16667C20.75 6.62691 20.4046 7 19.9786 7H3.52143C3.09538 7 2.75 6.62691 2.75 6.16667Z"
                fill="#FF6600" />
              <path
                d="M11.6068 21.9998H12.3937C15.1012 21.9998 16.4549 21.9998 17.3351 21.1366C18.2153 20.2734 18.3054 18.8575 18.4855 16.0256L18.745 11.945C18.8427 10.4085 18.8916 9.6402 18.45 9.15335C18.0084 8.6665 17.2628 8.6665 15.7714 8.6665H8.22905C6.73771 8.6665 5.99204 8.6665 5.55047 9.15335C5.10891 9.6402 5.15777 10.4085 5.25549 11.945L5.515 16.0256C5.6951 18.8575 5.78515 20.2734 6.66534 21.1366C7.54553 21.9998 8.89927 21.9998 11.6068 21.9998Z"
                fill="#FF6600" />
            </svg>
          </button>
        </td>
      </tr>
    `;
  }
}
