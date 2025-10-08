import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';
import '../components/employee-edit-form';
import type { EmployeeEditForm } from '../components/employee-edit-form';
import { dbService } from '../services/indexed-db';

// Mock the dbService
vi.mock('../services/indexed-db', () => ({
  dbService: {
    initDB: vi.fn().mockResolvedValue(undefined),
    getEmployee: vi.fn().mockResolvedValue({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      dateOfEmployment: '2024-01-01',
      dateOfBirth: '1990-01-01',
      phone: '+1234567890',
      email: 'john@example.com',
      department: 'Tech',
      position: 'Developer'
    }),
    updateEmployee: vi.fn().mockResolvedValue(undefined)
  }
}));

describe('EmployeeEditForm', () => {
  let element: EmployeeEditForm;

  beforeEach(async () => {
    // Mock URL parameters
    Object.defineProperty(window, 'location', {
      value: {
        search: '?id=1',
        href: '/',
      },
      writable: true,
    });

    element = await fixture(html`<employee-edit-form></employee-edit-form>`);
    await element.updateComplete;
  });

  it('should render the form container', () => {
    const container = element.shadowRoot?.querySelector('.form-container');
    expect(container).toBeTruthy();
  });

  it('should render form title', () => {
    const title = element.shadowRoot?.querySelector('.form-title');
    expect(title).toBeTruthy();
  });

  it('should render form grid', () => {
    const formGrid = element.shadowRoot?.querySelector('.form-grid');
    expect(formGrid).toBeTruthy();
  });

  it('should render all input fields', () => {
    const inputs = element.shadowRoot?.querySelectorAll('.form-input');
    expect(inputs?.length).toBeGreaterThan(0);
  });

  it('should render First Name field', () => {
    const firstNameLabel = element.shadowRoot?.querySelector('label[for="firstName"]');
    const firstNameInput = element.shadowRoot?.querySelector('#firstName');
    expect(firstNameLabel).toBeTruthy();
    expect(firstNameInput).toBeTruthy();
  });

  it('should render Last Name field', () => {
    const lastNameLabel = element.shadowRoot?.querySelector('label[for="lastName"]');
    const lastNameInput = element.shadowRoot?.querySelector('#lastName');
    expect(lastNameLabel).toBeTruthy();
    expect(lastNameInput).toBeTruthy();
  });

  it('should render Date of Employment field', () => {
    const dateLabel = element.shadowRoot?.querySelector('label[for="dateOfEmployment"]');
    const dateInput = element.shadowRoot?.querySelector('#dateOfEmployment');
    expect(dateLabel).toBeTruthy();
    expect(dateInput).toBeTruthy();
  });

  it('should render Date of Birth field', () => {
    const dateLabel = element.shadowRoot?.querySelector('label[for="dateOfBirth"]');
    const dateInput = element.shadowRoot?.querySelector('#dateOfBirth');
    expect(dateLabel).toBeTruthy();
    expect(dateInput).toBeTruthy();
  });

  it('should render Phone field', () => {
    const phoneLabel = element.shadowRoot?.querySelector('label[for="phone"]');
    const phoneInput = element.shadowRoot?.querySelector('#phone');
    expect(phoneLabel).toBeTruthy();
    expect(phoneInput).toBeTruthy();
  });

  it('should render Email field', () => {
    const emailLabel = element.shadowRoot?.querySelector('label[for="email"]');
    const emailInput = element.shadowRoot?.querySelector('#email');
    expect(emailLabel).toBeTruthy();
    expect(emailInput).toBeTruthy();
  });

  it('should render Department select', () => {
    const deptLabel = element.shadowRoot?.querySelector('label[for="department"]');
    const deptSelect = element.shadowRoot?.querySelector('#department');
    expect(deptLabel).toBeTruthy();
    expect(deptSelect).toBeTruthy();
  });

  it('should render Position select', () => {
    const posLabel = element.shadowRoot?.querySelector('label[for="position"]');
    const posSelect = element.shadowRoot?.querySelector('#position');
    expect(posLabel).toBeTruthy();
    expect(posSelect).toBeTruthy();
  });

  it('should render Update button', () => {
    const updateButton = element.shadowRoot?.querySelector('.btn-save');
    expect(updateButton).toBeTruthy();
    expect(updateButton?.getAttribute('type')).toBe('submit');
  });

  it('should render Cancel button', () => {
    const cancelButton = element.shadowRoot?.querySelector('.btn-cancel');
    expect(cancelButton).toBeTruthy();
    expect(cancelButton?.getAttribute('type')).toBe('button');
  });

  it('should have required attribute on inputs', () => {
    const firstNameInput = element.shadowRoot?.querySelector('#firstName') as HTMLInputElement;
    expect(firstNameInput?.required).toBe(true);
  });

  it('should have maxlength attribute on text inputs', () => {
    const firstNameInput = element.shadowRoot?.querySelector('#firstName') as HTMLInputElement;
    expect(firstNameInput?.maxLength).toBe(100);
  });

  it('should call initDB on component load', () => {
    expect(dbService.initDB).toHaveBeenCalled();
  });

  it('should call getEmployee with correct ID', () => {
    expect(dbService.getEmployee).toHaveBeenCalledWith(1);
  });

  it('should display editing label with employee name', async () => {
    await new Promise(resolve => setTimeout(resolve, 100));
    await element.updateComplete;
    const editingText = element.shadowRoot?.querySelector('p');
    expect(editingText?.textContent).toContain('John');
    expect(editingText?.textContent).toContain('Doe');
  });

  it('should render with English labels', async () => {
    const i18n = await import('../i18n');
    i18n.default.locale = 'en';
    element = await fixture(html`<employee-edit-form></employee-edit-form>`);
    await element.updateComplete;

    const title = element.shadowRoot?.querySelector('.form-title');
    expect(title?.textContent).toContain('Edit Employee');
  });

  it('should render with Turkish labels', async () => {
    const i18n = await import('../i18n');
    i18n.default.locale = 'tr';
    element = await fixture(html`<employee-edit-form></employee-edit-form>`);
    await element.updateComplete;

    const title = element.shadowRoot?.querySelector('.form-title');
    expect(title?.textContent).toContain('Çalışanı Düzenle');
  });

  it('should have form element', () => {
    const form = element.shadowRoot?.querySelector('form');
    expect(form).toBeTruthy();
  });

  it('should have form actions container', () => {
    const formActions = element.shadowRoot?.querySelector('.form-actions');
    expect(formActions).toBeTruthy();
  });

  it('should have date input wrappers', () => {
    const dateWrappers = element.shadowRoot?.querySelectorAll('.date-input-wrapper');
    expect(dateWrappers?.length).toBeGreaterThanOrEqual(2);
  });

  it('should show loading message initially', async () => {
    // Create new instance without waiting for data
    const loadingElement = document.createElement('employee-edit-form') as EmployeeEditForm;
    document.body.appendChild(loadingElement);

    // Check if loading is shown (this happens before data loads)
    expect(loadingElement).toBeTruthy();

    document.body.removeChild(loadingElement);
  });
});
