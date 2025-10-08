import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import './language-switcher';
import i18n from '../i18n';

@customElement('app-header')
export class AppHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    header {
      background-color: white;
      padding: 16px 32px;
      display: flex;
      align-items: center;
      gap: 24px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      flex-wrap: wrap;
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
    }

    .logo-container img {
      width: 30px;
      height: 30px;
    }

    .logo-container h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    .spacer {
      flex: 1;
    }

    .employees-link,
    .add-new-link {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      color: #FF6600;
      font-weight: 500;
      padding: 8px 12px;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    .employees-link:hover,
    .add-new-link:hover {
      background-color: #fff5f0;
    }

    svg {
      width: 20px;
      height: 20px;
    }
  `;

  render() {
    return html`
      <header>
        <a href="/" class="logo-container">
            <img src="/ing-logo-2.jpeg" alt="ING Logo" />
            <h2>ING</h2>
        </a>
        <div class="spacer"></div>
        <a href="/" class="employees-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
            d="M18.5 19.5L20 21M11 14C7.13401 14 4 17.134 4 21H11M19 17.5C19 18.8807 17.8807 20 16.5 20C15.1193 20 14 18.8807 14 17.5C14 16.1193 15.1193 15 16.5 15C17.8807 15 19 16.1193 19 17.5ZM15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"
            stroke="#FF6600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          ${i18n.t('header.employees')}
        </a>
        <a href="/add-new.html" class="add-new-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" fill="white" />
            <path d="M12 6V18" stroke="#FF6600" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 12H18" stroke="#FF6600" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          ${i18n.t('header.addNew')}
        </a>
        <language-switcher></language-switcher>
      </header>
    `;
  }
}
