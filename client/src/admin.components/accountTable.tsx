import { useMemo } from "react";
//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_TableOptions,
} from "material-react-table";
import { IAccount } from "../slice/authSlice";
export default function AccountTable({
  data,
  addRow,
  deleteRow,
  updateRow,
}: {
  data: IAccount[];
  addRow: (account: IAccount) => void;
  deleteRow: (id: string) => void;
  updateRow: (account: IAccount) => void;
}) {
  const columns = useMemo<MRT_ColumnDef<IAccount>[]>(
    () => [
      {
        accessorKey: "_id",
        header: "Id",
        size: 100,
        enableEditing: false,
      },
      { accessorKey: "Gmail", header: "Gmail", size: 100 },
      {
        accessorKey: "Password",
        header: "Passowrd",
        size: 100,
        enableHiding: false,
      },
      { accessorKey: "FirstName", header: "First Name", size: 100 },
      { accessorKey: "LastName", header: "Last Name", size: 100 },
      {
        accessorKey: "Type",
        header: "Type",
        size: 80,
        editVariant: "select",
        editSelectOptions: ["user", "admin"],
      },
      { accessorKey: "Contact", header: "Contact no.", size: 100 },
      { accessorKey: "Address", header: "Address", size: 100 },
    ],
    [],
  );

  const handleSaveAccount: MRT_TableOptions<IAccount>["onCreatingRowSave"] =
    async ({ values, table }) => {
      if (
        !values.FirstName ||
        !values.LastName ||
        !values.Gmail ||
        !values.Password ||
        !values.Type
      )
        return;

      values.Cart = null;
      addRow(values);
      console.log("done");
      table.setCreatingRow(null);
    };

  const HandleUpdateAccount: MRT_TableOptions<IAccount>["onEditingRowSave"] =
    async ({ values, table }) => {
      updateRow(values);
      table.setEditingRow(null);
    };
  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnResizing: true,
    enableHiding: true,
    enableRowActions: true,
    enableColumnActions: true,
    enableColumnOrdering: true,
    enableEditing: true,
    onEditingRowSave: HandleUpdateAccount,
    enableCellActions: true,
    enableColumnFilterModes: true,
    enableGrouping: true,
    enableFacetedValues: true,
    enableRowSelection: false,
    enableExpandAll: false,
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
        Password: false,
      },
    },
    paginationDisplayMode: "pages",
    createDisplayMode: "modal",
    enableTopToolbar: true,
    onCreatingRowSave: handleSaveAccount,
    renderTopToolbarCustomActions: ({ table }) => (
      <div className="flex px-2 py-1 text-sm">
        <button
          className="rounded border border-gray-400 px-2 py-1"
          onClick={() => {
            table.setCreatingRow(true);
          }}
        >
          Create Account
        </button>
      </div>
    ),
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
      const onDelete = () => {
        deleteRow(row.original._id);
      };
      return [
        <div className="flex flex-col gap-2 py-2">
          <button className="px-8 py-2 hover:bg-gray-100" onClick={onDelete}>
            Delete
          </button>
          <button className="px-8 py-2 hover:bg-gray-100">Call</button>
        </div>,
      ];
    },
    renderDetailPanel: ({ row }) => (
      <div>
        <h1>Cart</h1>
        <h1>item: {row.original.Cart?.length}</h1>
      </div>
    ),
  });

  return <MaterialReactTable table={table} />;
}
