import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';
import '../components/language-switcher';
import type { LanguageSwitcher } from '../components/language-switcher';

describe('LanguageSwitcher', () => {
  let element: LanguageSwitcher;

  beforeEach(async () => {
    localStorage.clear();
    element = await fixture(html`<language-switcher></language-switcher>`);
  });

  it('should render current language flag', () => {
    const currentFlag = element.shadowRoot?.querySelector('.current-language img');
    expect(currentFlag).toBeTruthy();
  });

  it('should render other language flag in dropdown', () => {
    const otherFlag = element.shadowRoot?.querySelector('.other-flag img');
    expect(otherFlag).toBeTruthy();
  });

  it('should show English flag when locale is en', async () => {
    // i18n modülü localStorage'dan okuma yaptığı için doğrudan i18n'i değiştirmemiz gerekiyor
    const i18n = await import('../i18n');
    i18n.default.locale = 'en';
    element = await fixture(html`<language-switcher></language-switcher>`);
    const currentFlag = element.shadowRoot?.querySelector('.current-language img') as HTMLImageElement;
    expect(currentFlag?.src).toContain('english.png');
  });

  it('should show Turkish flag when locale is tr', async () => {
    const i18n = await import('../i18n');
    i18n.default.locale = 'tr';
    element = await fixture(html`<language-switcher></language-switcher>`);
    const currentFlag = element.shadowRoot?.querySelector('.current-language img') as HTMLImageElement;
    expect(currentFlag?.src).toContain('turkiye.png');
  });

  it('should save locale to localStorage when switching language', async () => {
    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    });

    const otherButton = element.shadowRoot?.querySelector('.other-flag') as HTMLButtonElement;
    otherButton?.click();

    expect(localStorage.getItem('locale')).toBeTruthy();
  });
});
