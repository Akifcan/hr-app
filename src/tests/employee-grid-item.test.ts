import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';
import '../components/employee-grid-item';
import type { EmployeeGridItem } from '../components/employee-grid-item';

describe('EmployeeGridItem', () => {
  let element: EmployeeGridItem;
  const mockEmployee = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    dateOfEmployment: '2024-01-01',
    dateOfBirth: '1990-01-01',
    phone: '+1234567890',
    email: 'john@example.com',
    department: 'Tech',
    position: 'Developer'
  };

  beforeEach(async () => {
    element = await fixture(html`<employee-grid-item .employee=${mockEmployee}></employee-grid-item>`);
  });

  it('should render the grid item container', () => {
    const gridItem = element.shadowRoot?.querySelector('.grid-item');
    expect(gridItem).toBeTruthy();
  });

  it('should display employee first name', () => {
    const content = element.shadowRoot?.textContent;
    expect(content).toContain('John');
  });

  it('should display employee last name', () => {
    const content = element.shadowRoot?.textContent;
    expect(content).toContain('Doe');
  });

  it('should display employee email', () => {
    const content = element.shadowRoot?.textContent;
    expect(content).toContain('john@example.com');
  });

  it('should display employee phone', () => {
    const content = element.shadowRoot?.textContent;
    expect(content).toContain('+1234567890');
  });

  it('should display employee department', () => {
    const content = element.shadowRoot?.textContent;
    expect(content).toContain('Tech');
  });

  it('should display employee position', () => {
    const content = element.shadowRoot?.textContent;
    expect(content).toContain('Developer');
  });

  it('should display date of employment', () => {
    const content = element.shadowRoot?.textContent;
    expect(content).toContain('2024-01-01');
  });

  it('should display date of birth', () => {
    const content = element.shadowRoot?.textContent;
    expect(content).toContain('1990-01-01');
  });

  it('should render edit button', () => {
    const editButton = element.shadowRoot?.querySelector('.edit-button');
    expect(editButton).toBeTruthy();
  });

  it('should render delete button', () => {
    const deleteButton = element.shadowRoot?.querySelector('.remove-button');
    expect(deleteButton).toBeTruthy();
  });

  it('should render delete dialog', () => {
    const dialog = element.shadowRoot?.querySelector('delete-dialog');
    expect(dialog).toBeTruthy();
  });

  it('should have edit button with SVG icon', () => {
    const editButton = element.shadowRoot?.querySelector('.edit-button');
    const svg = editButton?.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('should have delete button with SVG icon', () => {
    const deleteButton = element.shadowRoot?.querySelector('.remove-button');
    const svg = deleteButton?.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('should render all employee items', () => {
    const employeeItems = element.shadowRoot?.querySelectorAll('.employee-item');
    expect(employeeItems?.length).toBeGreaterThanOrEqual(8);
  });

  it('should have actions grid', () => {
    const actionsGrid = element.shadowRoot?.querySelector('.actions-grid');
    expect(actionsGrid).toBeTruthy();
  });

  it('should render with English labels', async () => {
    const i18n = await import('../i18n');
    i18n.default.locale = 'en';
    element = await fixture(html`<employee-grid-item .employee=${mockEmployee}></employee-grid-item>`);

    const content = element.shadowRoot?.textContent;
    expect(content).toContain('First Name:');
  });

  it('should render with Turkish labels', async () => {
    const i18n = await import('../i18n');
    i18n.default.locale = 'tr';
    element = await fixture(html`<employee-grid-item .employee=${mockEmployee}></employee-grid-item>`);

    const content = element.shadowRoot?.textContent;
    expect(content).toContain('Ad:');
  });

  it('should emit employee-deleted event when delete is confirmed', async () => {
    const handler = vi.fn();
    element.addEventListener('employee-deleted', handler);

    const deleteButton = element.shadowRoot?.querySelector('.remove-button') as HTMLButtonElement;
    deleteButton?.click();

    await element.updateComplete;

    const dialog = element.shadowRoot?.querySelector('delete-dialog') as any;
    const proceedButton = dialog?.shadowRoot?.querySelector('.proceed-button') as HTMLButtonElement;
    proceedButton?.click();

    expect(handler).toHaveBeenCalled();
  });

  it('should navigate to edit page when edit button is clicked', () => {
    const locationMock = { href: '' };
    Object.defineProperty(window, 'location', {
      value: locationMock,
      writable: true,
    });

    const editButton = element.shadowRoot?.querySelector('.edit-button') as HTMLButtonElement;
    editButton?.click();

    expect(locationMock.href).toContain('/edit-employee.html?id=1');
  });

  it('should render Edit button text in English', async () => {
    const i18n = await import('../i18n');
    i18n.default.locale = 'en';
    element = await fixture(html`<employee-grid-item .employee=${mockEmployee}></employee-grid-item>`);

    const editButton = element.shadowRoot?.querySelector('.edit-button');
    expect(editButton?.textContent?.trim()).toContain('Edit');
  });

  it('should render Edit button text in Turkish', async () => {
    const i18n = await import('../i18n');
    i18n.default.locale = 'tr';
    element = await fixture(html`<employee-grid-item .employee=${mockEmployee}></employee-grid-item>`);

    const editButton = element.shadowRoot?.querySelector('.edit-button');
    expect(editButton?.textContent?.trim()).toContain('Düzenle');
  });

  it('should render Delete button text in English', async () => {
    const i18n = await import('../i18n');
    i18n.default.locale = 'en';
    element = await fixture(html`<employee-grid-item .employee=${mockEmployee}></employee-grid-item>`);

    const deleteButton = element.shadowRoot?.querySelector('.remove-button');
    expect(deleteButton?.textContent?.trim()).toContain('Delete');
  });

  it('should render Delete button text in Turkish', async () => {
    const i18n = await import('../i18n');
    i18n.default.locale = 'tr';
    element = await fixture(html`<employee-grid-item .employee=${mockEmployee}></employee-grid-item>`);

    const deleteButton = element.shadowRoot?.querySelector('.remove-button');
    expect(deleteButton?.textContent?.trim()).toContain('Sil');
  });

  it('should have employee-item--title class for labels', () => {
    const titles = element.shadowRoot?.querySelectorAll('.employee-item--title');
    expect(titles?.length).toBeGreaterThan(0);
  });

  it('should have employee-item--value class for values', () => {
    const values = element.shadowRoot?.querySelectorAll('.employee-item--value');
    expect(values?.length).toBeGreaterThan(0);
  });

  it('should have proper aria labels on buttons', () => {
    const editButton = element.shadowRoot?.querySelector('.edit-button') as HTMLButtonElement;
    const deleteButton = element.shadowRoot?.querySelector('.remove-button') as HTMLButtonElement;

    expect(editButton?.getAttribute('aria-label')).toBeTruthy();
    expect(deleteButton?.getAttribute('aria-label')).toBeTruthy();
  });

  it('should have title attributes on buttons', () => {
    const editButton = element.shadowRoot?.querySelector('.edit-button') as HTMLButtonElement;
    const deleteButton = element.shadowRoot?.querySelector('.remove-button') as HTMLButtonElement;

    expect(editButton?.getAttribute('title')).toBeTruthy();
    expect(deleteButton?.getAttribute('title')).toBeTruthy();
  });
});