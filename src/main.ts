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

  } catch (error) {
    console.error('Error initializing app:', error);
  }
}
initializeApp();
