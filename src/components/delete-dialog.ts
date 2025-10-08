import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import i18n from '../i18n';

@customElement('delete-dialog')
export class DeleteDialog extends LitElement {
  @property({type: String})
  employeeName: string = '';

  @property({type: Number})
  employeeId?: number;

  static styles = css`
    dialog {
      border: none;
      border-radius: 0.5rem;
      padding: 0;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      max-width: 500px;
      width: 90%;
    }

    dialog::backdrop {
      background-color: rgba(0, 0, 0, 0.5);
    }

    .dialog-content {
      padding: 1.5rem;
    }

    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .dialog-title {
      color: var(--ing-primary-color, #FF6600);
      font-size: 1.5rem;
      font-weight: 500;
      margin: 0;
    }

    .close-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
      color: var(--ing-primary-color);
      font-size: 1.5rem;
      line-height: 1;
    }

    .cancel-button {
      background: white;
      color: var(--ing-oxford-blue);
      border: 1px solid var(--ing-oxford-blue);
    }

    .dialog-message {
      color: #333;
      font-size: 1rem;
      margin-bottom: 1.5rem;
    }

    .dialog-actions {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .proceed-button,
    .cancel-button {
      width: 100%;
      padding: 0.75rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .proceed-button {
      background-color: var(--ing-primary-color, #FF6600);
      color: white;
      border: none;
    }

    .proceed-button:hover,
    .cancel-button:hover {
      opacity: 0.8;
    }
  `;

  open() {
    const dialog = this.shadowRoot?.querySelector('dialog');
    dialog?.showModal();
  }

  close() {
    const dialog = this.shadowRoot?.querySelector('dialog');
    dialog?.close();
  }

  private handleProceed() {
    this.dispatchEvent(new CustomEvent('delete-confirmed', {
      detail: { employeeId: this.employeeId },
      bubbles: true,
      composed: true
    }));
    this.close();
  }

  private handleCancel() {
    this.close();
  }

  render() {
    return html`
      <dialog>
        <div class="dialog-content">
          <div class="dialog-header">
            <h2 class="dialog-title">${i18n.t('deleteDialog.title')}</h2>
            <button class="close-button" @click=${this.handleCancel} aria-label="Close dialog">
              ✕
            </button>
          </div>
          <p class="dialog-message">
            ${i18n.t('deleteDialog.message', { name: this.employeeName })}
          </p>
          <div class="dialog-actions">
            <button class="proceed-button" @click=${this.handleProceed}>
              ${i18n.t('deleteDialog.proceed')}
            </button>
            <button class="cancel-button" @click=${this.handleCancel}>
              ${i18n.t('deleteDialog.cancel')}
            </button>
          </div>
        </div>
      </dialog>
    `;
  }
}
