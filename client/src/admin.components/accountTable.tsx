import { useMemo } from "react";
//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_TableOptions,
} from "material-react-table";
import { IAccount } from "../appTypes";
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
        header: "MongoDb id",
        size: 100,
        maxSize: 250,
        enableGrouping: false,
        enableSorting: false,
        enableColumnDragging: false,
        enableEditing: false,
      },
      {
        accessorKey: "uid",
        header: "Firebase Id",
        size: 100,
        maxSize: 250,
        enableGrouping: false,
        enableSorting: false,
        enableColumnDragging: false,
        enableEditing: false,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 100,
        maxSize: 250,
        enableColumnDragging: false,
        enableClickToCopy: true,
        enableGrouping: false,
        enableSorting: false,
        enableEditing: false,
      },

      {
        accessorKey: "firstName",
        header: "First Name",
        size: 100,
        enableClickToCopy: true,
        maxSize: 200,
        enableSorting: false,
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        enableClickToCopy: true,
        size: 100,
        maxSize: 200,
        enableSorting: false,
      },
      {
        accessorKey: "role",
        header: "role",
        size: 80,
        maxSize: 100,
        editVariant: "select",
        editSelectOptions: ["user", "admin", "courier"],
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 100,
        maxSize: 200,
        enableClickToCopy: true,
      },
      {
        accessorKey: "gender",
        header: "gender",
        size: 100,
        maxSize: 150,
        editVariant: "select",
        editSelectOptions: ["male", "female", "other"],
      },
    ],
    [],
  );

  const handleSaveAccount: MRT_TableOptions<IAccount>["onCreatingRowSave"] =
    async ({ values, table }) => {
      if (
        !values.firstName ||
        !values.lastName ||
        !values.address ||
        !values.role
      )
        return;

      addRow(values);
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
      density: "compact",
      showColumnFilters: true,
      showGlobalFilter: true,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
      columnVisibility: {},
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
        if (row.original._id) deleteRow(row.original._id);
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
      </div>
    ),
  });

  return <MaterialReactTable table={table} />;
}
