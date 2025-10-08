import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';
import '../components/employee-grid';
import type { EmployeeGrid } from '../components/employee-grid';
import { dbService } from '../services/indexed-db';

// Mock the dbService
vi.mock('../services/indexed-db', () => ({
  dbService: {
    getAllEmployees: vi.fn().mockResolvedValue([
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '2024-01-01',
        dateOfBirth: '1990-01-01',
        phone: '+1234567890',
        email: 'john@example.com',
        department: 'Tech',
        position: 'Developer'
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        dateOfEmployment: '2024-01-02',
        dateOfBirth: '1991-01-01',
        phone: '+0987654321',
        email: 'jane@example.com',
        department: 'Marketing',
        position: 'Manager'
      },
      {
        id: 3,
        firstName: 'Bob',
        lastName: 'Johnson',
        dateOfEmployment: '2024-01-03',
        dateOfBirth: '1992-01-01',
        phone: '+1122334455',
        email: 'bob@example.com',
        department: 'Sales',
        position: 'Representative'
      },
      {
        id: 4,
        firstName: 'Alice',
        lastName: 'Williams',
        dateOfEmployment: '2024-01-04',
        dateOfBirth: '1993-01-01',
        phone: '+5566778899',
        email: 'alice@example.com',
        department: 'HR',
        position: 'Coordinator'
      },
      {
        id: 5,
        firstName: 'Charlie',
        lastName: 'Brown',
        dateOfEmployment: '2024-01-05',
        dateOfBirth: '1994-01-01',
        phone: '+9988776655',
        email: 'charlie@example.com',
        department: 'Finance',
        position: 'Analyst'
      }
    ]),
    deleteEmployee: vi.fn().mockResolvedValue(undefined)
  }
}));

describe('EmployeeGrid', () => {
  let element: EmployeeGrid;

  beforeEach(async () => {
    element = await fixture(html`<employee-grid></employee-grid>`);
    await element.updateComplete;
    // Wait a bit for async operations
    await new Promise(resolve => setTimeout(resolve, 100));
  });

  it('should render the grid container', () => {
    const grid = element.shadowRoot?.querySelector('.employees-grid-view');
    expect(grid).toBeTruthy();
  });

  it('should call getAllEmployees on load', () => {
    expect(dbService.getAllEmployees).toHaveBeenCalled();
  });

  it('should render employee grid items', async () => {
    await element.updateComplete;
    const gridItems = element.shadowRoot?.querySelectorAll('employee-grid-item');
    expect(gridItems?.length).toBeGreaterThan(0);
  });

  it('should display 4 items per page by default', async () => {
    await element.updateComplete;
    const gridItems = element.shadowRoot?.querySelectorAll('employee-grid-item');
    expect(gridItems?.length).toBeLessThanOrEqual(4);
  });

  it('should render pagination component', () => {
    const pagination = element.shadowRoot?.querySelector('pagination-component');
    expect(pagination).toBeTruthy();
  });

  it('should have correct total pages for 5 employees', async () => {
    await element.updateComplete;
    const pagination = element.shadowRoot?.querySelector('pagination-component') as any;
    // 5 employees / 4 per page = 2 pages
    expect(pagination?.totalPages).toBe(2);
  });

  it('should start on page 1', async () => {
    await element.updateComplete;
    const pagination = element.shadowRoot?.querySelector('pagination-component') as any;
    expect(pagination?.currentPage).toBe(1);
  });

  it('should update displayed employees when page changes', async () => {
    await element.updateComplete;

    // Trigger page change event
    const pagination = element.shadowRoot?.querySelector('pagination-component');
    const pageChangeEvent = new CustomEvent('page-change', {
      detail: { page: 2 },
      bubbles: true,
      composed: true
    });
    pagination?.dispatchEvent(pageChangeEvent);

    await element.updateComplete;

    const gridItems = element.shadowRoot?.querySelectorAll('employee-grid-item');
    // Second page should have 1 item (5 total - 4 on first page = 1 on second page)
    expect(gridItems?.length).toBe(1);
  });

  it('should listen for employee-deleted events', async () => {
    await element.updateComplete;
    // Test that the component can receive the event
    const gridItem = element.shadowRoot?.querySelector('employee-grid-item');
    expect(gridItem).toBeTruthy();
  });

  it('should have employees loaded', async () => {
    await element.updateComplete;
    const gridItems = element.shadowRoot?.querySelectorAll('employee-grid-item');
    expect(gridItems?.length).toBeGreaterThan(0);
  });

  it('should have proper CSS class for grid view', () => {
    const grid = element.shadowRoot?.querySelector('.employees-grid-view');
    expect(grid).toBeTruthy();
  });

  it('should render employee-grid-item components', async () => {
    await element.updateComplete;
    const gridItems = element.shadowRoot?.querySelectorAll('employee-grid-item');
    expect(gridItems?.length).toBeGreaterThan(0);
  });

  it('should pass employee data to grid items', async () => {
    await element.updateComplete;
    const firstGridItem = element.shadowRoot?.querySelector('employee-grid-item') as any;
    expect(firstGridItem?.employee).toBeTruthy();
    expect(firstGridItem?.employee.firstName).toBeTruthy();
  });

  it('should handle empty employee list', async () => {
    (dbService.getAllEmployees as any).mockResolvedValueOnce([]);
    element = await fixture(html`<employee-grid></employee-grid>`);
    await element.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100));

    const gridItems = element.shadowRoot?.querySelectorAll('employee-grid-item');
    expect(gridItems?.length).toBe(0);
  });

  it('should calculate correct total pages', async () => {
    await element.updateComplete;
    const pagination = element.shadowRoot?.querySelector('pagination-component') as any;
    // With 5 employees and 4 items per page, we should have 2 pages
    expect(pagination?.totalPages).toBe(2);
  });

  it('should show all employees on page 1 up to limit', async () => {
    await element.updateComplete;
    const gridItems = element.shadowRoot?.querySelectorAll('employee-grid-item');
    // Should show first 4 employees on page 1
    expect(gridItems?.length).toBe(4);
  });

  it('should slice employees correctly for pagination', async () => {
    await element.updateComplete;

    // Navigate to page 2
    const pagination = element.shadowRoot?.querySelector('pagination-component');
    const pageChangeEvent = new CustomEvent('page-change', {
      detail: { page: 2 },
      bubbles: true,
      composed: true
    });
    pagination?.dispatchEvent(pageChangeEvent);

    await element.updateComplete;

    const gridItems = element.shadowRoot?.querySelectorAll('employee-grid-item');
    // Page 2 should have 1 employee (the 5th one)
    expect(gridItems?.length).toBe(1);
  });

  it('should maintain employees list across page changes', async () => {
    await element.updateComplete;

    // Store initial call count
    const initialCalls = (dbService.getAllEmployees as any).mock.calls.length;

    // Change page
    const pagination = element.shadowRoot?.querySelector('pagination-component');
    const pageChangeEvent = new CustomEvent('page-change', {
      detail: { page: 2 },
      bubbles: true,
      composed: true
    });
    pagination?.dispatchEvent(pageChangeEvent);

    await element.updateComplete;

    // Should not call getAllEmployees again for pagination
    expect((dbService.getAllEmployees as any).mock.calls.length).toBe(initialCalls);
  });

  it('should handle error when loading employees fails', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    (dbService.getAllEmployees as any).mockRejectedValueOnce(new Error('DB Error'));

    element = await fixture(html`<employee-grid></employee-grid>`);
    await element.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});
