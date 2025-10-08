import { dbService } from './services/indexedDB';
import { mockEmployees } from './data/mockData';

async function initializeApp() {
  try {
    await dbService.initDB();
    console.log('IndexedDB initialized successfully');
    const existingEmployees = await dbService.getAllEmployees();
    if (existingEmployees.length === 0) {
      await dbService.addMultipleEmployees(mockEmployees);
    }

    // View switcher event listener
    const section = document.getElementById('employee-section');
    const tableView = document.getElementById('employee-table-view');
    const gridView = document.getElementById('employee-grid-view');

    section?.addEventListener('view-changed', ((event: CustomEvent) => {
      const view = event.detail.view;
      if (view === 'table') {
        tableView!.style.display = 'block';
        gridView!.style.display = 'none';
      } else if (view === 'grid') {
        tableView!.style.display = 'none';
        gridView!.style.display = 'block';
      }
    }) as EventListener);

  } catch (error) {
    console.error('Error initializing app:', error);
  }
}
initializeApp();
