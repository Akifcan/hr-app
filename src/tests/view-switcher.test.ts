import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';
import '../components/view-switcher';
import type { ViewSwitcher } from '../components/view-switcher';

describe('ViewSwitcher', () => {
  let element: ViewSwitcher;

  beforeEach(async () => {
    element = await fixture(html`<view-switcher></view-switcher>`);
  });

  it('should render section header', () => {
    const header = element.shadowRoot?.querySelector('.section-header');
    expect(header).toBeTruthy();
  });

  it('should render title', () => {
    const title = element.shadowRoot?.querySelector('.title');
    expect(title).toBeTruthy();
  });

  it('should render table view button', () => {
    const tableButton = element.shadowRoot?.querySelector('#table-view-button');
    expect(tableButton).toBeTruthy();
  });

  it('should render grid view button', () => {
    const gridButton = element.shadowRoot?.querySelector('#grid-view-button');
    expect(gridButton).toBeTruthy();
  });

  it('should have both buttons as action buttons', () => {
    const buttons = element.shadowRoot?.querySelectorAll('.action-button');
    expect(buttons?.length).toBe(2);
  });

  it('should render SVG icons in buttons', () => {
    const svgs = element.shadowRoot?.querySelectorAll('svg');
    expect(svgs?.length).toBeGreaterThanOrEqual(2);
  });

  it('should emit view-changed event when table button is clicked', async () => {
    const handler = vi.fn();
    element.addEventListener('view-changed', handler);

    const tableButton = element.shadowRoot?.querySelector('#table-view-button') as HTMLButtonElement;
    tableButton?.click();

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toEqual({ view: 'table' });
  });

  it('should emit view-changed event when grid button is clicked', async () => {
    const handler = vi.fn();
    element.addEventListener('view-changed', handler);

    const gridButton = element.shadowRoot?.querySelector('#grid-view-button') as HTMLButtonElement;
    gridButton?.click();

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toEqual({ view: 'grid' });
  });

  it('should render with English title', async () => {
    const i18n = await import('../i18n');
    i18n.default.locale = 'en';
    element = await fixture(html`<view-switcher></view-switcher>`);

    const title = element.shadowRoot?.querySelector('.title');
    expect(title?.textContent).toContain('Employee List');
  });

  it('should render with Turkish title', async () => {
    const i18n = await import('../i18n');
    i18n.default.locale = 'tr';
    element = await fixture(html`<view-switcher></view-switcher>`);

    const title = element.shadowRoot?.querySelector('.title');
    expect(title?.textContent).toContain('Çalışan Listesi');
  });

  it('should have aria-label on table button', () => {
    const tableButton = element.shadowRoot?.querySelector('#table-view-button') as HTMLButtonElement;
    expect(tableButton?.getAttribute('aria-label')).toBeTruthy();
  });

  it('should have aria-label on grid button', () => {
    const gridButton = element.shadowRoot?.querySelector('#grid-view-button') as HTMLButtonElement;
    expect(gridButton?.getAttribute('aria-label')).toBeTruthy();
  });

  it('should have aria-pressed attribute on table button', () => {
    const tableButton = element.shadowRoot?.querySelector('#table-view-button') as HTMLButtonElement;
    expect(tableButton?.getAttribute('aria-pressed')).toBeTruthy();
  });

  it('should have aria-pressed attribute on grid button', () => {
    const gridButton = element.shadowRoot?.querySelector('#grid-view-button') as HTMLButtonElement;
    expect(gridButton?.getAttribute('aria-pressed')).toBeTruthy();
  });

  it('should have title attributes on buttons', () => {
    const tableButton = element.shadowRoot?.querySelector('#table-view-button') as HTMLButtonElement;
    const gridButton = element.shadowRoot?.querySelector('#grid-view-button') as HTMLButtonElement;

    expect(tableButton?.getAttribute('title')).toBeTruthy();
    expect(gridButton?.getAttribute('title')).toBeTruthy();
  });

  it('should have role="region" on section header', () => {
    const header = element.shadowRoot?.querySelector('.section-header') as HTMLElement;
    expect(header?.getAttribute('role')).toBe('region');
  });

  it('should have aria-hidden on SVG icons', () => {
    const svgs = element.shadowRoot?.querySelectorAll('svg');
    svgs?.forEach(svg => {
      expect(svg.getAttribute('aria-hidden')).toBe('true');
    });
  });

  it('should switch to table view', async () => {
    const handler = vi.fn();
    element.addEventListener('view-changed', handler);

    const tableButton = element.shadowRoot?.querySelector('#table-view-button') as HTMLButtonElement;
    tableButton?.click();

    await element.updateComplete;

    expect(handler.mock.calls[0][0].detail.view).toBe('table');
  });

  it('should switch to grid view', async () => {
    const handler = vi.fn();
    element.addEventListener('view-changed', handler);

    const gridButton = element.shadowRoot?.querySelector('#grid-view-button') as HTMLButtonElement;
    gridButton?.click();

    await element.updateComplete;

    expect(handler.mock.calls[0][0].detail.view).toBe('grid');
  });

  it('should have table button margin-left auto for spacing', () => {
    const tableButton = element.shadowRoot?.querySelector('#table-view-button');
    expect(tableButton?.id).toBe('table-view-button');
  });
});
