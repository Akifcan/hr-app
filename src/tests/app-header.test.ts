import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';
import '../components/app-header';
import type { AppHeader } from '../components/app-header';

describe('AppHeader', () => {
  let element: AppHeader;

  beforeEach(async () => {
    element = await fixture(html`<app-header></app-header>`);
  });

  it('should render the header element', () => {
    const header = element.shadowRoot?.querySelector('header');
    expect(header).toBeTruthy();
  });

  it('should render the ING logo', () => {
    const logo = element.shadowRoot?.querySelector('.logo-container img') as HTMLImageElement;
    expect(logo).toBeTruthy();
    expect(logo?.src).toContain('ing-logo-2.jpeg');
  });

  it('should render the ING title', () => {
    const title = element.shadowRoot?.querySelector('.logo-container h2');
    expect(title?.textContent?.trim()).toBe('ING');
  });

  it('should render Employees link', () => {
    const employeesLink = element.shadowRoot?.querySelector('.employees-link') as HTMLAnchorElement;
    expect(employeesLink).toBeTruthy();
    expect(employeesLink?.href).toContain('/');
  });

  it('should render Add New link', () => {
    const addNewLink = element.shadowRoot?.querySelector('.add-new-link') as HTMLAnchorElement;
    expect(addNewLink).toBeTruthy();
    expect(addNewLink?.href).toContain('/add-new.html');
  });

  it('should render language switcher component', () => {
    const languageSwitcher = element.shadowRoot?.querySelector('language-switcher');
    expect(languageSwitcher).toBeTruthy();
  });

  it('should have proper navigation structure', () => {
    const links = element.shadowRoot?.querySelectorAll('a');
    expect(links?.length).toBeGreaterThanOrEqual(2);
  });

  it('should have accessible SVG icons', () => {
    const svgs = element.shadowRoot?.querySelectorAll('svg');
    expect(svgs?.length).toBeGreaterThanOrEqual(2);
  });

  it('should render Employees text with i18n', async () => {
    const i18n = await import('../i18n');
    i18n.default.locale = 'en';
    element = await fixture(html`<app-header></app-header>`);
    const employeesLink = element.shadowRoot?.querySelector('.employees-link');
    expect(employeesLink?.textContent).toContain('Employees');
  });

  it('should render Çalışanlar text when locale is tr', async () => {
    const i18n = await import('../i18n');
    i18n.default.locale = 'tr';
    element = await fixture(html`<app-header></app-header>`);
    const employeesLink = element.shadowRoot?.querySelector('.employees-link');
    expect(employeesLink?.textContent).toContain('Çalışanlar');
  });

  it('should have spacer element for layout', () => {
    const spacer = element.shadowRoot?.querySelector('.spacer');
    expect(spacer).toBeTruthy();
  });

  it('should have proper CSS classes for styling', () => {
    const logoContainer = element.shadowRoot?.querySelector('.logo-container');
    const employeesLink = element.shadowRoot?.querySelector('.employees-link');
    const addNewLink = element.shadowRoot?.querySelector('.add-new-link');

    expect(logoContainer).toBeTruthy();
    expect(employeesLink).toBeTruthy();
    expect(addNewLink).toBeTruthy();
  });
});
