import {LitElement, html, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import i18n from '../i18n/index';

@customElement('language-switcher')
export class LanguageSwitcher extends LitElement {
  @state()
  private currentLocale: string = i18n.locale;

  static styles = css`
  .language-switcher {
    display: flex;
    flex-direction: column;
  }
  .other-flag {
    display: none;
  }
  .language-switcher:hover .other-flag {
    display: block;
    position: absolute;
    top: 50px;
  }
  `;

  private switchLanguage(locale: string) {
    i18n.locale = locale;
    localStorage.setItem('locale', locale);
    this.currentLocale = locale;
    window.location.reload();
  }

  render() {
    const isEnglish = this.currentLocale === 'en';
    const currentFlag = isEnglish ? '/english.png' : '/turkiye.png';
    const currentAlt = isEnglish ? 'English' : 'Türkçe';
    const otherFlag = isEnglish ? '/turkiye.png' : '/english.png';
    const otherAlt = isEnglish ? 'Türkçe' : 'English';
    const otherLocale = isEnglish ? 'tr' : 'en';
    const otherLabel = isEnglish ? 'Türkçe\'ye geç' : 'Switch to English';

    return html`
      <div class="language-switcher">
        <button class="current-language" aria-label="Current language: ${currentAlt}" title="${currentAlt}">
          <img src="${currentFlag}" width="30" height="30" alt="${currentAlt}" class="flag-icon" />
        </button>
          <button
            class="other-flag"
            @click=${() => this.switchLanguage(otherLocale)}
            aria-label="${otherLabel}"
            title="${otherAlt}">
            <img src="${otherFlag}" width="30" height="30" alt="${otherAlt}" class="flag-icon" />
          </button>
      </div>
    `;
  }
}
