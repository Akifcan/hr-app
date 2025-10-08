import {LitElement, html, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import i18n from '../i18n/index';

@customElement('language-switcher')
export class LanguageSwitcher extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .language-switcher {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 4px;
      background-color: #f5f5f5;
    }

    button {
      background: none;
      border: none;
      color: #666;
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 3px;
      transition: all 0.2s;
    }

    button:hover {
      background-color: #fff5f0;
      color: #FF6600;
    }

    button.active {
      background-color: #FF6600;
      color: white;
    }
  `;

  @state()
  private currentLocale: string = i18n.locale;

  createRenderRoot() {
    return this;
  }

  private switchLanguage(locale: string) {
    i18n.locale = locale;
    localStorage.setItem('locale', locale);
    this.currentLocale = locale;
    window.location.reload();
  }

  render() {
    return html`
      <div class="language-switcher">
        <button
          class="${this.currentLocale === 'en' ? 'active' : ''}"
          @click=${() => this.switchLanguage('en')}>
          EN
        </button>
        <button
          class="${this.currentLocale === 'tr' ? 'active' : ''}"
          @click=${() => this.switchLanguage('tr')}>
          TR
        </button>
      </div>
    `;
  }
}
