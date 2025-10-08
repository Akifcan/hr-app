import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';
import '../components/pagination';
import type { PaginationComponent } from '../components/pagination';

describe('PaginationComponent', () => {
  let element: PaginationComponent;

  beforeEach(async () => {
    element = await fixture(html`<pagination-component .currentPage=${1} .totalPages=${5}></pagination-component>`);
  });

  it('should render pagination buttons', () => {
    const buttons = element.shadowRoot?.querySelectorAll('.pagination-button');
    expect(buttons?.length).toBeGreaterThan(0);
  });

  it('should have previous button disabled on first page', () => {
    const prevButton = element.shadowRoot?.querySelector('.prev-button') as HTMLButtonElement;
    expect(prevButton?.disabled).toBe(true);
  });

  it('should have next button enabled on first page when there are more pages', () => {
    const nextButton = element.shadowRoot?.querySelector('.next-button') as HTMLButtonElement;
    expect(nextButton?.disabled).toBe(false);
  });

  it('should have next button disabled on last page', async () => {
    element = await fixture(html`<pagination-component .currentPage=${5} .totalPages=${5}></pagination-component>`);
    const nextButton = element.shadowRoot?.querySelector('.next-button') as HTMLButtonElement;
    expect(nextButton?.disabled).toBe(true);
  });

  it('should emit page-change event when clicking page button', async () => {
    const handler = vi.fn();
    element.addEventListener('page-change', handler);

    const nextButton = element.shadowRoot?.querySelector('.next-button') as HTMLButtonElement;
    nextButton?.click();

    expect(handler).toHaveBeenCalled();
  });

  it('should have active class on current page button', () => {
    const activeButton = element.shadowRoot?.querySelector('.pagination-button.active');
    expect(activeButton?.textContent?.trim()).toBe('1');
  });

  it('should show ellipsis for many pages', async () => {
    element = await fixture(html`<pagination-component .currentPage=${1} .totalPages=${10}></pagination-component>`);
    const dots = element.shadowRoot?.querySelector('.pagination-dots');
    expect(dots).toBeTruthy();
  });
});
