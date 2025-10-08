import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { dbService } from '../services/indexed-db';

describe('IndexedDBService', () => {
  beforeEach(async () => {
    // Clear the database before each test
    await dbService.initDB();
    await dbService.clearAll();
  });

  afterEach(async () => {
    // Clean up after each test
    await dbService.clearAll();
  });

  describe('initDB', () => {
    it('should initialize the database', async () => {
      await expect(dbService.initDB()).resolves.toBeUndefined();
    });

    it('should return the same promise if called multiple times', async () => {
      const promise1 = dbService.initDB();
      const promise2 = dbService.initDB();
      expect(promise1).toBe(promise2);
    });
  });

  describe('addEmployee', () => {
    it('should add an employee and return an ID', async () => {
      const employee: Employee = {
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '2024-01-01',
        dateOfBirth: '1990-01-01',
        phone: '5551234567',
        email: 'john.doe@example.com',
        department: 'Analytics',
        position: 'Junior'
      };

      const id = await dbService.addEmployee(employee);
      expect(id).toBeGreaterThan(0);
    });

    it('should throw error when adding employee with duplicate email', async () => {
      const employee: Employee = {
        firstName: 'Jane',
        lastName: 'Smith',
        dateOfEmployment: '2024-01-01',
        dateOfBirth: '1990-01-01',
        phone: '5551234568',
        email: 'jane.smith@example.com',
        department: 'Tech',
        position: 'Medior'
      };

      await dbService.addEmployee(employee);
      await expect(dbService.addEmployee(employee)).rejects.toThrow();
    });
  });

  describe('addMultipleEmployees', () => {
    it('should add multiple employees', async () => {
      const employees: Employee[] = [
        {
          firstName: 'Alice',
          lastName: 'Johnson',
          dateOfEmployment: '2024-01-01',
          dateOfBirth: '1992-05-15',
          phone: '5551111111',
          email: 'alice@example.com',
          department: 'Analytics',
          position: 'Senior'
        },
        {
          firstName: 'Bob',
          lastName: 'Williams',
          dateOfEmployment: '2024-02-01',
          dateOfBirth: '1988-10-20',
          phone: '5552222222',
          email: 'bob@example.com',
          department: 'Tech',
          position: 'Junior'
        }
      ];

      await expect(dbService.addMultipleEmployees(employees)).resolves.toBeUndefined();
      
      const allEmployees = await dbService.getAllEmployees();
      expect(allEmployees.length).toBe(2);
    });
  });

  describe('getAllEmployees', () => {
    it('should return empty array when no employees exist', async () => {
      const employees = await dbService.getAllEmployees();
      expect(employees).toEqual([]);
    });

    it('should return all employees sorted by ID descending', async () => {
      const employee1: Employee = {
        firstName: 'First',
        lastName: 'Employee',
        dateOfEmployment: '2024-01-01',
        dateOfBirth: '1990-01-01',
        phone: '5551111111',
        email: 'first@example.com',
        department: 'Analytics',
        position: 'Junior'
      };

      const employee2: Employee = {
        firstName: 'Second',
        lastName: 'Employee',
        dateOfEmployment: '2024-02-01',
        dateOfBirth: '1991-02-02',
        phone: '5552222222',
        email: 'second@example.com',
        department: 'Tech',
        position: 'Medior'
      };

      await dbService.addEmployee(employee1);
      await dbService.addEmployee(employee2);

      const employees = await dbService.getAllEmployees();
      expect(employees.length).toBe(2);
      expect(employees[0].firstName).toBe('Second'); // Newest first
      expect(employees[1].firstName).toBe('First');
    });
  });

  describe('getEmployee', () => {
    it('should get an employee by ID', async () => {
      const employee: Employee = {
        firstName: 'Test',
        lastName: 'User',
        dateOfEmployment: '2024-01-01',
        dateOfBirth: '1990-01-01',
        phone: '5551234567',
        email: 'test@example.com',
        department: 'Analytics',
        position: 'Junior'
      };

      const id = await dbService.addEmployee(employee);
      const retrievedEmployee = await dbService.getEmployee(id);

      expect(retrievedEmployee).toBeDefined();
      expect(retrievedEmployee?.firstName).toBe('Test');
      expect(retrievedEmployee?.lastName).toBe('User');
      expect(retrievedEmployee?.email).toBe('test@example.com');
    });

    it('should return undefined for non-existent ID', async () => {
      const employee = await dbService.getEmployee(999999);
      expect(employee).toBeUndefined();
    });
  });

  describe('updateEmployee', () => {
    it('should update an existing employee', async () => {
      const employee: Employee = {
        firstName: 'Original',
        lastName: 'Name',
        dateOfEmployment: '2024-01-01',
        dateOfBirth: '1990-01-01',
        phone: '5551234567',
        email: 'original@example.com',
        department: 'Analytics',
        position: 'Junior'
      };

      const id = await dbService.addEmployee(employee);
      
      const updatedEmployee: Employee = {
        id,
        firstName: 'Updated',
        lastName: 'Name',
        dateOfEmployment: '2024-01-01',
        dateOfBirth: '1990-01-01',
        phone: '5551234567',
        email: 'original@example.com',
        department: 'Tech',
        position: 'Senior'
      };

      await dbService.updateEmployee(updatedEmployee);
      
      const retrieved = await dbService.getEmployee(id);
      expect(retrieved?.firstName).toBe('Updated');
      expect(retrieved?.department).toBe('Tech');
      expect(retrieved?.position).toBe('Senior');
    });
  });

  describe('deleteEmployee', () => {
    it('should delete an employee by ID', async () => {
      const employee: Employee = {
        firstName: 'ToDelete',
        lastName: 'User',
        dateOfEmployment: '2024-01-01',
        dateOfBirth: '1990-01-01',
        phone: '5551234567',
        email: 'delete@example.com',
        department: 'Analytics',
        position: 'Junior'
      };

      const id = await dbService.addEmployee(employee);
      await dbService.deleteEmployee(id);
      
      const retrieved = await dbService.getEmployee(id);
      expect(retrieved).toBeUndefined();
    });

    it('should not throw error when deleting non-existent employee', async () => {
      await expect(dbService.deleteEmployee(999999)).resolves.toBeUndefined();
    });
  });

  describe('clearAll', () => {
    it('should clear all employees from database', async () => {
      const employees: Employee[] = [
        {
          firstName: 'Test1',
          lastName: 'User1',
          dateOfEmployment: '2024-01-01',
          dateOfBirth: '1990-01-01',
          phone: '5551111111',
          email: 'test1@example.com',
          department: 'Analytics',
          position: 'Junior'
        },
        {
          firstName: 'Test2',
          lastName: 'User2',
          dateOfEmployment: '2024-02-01',
          dateOfBirth: '1991-02-02',
          phone: '5552222222',
          email: 'test2@example.com',
          department: 'Tech',
          position: 'Medior'
        }
      ];

      await dbService.addMultipleEmployees(employees);
      
      let allEmployees = await dbService.getAllEmployees();
      expect(allEmployees.length).toBe(2);
      
      await dbService.clearAll();
      
      allEmployees = await dbService.getAllEmployees();
      expect(allEmployees.length).toBe(0);
    });
  });
});
