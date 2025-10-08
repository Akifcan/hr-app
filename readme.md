# ING Hub Case - Employee Management System

A modern, fully-featured employee management application built with Web Components using Lit framework, TypeScript, and IndexedDB for local data persistence.

## Architecture Overview

This project follows a component-based architecture using Web Components and Lit framework. The application is built with native browser technologies and requires no backend server, using IndexedDB for client-side data persistence.

### Tech Stack

- **Framework**: [Lit 3.3.1](https://lit.dev/) - Lightweight web components library
- **Language**: TypeScript 5.9.3 with strict mode enabled
- **Build Tool**: Vite 7.1.7
- **Database**: IndexedDB (Browser native storage)
- **Internationalization**: i18n-js 4.5.1
- **Testing**: Vitest 3.2.4 with Happy DOM
- **Test Coverage**: @vitest/coverage-v8

### Key Features

- **CRUD Operations**: Create, Read, Update, Delete employees
- **Multi-language Support**: Turkish and English (i18n)
- **Multiple View Modes**: Table view and Grid view
- **Responsive Design**: Mobile-first approach
- **Pagination**: Client-side pagination for better performance
-  **Offline-First**: Works completely offline using IndexedDB
- **Native Web Components**: Reusable, framework-agnostic components
- **Unit Testing**: Comprehensive test coverage
- **Accessibility**: ARIA attributes and semantic HTML

## 📁 Project Structure

```
inghub-case/
├── src/
│   ├── @types/              # TypeScript type definitions
│   │   ├── employee.d.ts    # Employee interface
│   │   └── lit.d.ts         # Lit type augmentations
│   ├── components/          # Lit Web Components
│   │   ├── app-header.ts           # Application header with navigation
│   │   ├── delete-dialog.ts        # Delete confirmation modal
│   │   ├── employee-edit-form.ts   # Employee edit form
│   │   ├── employee-form.ts        # Employee creation form
│   │   ├── employee-grid-item.ts   # Grid view item component
│   │   ├── employee-grid.ts        # Grid view container
│   │   ├── employee-table.ts       # Table view component
│   │   ├── language-switcher.ts    # Language toggle component
│   │   ├── pagination.ts           # Pagination controls
│   │   └── view-switcher.ts        # View mode switcher
│   ├── data/                # Mock data and fixtures
│   │   └── mockData.ts      # Initial employee data
│   ├── i18n/                # Internationalization
│   │   ├── index.ts         # i18n configuration
│   │   └── translations.json # Translation strings
│   ├── services/            # Business logic and data access
│   │   └── indexed-db.ts    # IndexedDB service layer
│   ├── styles/              # Global styles
│   │   └── style.css        # CSS variables and global styles
│   ├── tests/               # Unit tests
│   │   ├── setup.ts         # Test configuration
│   │   └── *.test.ts        # Component tests
│   └── main.ts              # Application entry point
├── public/                  # Static assets
├── index.html               # Employee list page
├── add-new.html             # Add employee page
├── edit-employee.html       # Edit employee page
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vitest.config.ts         # Vitest test configuration
└── readme.md                # This file
```

## 🔧 Technical Implementation

### Web Components with Lit

The application uses Lit framework to create custom web components with TypeScript decorators:

```typescript
@customElement('employee-table')
export class EmployeeTable extends LitElement {
  @state()
  private employees: Employee[] = [];
  
  static styles = css`...`;
  
  render() {
    return html`...`;
  }
}
```

**Key Concepts:**
- `@customElement`: Registers a custom HTML element
- `@state`: Reactive state management
- `@property`: Public reactive properties
- Shadow DOM: Encapsulated styles and markup
- Declarative templates with `html` tagged template literals

### Data Model

#### Employee Interface
```typescript
interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  dateOfEmployment: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  department: string;
  position: string;
}
```

### Data Persistence - IndexedDB

The application uses IndexedDB for client-side storage with a service layer pattern:

**Database Schema:**
- Database Name: `EmployeeDB`
- Object Store: `employees`
- Key Path: `id` (auto-increment)
- Indexes: `email` (unique)

**Service Methods:**
- `initDB()`: Initialize database connection
- `addEmployee(employee)`: Add new employee
- `getAllEmployees()`: Retrieve all employees (sorted by ID DESC)
- `getEmployee(id)`: Get single employee by ID
- `updateEmployee(employee)`: Update existing employee
- `deleteEmployee(id)`: Remove employee
- `clearAll()`: Clear all data

### Internationalization (i18n)

The application supports multiple languages using i18n-js:

- Default locale: Turkish (tr)
- Supported languages: Turkish, English
- Locale persistence: localStorage
- Component-level translation: Each component subscribes to locale changes

**Usage Example:**
```typescript
import i18n from '../i18n';

// In component
${i18n.t('employee.firstName')}
```

### Component Communication

Components communicate using:
1. **Custom Events**: For parent-child communication
   ```typescript
   this.dispatchEvent(new CustomEvent('view-changed', {
     detail: { view: 'table' },
     bubbles: true,
     composed: true
   }));
   ```

2. **Event Listeners**: Parent components listen to child events
   ```typescript
   section?.addEventListener('view-changed', (event: CustomEvent) => {
     // Handle view change
   });
   ```

### Routing

The application uses a multi-page architecture:
- `index.html`: Employee list (table/grid view)
- `add-new.html`: Add new employee form
- `edit-employee.html`: Edit employee form (uses URL parameter for employee ID)

URL Parameter handling:
```typescript
const params = new URLSearchParams(window.location.search);
const employeeId = parseInt(params.get('id') || '0');
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server with hot reload
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
# Build for production
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
# Preview production build locally
npm run preview
```

## 🧪 Testing

The project uses Vitest with Happy DOM for testing.

### Run Tests

```bash
# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Test Coverage

Coverage reports are generated in the `coverage/` directory. The project includes:
- Component unit tests
- Service layer tests
- i18n functionality tests

### Testing Strategy

- **Unit Tests**: Individual component logic
- **Integration Tests**: Component interactions and event handling
- **Service Tests**: IndexedDB operations
- **DOM Testing**: Using @testing-library/dom and @open-wc/testing-helpers

## Build Configuration

### TypeScript Configuration

- Target: ES2022
- Module: ESNext
- Strict mode enabled
- Experimental decorators enabled
- Module resolution: bundler

### Vite Configuration

- Build tool: Vite 7.x
- Module format: ES Modules
- Dev server: Built-in with HMR
- Production: Optimized bundle with code splitting

## 🎨 Styling

### CSS Architecture

- **Global Styles**: `src/styles/style.css`
- **Component Styles**: Scoped CSS using Lit's `css` tagged template
- **CSS Variables**: Theme colors and spacing
- **Shadow DOM**: Styles encapsulated per component

### Design System

```css
:root {
  --ing-primary-color: #FF6600;
  --ing-secondary-color: #00457C;
  --ing-accent-color: #FFA500;
}
```

## 🔒 Data Validation

The application uses native HTML5 form validation:
- `required` attribute for mandatory fields
- `type="email"` for email validation
- `maxlength` for input length constraints
- `pattern` for custom validation rules

## 🌍 Supported Languages

- **Turkish (tr)**: Default language
- **English (en)**: Alternative language

Language persistence uses `localStorage`.

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interfaces
- Horizontal scroll for table on small screens

## 🔄 State Management

State management is handled by:
1. **Lit's Reactive Properties**: Component-level state with `@state()` decorator
2. **IndexedDB**: Persistent application state
3. **localStorage**: User preferences (language, view mode)

## 🛠️ Component Details

### Core Components

1. **app-header**: Application header with logo and language switcher
2. **employee-table**: Tabular view with sorting and actions
3. **employee-grid**: Card-based grid view
4. **employee-form**: Form for creating new employees
5. **employee-edit-form**: Form for editing existing employees
6. **delete-dialog**: Confirmation modal for delete operations
7. **pagination**: Reusable pagination component
8. **view-switcher**: Toggle between table and grid views
9. **language-switcher**: Toggle between supported languages

### Component Lifecycle

Lit components follow standard Web Component lifecycle:
1. `constructor()`: Initialize component
2. `connectedCallback()`: Component added to DOM
3. `firstUpdated()`: After first render
4. `updated()`: After property changes
5. `disconnectedCallback()`: Component removed from DOM

## 🚦 Performance Optimizations

- **Lazy Loading**: Components loaded on demand
- **Code Splitting**: Vite handles automatic code splitting
- **Virtual Scrolling**: Pagination instead of rendering all items
- **Shadow DOM**: Scoped styles prevent global CSS overhead
- **IndexedDB**: Efficient client-side database with indexes


## 🤝 Development Workflow

1. **Component Development**: Create reusable Lit components
2. **Type Safety**: Use TypeScript for type checking
3. **Testing**: Write unit tests for components
4. **Linting**: TypeScript compiler with strict mode
5. **Build**: Production-ready bundles with Vite


