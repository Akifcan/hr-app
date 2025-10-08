import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';
import '../components/delete-dialog';
import type { DeleteDialog } from '../components/delete-dialog';

describe('DeleteDialog', () => {
  let element: DeleteDialog;

  beforeEach(async () => {
    element = await fixture(html`<delete-dialog .employeeName=${'John Doe'} .employeeId=${1}></delete-dialog>`);
  });

  it('should render the dialog element', () => {
    const dialog = element.shadowRoot?.querySelector('dialog');
    expect(dialog).toBeTruthy();
  });

  it('should display the employee name in the message', () => {
    const message = element.shadowRoot?.querySelector('.dialog-message');
    expect(message?.textContent).toContain('John Doe');
  });

  it('should render dialog title', () => {
    const title = element.shadowRoot?.querySelector('.dialog-title');
    expect(title).toBeTruthy();
  });

  it('should render Proceed button', () => {
    const proceedButton = element.shadowRoot?.querySelector('.proceed-button');
    expect(proceedButton).toBeTruthy();
  });

  it('should render Cancel button', () => {
    const cancelButton = element.shadowRoot?.querySelector('.cancel-button');
    expect(cancelButton).toBeTruthy();
  });

  it('should render close button', () => {
    const closeButton = element.shadowRoot?.querySelector('.close-button');
    expect(closeButton).toBeTruthy();
  });

  it('should open dialog when open() is called', () => {
    const dialog = element.shadowRoot?.querySelector('dialog') as HTMLDialogElement;
    element.open();
    expect(dialog?.open).toBe(true);
  });

  it('should close dialog when close() is called', () => {
    const dialog = element.shadowRoot?.querySelector('dialog') as HTMLDialogElement;
    element.open();
    element.close();
    expect(dialog?.open).toBe(false);
  });

  it('should emit delete-confirmed event when Proceed is clicked', async () => {
    const handler = vi.fn();
    element.addEventListener('delete-confirmed', handler);

    element.open();
    const proceedButton = element.shadowRoot?.querySelector('.proceed-button') as HTMLButtonElement;
    proceedButton?.click();

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toEqual({ employeeId: 1 });
  });

  it('should close dialog when Cancel is clicked', () => {
    const dialog = element.shadowRoot?.querySelector('dialog') as HTMLDialogElement;
    element.open();

    const cancelButton = element.shadowRoot?.querySelector('.cancel-button') as HTMLButtonElement;
    cancelButton?.click();

    expect(dialog?.open).toBe(false);
  });

  it('should close dialog when close button is clicked', () => {
    const dialog = element.shadowRoot?.querySelector('dialog') as HTMLDialogElement;
    element.open();

    const closeButton = element.shadowRoot?.querySelector('.close-button') as HTMLButtonElement;
    closeButton?.click();

    expect(dialog?.open).toBe(false);
  });

  it('should render dialog with i18n English', async () => {
    const i18n = await import('../i18n');
    i18n.default.locale = 'en';
    element = await fixture(html`<delete-dialog .employeeName=${'John Doe'} .employeeId=${1}></delete-dialog>`);

    const title = element.shadowRoot?.querySelector('.dialog-title');
    expect(title?.textContent).toContain('Are you sure?');
  });

  it('should render dialog with i18n Turkish', async () => {
    const i18n = await import('../i18n');
    i18n.default.locale = 'tr';
    element = await fixture(html`<delete-dialog .employeeName=${'John Doe'} .employeeId=${1}></delete-dialog>`);

    const title = element.shadowRoot?.querySelector('.dialog-title');
    expect(title?.textContent).toContain('Emin misiniz?');
  });

  it('should have proper CSS classes for styling', () => {
    const dialogContent = element.shadowRoot?.querySelector('.dialog-content');
    const dialogHeader = element.shadowRoot?.querySelector('.dialog-header');
    const dialogActions = element.shadowRoot?.querySelector('.dialog-actions');

    expect(dialogContent).toBeTruthy();
    expect(dialogHeader).toBeTruthy();
    expect(dialogActions).toBeTruthy();
  });

  it('should display correct button text in English', async () => {
    const i18n = await import('../i18n');
    i18n.default.locale = 'en';
    element = await fixture(html`<delete-dialog .employeeName=${'John Doe'} .employeeId=${1}></delete-dialog>`);

    const proceedButton = element.shadowRoot?.querySelector('.proceed-button');
    const cancelButton = element.shadowRoot?.querySelector('.cancel-button');

    expect(proceedButton?.textContent?.trim()).toBe('Proceed');
    expect(cancelButton?.textContent?.trim()).toBe('Cancel');
  });

  it('should display correct button text in Turkish', async () => {
    const i18n = await import('../i18n');
    i18n.default.locale = 'tr';
    element = await fixture(html`<delete-dialog .employeeName=${'John Doe'} .employeeId=${1}></delete-dialog>`);

    const proceedButton = element.shadowRoot?.querySelector('.proceed-button');
    const cancelButton = element.shadowRoot?.querySelector('.cancel-button');

    expect(proceedButton?.textContent?.trim()).toBe('Devam Et');
    expect(cancelButton?.textContent?.trim()).toBe('İptal');
  });

  it('should close dialog after Proceed is clicked', () => {
    const dialog = element.shadowRoot?.querySelector('dialog') as HTMLDialogElement;
    element.open();

    const proceedButton = element.shadowRoot?.querySelector('.proceed-button') as HTMLButtonElement;
    proceedButton?.click();

    expect(dialog?.open).toBe(false);
  });
});
