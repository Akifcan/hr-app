import {LitElement, html, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {dbService} from '../services/indexed-db';
import i18n from '../i18n';

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

  private async handleSubmit(e: Event) {
    e.preventDefault();
    try {
      // Initialize DB first
      await dbService.initDB();
      await dbService.addEmployee(this.formData);
      alert(i18n.t('addForm.saveSuccess'));
      window.location.href = '/';
    } catch (error) {
      console.error('Error saving employee:', error);
      alert(i18n.t('addForm.saveError'));
    }
  }

  private handleCancel() {
    window.location.href = '/';
  }

  render() {
    return html`
      <div class="form-container">
        <h1 class="form-title">${i18n.t('addForm.title')}</h1>

        <form @submit=${this.handleSubmit}>
          <div class="form-grid">
            <div class="form-field">
              <label class="form-label" for="firstName">${i18n.t('addForm.firstName')}</label>
              <input
                type="text"
                id="firstName"
                class="form-input"
                .value=${this.formData.firstName}
                @input=${(e: Event) => this.handleInputChange('firstName', (e.target as HTMLInputElement).value)}
                required
                maxlength="100"
              />
            </div>

            <div class="form-field">
              <label class="form-label" for="lastName">${i18n.t('addForm.lastName')}</label>
              <input
                type="text"
                id="lastName"
                class="form-input"
                .value=${this.formData.lastName}
                @input=${(e: Event) => this.handleInputChange('lastName', (e.target as HTMLInputElement).value)}
                required
                maxlength="100"
              />
            </div>

            <div class="form-field">
              <label class="form-label" for="dateOfEmployment">${i18n.t('addForm.dateOfEmployment')}</label>
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
              <label class="form-label" for="dateOfBirth">${i18n.t('addForm.dateOfBirth')}</label>
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
              <label class="form-label" for="phone">${i18n.t('addForm.phone')}</label>
              <input
                type="tel"
                id="phone"
                class="form-input"
                .value=${this.formData.phone}
                @input=${(e: Event) => this.handleInputChange('phone', (e.target as HTMLInputElement).value)}
                required
                maxlength="100"
              />
            </div>

            <div class="form-field">
              <label class="form-label" for="email">${i18n.t('addForm.email')}</label>
              <input
                type="email"
                id="email"
                class="form-input"
                .value=${this.formData.email}
                @input=${(e: Event) => this.handleInputChange('email', (e.target as HTMLInputElement).value)}
                required
                maxlength="100"
              />
            </div>

            <div class="form-field">
              <label class="form-label" for="department">${i18n.t('addForm.department')}</label>
              <select
                id="department"
                class="form-select"
                .value=${this.formData.department}
                @change=${(e: Event) => this.handleInputChange('department', (e.target as HTMLSelectElement).value)}
                required
              >
                <option value="">${i18n.t('addForm.pleaseSelect')}</option>
                <option value="Analytics">Analytics</option>
                <option value="Tech">Tech</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Developer">Developer</option>
                <option value="Finance">Finance</option>
                <option value="Sales">Sales</option>
              </select>
            </div>

            <div class="form-field">
              <label class="form-label" for="position">${i18n.t('addForm.position')}</label>
              <select
                id="position"
                class="form-select"
                .value=${this.formData.position}
                @change=${(e: Event) => this.handleInputChange('position', (e.target as HTMLSelectElement).value)}
                required
              >
                <option value="">${i18n.t('addForm.pleaseSelect')}</option>
                <option value="HR Manager">HR Manager</option>
                <option value="Accountant">Accountant</option>
                <option value="Marketing Specialist">Marketing Specialist</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
                <option value="Sales Manager">Sales Manager</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Recruitment Specialist">Recruitment Specialist</option>
                <option value="Financial Analyst">Financial Analyst</option>
                <option value="Content Writer">Content Writer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Sales Representative">Sales Representative</option>
                <option value="QA Engineer">QA Engineer</option>
                <option value="HR Coordinator">HR Coordinator</option>
                <option value="Finance Manager">Finance Manager</option>
                <option value="Digital Marketing Manager">Digital Marketing Manager</option>
                <option value="System Administrator">System Administrator</option>
                <option value="Business Development Manager">Business Development Manager</option>
                <option value="Tech Lead">Tech Lead</option>
                <option value="Training Specialist">Training Specialist</option>
                <option value="Budget Analyst">Budget Analyst</option>
                <option value="Brand Manager">Brand Manager</option>
                <option value="Mobile Developer">Mobile Developer</option>
                <option value="Account Manager">Account Manager</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Payroll Specialist">Payroll Specialist</option>
                <option value="Tax Specialist">Tax Specialist</option>
                <option value="Social Media Manager">Social Media Manager</option>
                <option value="Security Engineer">Security Engineer</option>
                <option value="Customer Success Manager">Customer Success Manager</option>
                <option value="Medior">Medior</option>
              </select>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-save">
              ${i18n.t('addForm.save')}
            </button>
            <button type="button" class="btn btn-cancel" @click=${this.handleCancel}>
              ${i18n.t('addForm.cancel')}
            </button>
          </div>
        </form>
      </div>
    `;
  }
}
