import type { AppHeader } from "../components/app-header";
import type { DeleteDialog } from "../components/delete-dialog";
import type { EmployeeEditForm } from "../components/employee-edit-form";
import type { EmployeeForm } from "../components/employee-form";
import type { EmployeeGrid } from "../components/employee-grid";
import type { EmployeeGridItem } from "../components/employee-grid-item";
import type { EmployeeTable } from "../components/employee-table";
import type { LanguageSwitcher } from "../components/language-switcher";
import type { PaginationComponent } from "../components/pagination";
import type { ViewSwitcher } from "../components/view-switcher";

declare global {
  interface HTMLElementTagNameMap {
    "app-header": AppHeader;
    "delete-dialog": DeleteDialog;
    "employee-edit-form": EmployeeEditForm;
    "employee-form": EmployeeForm;
    "employee-grid-item": EmployeeGridItem;
    "employee-grid": EmployeeGrid;
    "employee-table": EmployeeTable;
    "language-switcher": LanguageSwitcher;
    "view-switcher": ViewSwitcher;
  }
}