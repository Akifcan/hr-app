import { describe, it, expect, beforeEach, vi } from 'vitest';
import { dbService } from '../services/indexed-db';

// Mock the services
vi.mock('../services/indexed-db', () => ({
  dbService: {
    initDB: vi.fn().mockResolvedValue(undefined),
    getAllEmployees: vi.fn().mockResolvedValue([]),
    addMultipleEmployees: vi.fn().mockResolvedValue(undefined)
  }
}));

describe('main.ts initialization', () => {
  beforeEach(() => {
    // Clear mocks
    vi.clearAllMocks();
    
    // Setup DOM
    document.body.innerHTML = `
      <section id="employee-section">
        <div id="employee-table-view"></div>
        <div id="employee-grid-view"></div>
      </section>
    `;
  });

  it('should initialize IndexedDB on app start', async () => {
    const { mockEmployees } = await import('../data/mockData');
    
    // Import main to trigger initialization
    await import('../main');
    
    // Wait for async initialization
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(dbService.initDB).toHaveBeenCalled();
  });

  it('should add mock employees if database is empty', async () => {
    const { mockEmployees } = await import('../data/mockData');
    
    // Mock empty database
    vi.mocked(dbService.getAllEmployees).mockResolvedValue([]);
    
    // Import main to trigger initialization
    await import('../main');
    
    // Wait for async initialization
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(dbService.getAllEmployees).toHaveBeenCalled();
    expect(dbService.addMultipleEmployees).toHaveBeenCalledWith(mockEmployees);
  });

  it('should not add mock employees if database has data', async () => {
    // Mock database with existing employees
    const existingEmployees = [
      {
        id: 1,
        firstName: 'Existing',
        lastName: 'Employee',
        dateOfEmployment: '2024-01-01',
        dateOfBirth: '1990-01-01',
        phone: '5551234567',
        email: 'existing@example.com',
        department: 'Analytics',
        position: 'Junior'
      }
    ];
    
    vi.mocked(dbService.getAllEmployees).mockResolvedValue(existingEmployees);
    
    // Import main to trigger initialization
    await import('../main');
    
    // Wait for async initialization
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(dbService.getAllEmployees).toHaveBeenCalled();
    expect(dbService.addMultipleEmployees).not.toHaveBeenCalled();
  });

  it('should handle view-changed event for table view', async () => {
    const section = document.getElementById('employee-section');
    const tableView = document.getElementById('employee-table-view') as HTMLElement;
    const gridView = document.getElementById('employee-grid-view') as HTMLElement;
    
    // Import main to setup event listeners
    await import('../main');
    
    // Wait for initialization
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Dispatch view-changed event for table view
    const event = new CustomEvent('view-changed', {
      detail: { view: 'table' },
      bubbles: true
    });
    
    section?.dispatchEvent(event);
    
    expect(tableView.style.display).toBe('block');
    expect(gridView.style.display).toBe('none');
  });

  it('should handle view-changed event for grid view', async () => {
    const section = document.getElementById('employee-section');
    const tableView = document.getElementById('employee-table-view') as HTMLElement;
    const gridView = document.getElementById('employee-grid-view') as HTMLElement;
    
    // Import main to setup event listeners
    await import('../main');
    
    // Wait for initialization
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Dispatch view-changed event for grid view
    const event = new CustomEvent('view-changed', {
      detail: { view: 'grid' },
      bubbles: true
    });
    
    section?.dispatchEvent(event);
    
    expect(tableView.style.display).toBe('none');
    expect(gridView.style.display).toBe('block');
  });

  it('should handle initialization error gracefully', async () => {
    // Mock initialization error
    vi.mocked(dbService.initDB).mockRejectedValue(new Error('Init failed'));
    
    // Spy on console.error
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Import main to trigger initialization
    await import('../main');
    
    // Wait for async initialization
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error initializing app:',
      expect.any(Error)
    );
    
    consoleErrorSpy.mockRestore();
  });

  it('should log success message when database initializes', async () => {
    // Spy on console.log
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    // Import main to trigger initialization
    await import('../main');
    
    // Wait for async initialization
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(consoleLogSpy).toHaveBeenCalledWith('IndexedDB initialized successfully');
    
    consoleLogSpy.mockRestore();
  });
});
