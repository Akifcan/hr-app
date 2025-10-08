import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import i18n from '../i18n';

@customElement('pagination-component')
export class PaginationComponent extends LitElement {
  @property({type: Number})
  currentPage: number = 1;

  @property({type: Number})
  totalPages: number = 1;

  static styles = css`
    :host {
      display: block;
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      margin-top: 2rem;
      padding: 1rem;
    }

    .pagination-button {
      min-width: 40px;
      height: 40px;
      padding: 0.5rem;
      border: 1px solid #dedede;
      background-color: transparent;
      color: #333;
      cursor: pointer;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .pagination-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .pagination-button.active {
      background-color: var(--ing-primary-color);
      color: white;
      border-color: var(--ing-primary-color);
      border-radius: 50%;
      font-weight: bold;
      font-size: 1.1rem;
    }

    .pagination-dots {
      padding: 0 0.5rem;
      color: #666;
    }

    .prev-button, .next-button {
      color: var(--ing-primary-color);
      font-size: 1.5rem;
    }
  `;

  private handlePageChange(page: number) {
    if (page < 1 || page > this.totalPages) return;

    this.dispatchEvent(new CustomEvent('page-change', {
      detail: { page },
      bubbles: true,
      composed: true
    }));
  }

  private getPageNumbers(): (number | string)[] {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (this.totalPages <= maxVisible) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(this.totalPages);
      } else if (this.currentPage >= this.totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = this.totalPages - 4; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(this.totalPages);
      }
    }

    return pages;
  }

  render() {
    const pages = this.getPageNumbers();

    return html`
      <nav class="pagination" role="navigation" aria-label="${i18n.t('pagination.label')}">
        <button
          class="pagination-button prev-button"
          @click=${() => this.handlePageChange(this.currentPage - 1)}
          ?disabled=${this.currentPage === 1}
          aria-label="${i18n.t('pagination.previous')}"
          title="${i18n.t('pagination.previous')}"
        >
          ‹
        </button>

        ${pages.map(page =>
          typeof page === 'number'
            ? html`
                <button
                  class="pagination-button ${page === this.currentPage ? 'active' : ''}"
                  @click=${() => this.handlePageChange(page)}
                  aria-label="${i18n.t('pagination.goToPage', { page })}"
                  aria-current=${page === this.currentPage ? 'page' : 'false'}
                  title="${i18n.t('pagination.page')} ${page}"
                >
                  ${page}
                </button>
              `
            : html`<span class="pagination-dots" aria-hidden="true">${page}</span>`
        )}

        <button
          class="pagination-button next-button"
          @click=${() => this.handlePageChange(this.currentPage + 1)}
          ?disabled=${this.currentPage === this.totalPages}
          aria-label="${i18n.t('pagination.next')}"
          title="${i18n.t('pagination.next')}"
        >
          ›
        </button>
      </nav>
    `;
  }
}
