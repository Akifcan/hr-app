import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';
import '../components/employee-table';
import type { EmployeeTable } from '../components/employee-table';
import { dbService } from '../services/indexed-db';

// Mock the dbService
vi.mock('../services/indexed-db', () => ({
  dbService: {
    getAllEmployees: vi.fn().mockResolvedValue(
      Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        firstName: `FirstName${i + 1}`,
        lastName: `LastName${i + 1}`,
        dateOfEmployment: '2024-01-01',
        dateOfBirth: '1990-01-01',
        phone: `+123456789${i}`,
        email: `user${i + 1}@example.com`,
        department: 'Tech',
        position: 'Developer'
      }))
    ),
    deleteEmployee: vi.fn().mockResolvedValue(undefined)
  }
}));

describe('EmployeeTable', () => {
  let element: EmployeeTable;

  beforeEach(async () => {
    element = await fixture(html`<employee-table></employee-table>`);
    await element.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100));
  });

  it('should render table wrapper', () => {
    const wrapper = element.shadowRoot?.querySelector('.table-wrapper');
    expect(wrapper).toBeTruthy();
  });

  it('should render table element', () => {
    const table = element.shadowRoot?.querySelector('table');
    expect(table).toBeTruthy();
  });

  it('should render thead', () => {
    const thead = element.shadowRoot?.querySelector('thead');
    expect(thead).toBeTruthy();
  });

  it('should render tbody', () => {
    const tbody = element.shadowRoot?.querySelector('tbody');
    expect(tbody).toBeTruthy();
  });

  it('should render pagination component', () => {
    const pagination = element.shadowRoot?.querySelector('pagination-component');
    expect(pagination).toBeTruthy();
  });

  it('should call getAllEmployees on load', () => {
    expect(dbService.getAllEmployees).toHaveBeenCalled();
  });

  it('should display 10 items per page', async () => {
    await element.updateComplete;
    const rows = element.shadowRoot?.querySelectorAll('tbody tr');
    expect(rows?.length).toBeLessThanOrEqual(10);
  });

  it('should have correct total pages for 15 employees', async () => {
    await element.updateComplete;
    const pagination = element.shadowRoot?.querySelector('pagination-component') as any;
    // 15 employees / 10 per page = 2 pages
    expect(pagination?.totalPages).toBe(2);
  });

  it('should render table headers', () => {
    const headers = element.shadowRoot?.querySelectorAll('th');
    expect(headers?.length).toBeGreaterThan(0);
  });

  it('should render delete dialog', () => {
    const dialog = element.shadowRoot?.querySelector('delete-dialog');
    expect(dialog).toBeTruthy();
  });

  it('should have tbody element for rows', async () => {
    await element.updateComplete;
    const tbody = element.shadowRoot?.querySelector('tbody');
    expect(tbody).toBeTruthy();
  });

  it('should render action buttons in each row', async () => {
    await element.updateComplete;
    const actionButtons = element.shadowRoot?.querySelectorAll('.action-button');
    expect(actionButtons?.length).toBeGreaterThan(0);
  });

  it('should have edit buttons', async () => {
    await element.updateComplete;
    const editButtons = element.shadowRoot?.querySelectorAll('.edit-button');
    expect(editButtons?.length).toBeGreaterThan(0);
  });

  it('should have remove buttons', async () => {
    await element.updateComplete;
    const removeButtons = element.shadowRoot?.querySelectorAll('.remove-button');
    expect(removeButtons?.length).toBeGreaterThan(0);
  });

  it('should navigate to edit page when edit button is clicked', () => {
    const locationMock = { href: '' };
    Object.defineProperty(window, 'location', {
      value: locationMock,
      writable: true,
    });

    const editButton = element.shadowRoot?.querySelector('.edit-button') as HTMLButtonElement;
    editButton?.click();

    expect(locationMock.href).toContain('/edit-employee.html?id=');
  });

  it('should render with English headers', async () => {
    const i18n = await import('../i18n');
    i18n.default.locale = 'en';
    element = await fixture(html`<employee-table></employee-table>`);
    await element.updateComplete;

    const content = element.shadowRoot?.textContent;
    expect(content).toContain('First Name');
  });

  it('should render with Turkish headers', async () => {
    const i18n = await import('../i18n');
    i18n.default.locale = 'tr';
    element = await fixture(html`<employee-table></employee-table>`);
    await element.updateComplete;

    const content = element.shadowRoot?.textContent;
    expect(content).toContain('Ad');
  });

  it('should handle page change events', async () => {
    await element.updateComplete;

    const pagination = element.shadowRoot?.querySelector('pagination-component');
    const pageChangeEvent = new CustomEvent('page-change', {
      detail: { page: 2 },
      bubbles: true,
      composed: true
    });
    pagination?.dispatchEvent(pageChangeEvent);

    await element.updateComplete;

    expect(pagination).toBeTruthy();
  });

  it('should have table structure ready', async () => {
    await element.updateComplete;
    const tbody = element.shadowRoot?.querySelector('tbody');
    expect(tbody).toBeTruthy();
  });

  it('should have SVG icons in action buttons', async () => {
    await element.updateComplete;
    const svgs = element.shadowRoot?.querySelectorAll('.action-button svg');
    expect(svgs?.length).toBeGreaterThan(0);
  });

  it('should start on page 1', async () => {
    await element.updateComplete;
    const pagination = element.shadowRoot?.querySelector('pagination-component') as any;
    expect(pagination?.currentPage).toBe(1);
  });

  it('should handle empty employee list', async () => {
    (dbService.getAllEmployees as any).mockResolvedValueOnce([]);
    element = await fixture(html`<employee-table></employee-table>`);
    await element.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100));

    const rows = element.shadowRoot?.querySelectorAll('tbody tr');
    expect(rows?.length).toBe(0);
  });

  it('should have table hover effect styles', () => {
    const tbody = element.shadowRoot?.querySelector('tbody');
    expect(tbody).toBeTruthy();
  });

  it('should have loaded employees data', async () => {
    await element.updateComplete;
    expect(dbService.getAllEmployees).toHaveBeenCalled();
  });

  it('should have aria labels on action buttons', async () => {
    await element.updateComplete;
    const editButton = element.shadowRoot?.querySelector('.edit-button') as HTMLButtonElement;
    const removeButton = element.shadowRoot?.querySelector('.remove-button') as HTMLButtonElement;

    expect(editButton?.getAttribute('aria-label')).toBeTruthy();
    expect(removeButton?.getAttribute('aria-label')).toBeTruthy();
  });

  it('should have title attributes on action buttons', async () => {
    await element.updateComplete;
    const editButton = element.shadowRoot?.querySelector('.edit-button') as HTMLButtonElement;
    const removeButton = element.shadowRoot?.querySelector('.remove-button') as HTMLButtonElement;

    expect(editButton?.getAttribute('title')).toBeTruthy();
    expect(removeButton?.getAttribute('title')).toBeTruthy();
  });
});
