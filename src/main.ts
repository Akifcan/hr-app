import { dbService } from './services/indexedDB';
import { mockEmployees } from './data/mockData';

async function initializeApp() {
  try {
    await dbService.initDB();
    const existingEmployees = await dbService.getAllEmployees();

    if (existingEmployees.length === 0) {
      await dbService.addMultipleEmployees(mockEmployees);
    } 

    const allEmployees = await dbService.getAllEmployees();
    console.table(allEmployees);
  } catch (error) {
    console.error(error);
  }
}

initializeApp();
