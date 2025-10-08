import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';
import '../components/employee-form';
import type { EmployeeForm } from '../components/employee-form';
import { dbService } from '../services/indexed-db';

// Mock the dbService
vi.mock('../services/indexed-db', () => ({
  dbService: {
    initDB: vi.fn().mockResolvedValue(undefined),
    addEmployee: vi.fn().mockResolvedValue(undefined)
  }
}));

describe('EmployeeForm', () => {
  let element: EmployeeForm;

  beforeEach(async () => {
    element = await fixture(html`<employee-form></employee-form>`);
  });

  it('should render the form container', () => {
    const container = element.shadowRoot?.querySelector('.form-container');
    expect(container).toBeTruthy();
  });

  it('should render form title', () => {
    const title = element.shadowRoot?.querySelector('.form-title');
    expect(title).toBeTruthy();
  });

  it('should render form element', () => {
    const form = element.shadowRoot?.querySelector('form');
    expect(form).toBeTruthy();
  });

  it('should render form grid', () => {
    const formGrid = element.shadowRoot?.querySelector('.form-grid');
    expect(formGrid).toBeTruthy();
  });

  it('should render First Name field', () => {
    const label = element.shadowRoot?.querySelector('label[for="firstName"]');
    const input = element.shadowRoot?.querySelector('#firstName');
    expect(label).toBeTruthy();
    expect(input).toBeTruthy();
  });

  it('should render Last Name field', () => {
    const label = element.shadowRoot?.querySelector('label[for="lastName"]');
    const input = element.shadowRoot?.querySelector('#lastName');
    expect(label).toBeTruthy();
    expect(input).toBeTruthy();
  });

  it('should render Date of Employment field', () => {
    const label = element.shadowRoot?.querySelector('label[for="dateOfEmployment"]');
    const input = element.shadowRoot?.querySelector('#dateOfEmployment');
    expect(label).toBeTruthy();
    expect(input).toBeTruthy();
  });

  it('should render Date of Birth field', () => {
    const label = element.shadowRoot?.querySelector('label[for="dateOfBirth"]');
    const input = element.shadowRoot?.querySelector('#dateOfBirth');
    expect(label).toBeTruthy();
    expect(input).toBeTruthy();
  });

  it('should render Phone field', () => {
    const label = element.shadowRoot?.querySelector('label[for="phone"]');
    const input = element.shadowRoot?.querySelector('#phone');
    expect(label).toBeTruthy();
    expect(input).toBeTruthy();
  });

  it('should render Email field', () => {
    const label = element.shadowRoot?.querySelector('label[for="email"]');
    const input = element.shadowRoot?.querySelector('#email');
    expect(label).toBeTruthy();
    expect(input).toBeTruthy();
  });

  it('should render Department select', () => {
    const label = element.shadowRoot?.querySelector('label[for="department"]');
    const select = element.shadowRoot?.querySelector('#department');
    expect(label).toBeTruthy();
    expect(select).toBeTruthy();
  });

  it('should render Position select', () => {
    const label = element.shadowRoot?.querySelector('label[for="position"]');
    const select = element.shadowRoot?.querySelector('#position');
    expect(label).toBeTruthy();
    expect(select).toBeTruthy();
  });

  it('should render Save button with type submit', () => {
    const saveButton = element.shadowRoot?.querySelector('.btn-save');
    expect(saveButton).toBeTruthy();
    expect(saveButton?.getAttribute('type')).toBe('submit');
  });

  it('should render Cancel button with type button', () => {
    const cancelButton = element.shadowRoot?.querySelector('.btn-cancel');
    expect(cancelButton).toBeTruthy();
    expect(cancelButton?.getAttribute('type')).toBe('button');
  });

  it('should have required attribute on text inputs', () => {
    const firstNameInput = element.shadowRoot?.querySelector('#firstName') as HTMLInputElement;
    expect(firstNameInput?.required).toBe(true);
  });

  it('should have maxlength="100" on text inputs', () => {
    const firstNameInput = element.shadowRoot?.querySelector('#firstName') as HTMLInputElement;
    expect(firstNameInput?.maxLength).toBe(100);
  });

  it('should have required attribute on date inputs', () => {
    const dateInput = element.shadowRoot?.querySelector('#dateOfEmployment') as HTMLInputElement;
    expect(dateInput?.required).toBe(true);
  });

  it('should have required attribute on select fields', () => {
    const deptSelect = element.shadowRoot?.querySelector('#department') as HTMLSelectElement;
    expect(deptSelect?.required).toBe(true);
  });

  it('should have "Please Select" as first option in Department select', () => {
    const deptSelect = element.shadowRoot?.querySelector('#department') as HTMLSelectElement;
    const firstOption = deptSelect?.querySelector('option');
    expect(firstOption?.value).toBe('');
  });

  it('should have department options', () => {
    const deptSelect = element.shadowRoot?.querySelector('#department') as HTMLSelectElement;
    const options = deptSelect?.querySelectorAll('option');
    expect(options?.length).toBeGreaterThan(1);
  });

  it('should have position options', () => {
    const posSelect = element.shadowRoot?.querySelector('#position') as HTMLSelectElement;
    const options = posSelect?.querySelectorAll('option');
    expect(options?.length).toBeGreaterThan(1);
  });

  it('should have form actions container', () => {
    const formActions = element.shadowRoot?.querySelector('.form-actions');
    expect(formActions).toBeTruthy();
  });

  it('should have date input wrappers', () => {
    const dateWrappers = element.shadowRoot?.querySelectorAll('.date-input-wrapper');
    expect(dateWrappers?.length).toBeGreaterThanOrEqual(2);
  });

  it('should render with English labels', async () => {
    const i18n = await import('../i18n');
    i18n.default.locale = 'en';
    element = await fixture(html`<employee-form></employee-form>`);

    const title = element.shadowRoot?.querySelector('.form-title');
    expect(title?.textContent).toContain('Add Employee');
  });

  it('should render with Turkish labels', async () => {
    const i18n = await import('../i18n');
    i18n.default.locale = 'tr';
    element = await fixture(html`<employee-form></employee-form>`);

    const title = element.shadowRoot?.querySelector('.form-title');
    expect(title?.textContent).toContain('Çalışan Ekle');
  });

  it('should render Save button text in English', async () => {
    const i18n = await import('../i18n');
    i18n.default.locale = 'en';
    element = await fixture(html`<employee-form></employee-form>`);

    const saveButton = element.shadowRoot?.querySelector('.btn-save');
    expect(saveButton?.textContent?.trim()).toBe('Save');
  });

  it('should render Save button text in Turkish', async () => {
    const i18n = await import('../i18n');
    i18n.default.locale = 'tr';
    element = await fixture(html`<employee-form></employee-form>`);

    const saveButton = element.shadowRoot?.querySelector('.btn-save');
    expect(saveButton?.textContent?.trim()).toBe('Kaydet');
  });

  it('should render Cancel button text in English', async () => {
    const i18n = await import('../i18n');
    i18n.default.locale = 'en';
    element = await fixture(html`<employee-form></employee-form>`);

    const cancelButton = element.shadowRoot?.querySelector('.btn-cancel');
    expect(cancelButton?.textContent?.trim()).toBe('Cancel');
  });

  it('should render Cancel button text in Turkish', async () => {
    const i18n = await import('../i18n');
    i18n.default.locale = 'tr';
    element = await fixture(html`<employee-form></employee-form>`);

    const cancelButton = element.shadowRoot?.querySelector('.btn-cancel');
    expect(cancelButton?.textContent?.trim()).toBe('İptal');
  });

  it('should have email input with type="email"', () => {
    const emailInput = element.shadowRoot?.querySelector('#email') as HTMLInputElement;
    expect(emailInput?.type).toBe('email');
  });

  it('should have phone input with type="tel"', () => {
    const phoneInput = element.shadowRoot?.querySelector('#phone') as HTMLInputElement;
    expect(phoneInput?.type).toBe('tel');
  });

  it('should have date inputs with type="date"', () => {
    const dateOfEmploymentInput = element.shadowRoot?.querySelector('#dateOfEmployment') as HTMLInputElement;
    const dateOfBirthInput = element.shadowRoot?.querySelector('#dateOfBirth') as HTMLInputElement;
    expect(dateOfEmploymentInput?.type).toBe('date');
    expect(dateOfBirthInput?.type).toBe('date');
  });

  it('should have all form fields with proper CSS classes', () => {
    const formFields = element.shadowRoot?.querySelectorAll('.form-field');
    expect(formFields?.length).toBeGreaterThanOrEqual(8);
  });

  it('should have form inputs with proper CSS class', () => {
    const inputs = element.shadowRoot?.querySelectorAll('.form-input');
    expect(inputs?.length).toBeGreaterThan(0);
  });

  it('should have form selects with proper CSS class', () => {
    const selects = element.shadowRoot?.querySelectorAll('.form-select');
    expect(selects?.length).toBe(2);
  });

  it('should have all labels with proper CSS class', () => {
    const labels = element.shadowRoot?.querySelectorAll('.form-label');
    expect(labels?.length).toBeGreaterThanOrEqual(8);
  });
});
