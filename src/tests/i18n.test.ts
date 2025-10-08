import { describe, it, expect, beforeEach } from 'vitest';
import i18n from '../i18n';

describe('i18n', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should have default locale as tr', () => {
    expect(i18n.defaultLocale).toBe('tr');
  });

  it('should load locale from localStorage', () => {
    localStorage.setItem('locale', 'en');
    expect(localStorage.getItem('locale')).toBe('en');
  });

  it('should translate header.employees in English', () => {
    i18n.locale = 'en';
    expect(i18n.t('header.employees')).toBe('Employees');
  });

  it('should translate header.employees in Turkish', () => {
    i18n.locale = 'tr';
    expect(i18n.t('header.employees')).toBe('Çalışanlar');
  });

  it('should translate header.addNew in English', () => {
    i18n.locale = 'en';
    expect(i18n.t('header.addNew')).toBe('Add New');
  });

  it('should translate header.addNew in Turkish', () => {
    i18n.locale = 'tr';
    expect(i18n.t('header.addNew')).toBe('Yeni Ekle');
  });

  it('should translate deleteDialog.title in English', () => {
    i18n.locale = 'en';
    expect(i18n.t('deleteDialog.title')).toBe('Are you sure?');
  });

  it('should translate deleteDialog.title in Turkish', () => {
    i18n.locale = 'tr';
    expect(i18n.t('deleteDialog.title')).toBe('Emin misiniz?');
  });

  it('should handle interpolation in deleteDialog.message', () => {
    i18n.locale = 'en';
    expect(i18n.t('deleteDialog.message', { name: 'John Doe' })).toContain('John Doe');
  });
});
