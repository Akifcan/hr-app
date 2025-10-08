import {LitElement, html, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';

@customElement('employee-form')
export class EmployeeForm extends LitElement {
  @state()
  private formData = {
    firstName: '',
    lastName: '',
    dateOfEmployment: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    department: '',
    position: ''
  };

  static styles = css`
    :host {
      display: block;
    }

    .form-container {
      max-width: 1300px;
      width: 90%;
      margin: 2rem auto;
    }

    .form-title {
      color: var(--ing-primary-color, #FF6600);
      font-size: 2rem;
      font-weight: 500;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-bottom: 3rem;
    }

    @media (max-width: 1024px) {
      .form-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 640px) {
      .form-grid {
        grid-template-columns: 1fr;
      }
    }

    .form-field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-label {
      color: var(--ing-oxford-blue);
      font-size: 0.875rem;
      font-weight: 400;
    }

    .form-input,
    .form-select {
      padding: 0.75rem;
      border: 1px solid #dedede;
      border-radius: 0.25rem;
      font-size: 1rem;
      font-family: inherit;
      background-color: white;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
    }

    .form-select {
      background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 0.75rem center;
      padding-right: 2.5rem;
    }

    .form-input:focus,
    .form-select:focus {
      outline: none;
      border-color: var(--ing-primary-color, #FF6600);
    }

    .date-input-wrapper {
      position: relative;
    }

    .date-input-wrapper input[type="date"] {
      width: 100%;
    }

    .date-input-wrapper input[type="date"]::-webkit-calendar-picker-indicator {
      position: absolute;
      right: 0.75rem;
      cursor: pointer;
      color: var(--ing-primary-color, #FF6600);
    }

    form {
      background: white;
      padding: 1rem;
      padding-block-start: 2rem;
      padding-block-end: 4rem;
      min-height: 60vh;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 2rem;
    }

    .btn {
      padding: 0.75rem 3rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: opacity 0.2s;
      border: none;
    }

    .btn:hover {
      opacity: 0.8;
    }

    .btn-save {
      background-color: var(--ing-primary-color, #FF6600);
      color: white;
    }

    .btn-cancel {
      background-color: white;
      color: var(--ing-oxford-blue, #091C5A);
      border: 1px solid var(--ing-oxford-blue, #091C5A);
    }

    input[type="date"]{
      width: 92% !important;
    }
  `;

  private handleInputChange(field: string, value: string) {
    this.formData = {
      ...this.formData,
      [field]: value
    };
  }

  private handleSave() {
    console.log('Form data:', this.formData);
    // TODO: Save to IndexedDB
  }

  private handleCancel() {
    window.location.href = '/';
  }

  render() {
    return html`
      <div class="form-container">
        <h1 class="form-title">Add Employee</h1>

        <form @submit=${(e: Event) => e.preventDefault()}>
          <div class="form-grid">
            <div class="form-field">
              <label class="form-label" for="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                class="form-input"
                .value=${this.formData.firstName}
                @input=${(e: Event) => this.handleInputChange('firstName', (e.target as HTMLInputElement).value)}
                required
              />
            </div>

            <div class="form-field">
              <label class="form-label" for="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                class="form-input"
                .value=${this.formData.lastName}
                @input=${(e: Event) => this.handleInputChange('lastName', (e.target as HTMLInputElement).value)}
                required
              />
            </div>

            <div class="form-field">
              <label class="form-label" for="dateOfEmployment">Date of Employment</label>
              <div class="date-input-wrapper">
                <input
                  type="date"
                  id="dateOfEmployment"
                  class="form-input"
                  .value=${this.formData.dateOfEmployment}
                  @input=${(e: Event) => this.handleInputChange('dateOfEmployment', (e.target as HTMLInputElement).value)}
                  required
                />
              </div>
            </div>

            <div class="form-field">
              <label class="form-label" for="dateOfBirth">Date of Birth</label>
              <div class="date-input-wrapper">
                <input
                  type="date"
                  id="dateOfBirth"
                  class="form-input"
                  .value=${this.formData.dateOfBirth}
                  @input=${(e: Event) => this.handleInputChange('dateOfBirth', (e.target as HTMLInputElement).value)}
                  required
                />
              </div>
            </div>

            <div class="form-field">
              <label class="form-label" for="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                class="form-input"
                .value=${this.formData.phone}
                @input=${(e: Event) => this.handleInputChange('phone', (e.target as HTMLInputElement).value)}
                required
              />
            </div>

            <div class="form-field">
              <label class="form-label" for="email">Email</label>
              <input
                type="email"
                id="email"
                class="form-input"
                .value=${this.formData.email}
                @input=${(e: Event) => this.handleInputChange('email', (e.target as HTMLInputElement).value)}
                required
              />
            </div>

            <div class="form-field">
              <label class="form-label" for="department">Department</label>
              <input
                type="text"
                id="department"
                class="form-input"
                .value=${this.formData.department}
                @input=${(e: Event) => this.handleInputChange('department', (e.target as HTMLInputElement).value)}
                required
              />
            </div>

            <div class="form-field">
              <label class="form-label" for="position">Position</label>
              <select
                id="position"
                class="form-select"
                .value=${this.formData.position}
                @change=${(e: Event) => this.handleInputChange('position', (e.target as HTMLSelectElement).value)}
                required
              >
                <option value="">Please Select</option>
                <option value="Junior">Junior</option>
                <option value="Medior">Medior</option>
                <option value="Senior">Senior</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-save" @click=${this.handleSave}>
              Save
            </button>
            <button type="button" class="btn btn-cancel" @click=${this.handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    `;
  }
}
