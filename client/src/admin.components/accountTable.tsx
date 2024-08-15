import { useMemo } from "react";
//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from "material-react-table";
import { IUser } from "../slice/authSlice";

export default function AccountTable({ data }: { data: IUser[] }) {
  const columns = useMemo<MRT_ColumnDef<IUser>[]>(
    () => [
      {
        accessorKey: "_id",
        header: "Id",
        size: 100,
        enableEditing: false,
      },
      { accessorKey: "Gmail", header: "Gmail", size: 100 },
      { accessorKey: "FirstName", header: "First Name", size: 100 },
      { accessorKey: "LastName", header: "Last Name", size: 100 },
      {
        accessorKey: "Type",
        header: "Type",
        size: 80,
        editVariant: "select",
        editSelectOptions: ["user", "admin"],
      },
    ],
    [],
  );
  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnResizing: true,
    enableHiding: true,
    enableRowActions: true,
    enableColumnActions: true,
    enableColumnOrdering: true,
    enableEditing: true,
    enableCellActions: true,
    enableColumnFilterModes: true,
    enableGrouping: true,
    enableFacetedValues: true,
    enableRowSelection: false,
    enableExpandAll: true,
    enableColumnDragging: true,
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
      columnVisibility: {
        Type: false,
      },
    },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiTableProps: {
      size: "small",
    },
    muiTableBodyCellProps: {
      size: "small",
    },
    muiTableHeadCellProps: {
      size: "small",
    },
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "standard",
      rowsPerPageOptions: [10, 20, 30, 50, 100],
      shape: "rounded",
      variant: "text",
    },
    renderRowActionMenuItems: ({ closeMenu, row }) => {
      return [
        <div className="flex flex-col gap-2 py-1">
          <button className="px-8 py-2 hover:bg-gray-100">Delete</button>
          <button className="px-8 py-2 hover:bg-gray-100">Call</button>
        </div>,
      ];
    },
    renderDetailPanel: ({ row }) => (
      <div>
        <h1>Cart</h1>
        <h1>item: {row.original.Cart.length}</h1>
      </div>
    ),
  });

  return <MaterialReactTable table={table} />;
}
