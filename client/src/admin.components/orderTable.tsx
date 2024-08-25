import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import { IOrder } from "../appTypes";

export default function OrderTable({
  data,
  deleteRow,
  updateRow,
}: {
  data: IOrder[];
  deleteRow: (oid: string) => void;
  updateRow: (order: IOrder) => void;
}) {
  const HandleUpdateOrder: MRT_TableOptions<IOrder>["onEditingRowSave"] = ({
    values,
    table,
    row,
  }) => {
    values.IsPacked = values.IsPacked === "true" ? true : false;
    // values.IsShipping = values.IsShipping === "true" ? true : false;
    // values.IsRecieved = values.IsRecieved === "true" ? true : false;
    updateRow(values);
    table.setEditingRow(null);
  };
  const columns = useMemo<MRT_ColumnDef<IOrder>[]>(
    () => [
      {
        accessorKey: "_id",
        header: "Order id",
        size: 100,
        enableEditing: false,
        enableClickToCopy: true,
      },
      {
        accessorKey: "U_id",
        header: "User id",
        size: 100,
        enableEditing: false,
        enableClickToCopy: true,
      },
      {
        accessorKey: "Name",
        header: "Product",
        size: 80,
        enableEditing: false,
        enableClickToCopy: true,
      },
      {
        accessorKey: "C_id",
        header: "C_id",
        enableEditing: false,
        size: 100,
        enableClickToCopy: true,
      },
      {
        accessorKey: "Quantity",
        header: "Quantity",
        size: 50,
        enableEditing: false,
      },
      {
        accessorKey: "Amount",
        header: "Amount",
        size: 50,
        enableEditing: false,
      },
      {
        accessorKey: "DateOrdered",
        header: "DateOrdered",
        enableSorting: false,
        enableEditing: false,
      },
      {
        id: "IsPacked",
        accessorFn: (row) => {
          return String(row.IsPacked);
        },
        accessorKey: "IsPacked",
        header: "IsPacked",
        size: 100,
        editVariant: "select",
        editSelectOptions: ["true", "false"],
      },
      {
        id: "IsShipping",
        accessorFn: (row) => {
          return String(row.IsShipping);
        },
        accessorKey: "IsShipping",
        header: "IsShipping",
        size: 100,
        enableEditing: false,
        editVariant: "select",
        editSelectOptions: ["true", "false"],
      },
      {
        accessorKey: "courierId",
        header: "courierId",
        enableEditing: false,
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
    enableGrouping: true,
    enableColumnDragging: true,
    enableFacetedValues: true,
    enableExpandAll: true,
    paginationDisplayMode: "pages",
    createDisplayMode: "modal",
    enableTopToolbar: true,
    initialState: {
      density: "compact",
      showColumnFilters: true,
      showGlobalFilter: true,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
      columnVisibility: {
        _id: false,
        U_id: false,
        C_id: false,
      },
    },
    onEditingRowSave: HandleUpdateOrder,
    renderRowActionMenuItems: ({ closeMenu, row }) => {
      const onDelete = () => {
        if (row.original._id) deleteRow(row.original._id);
      };
      return [
        <div className="flex flex-col gap-2">
          <button className="px-8 py-1 hover:bg-gray-100" onClick={onDelete}>
            Delete
          </button>
        </div>,
      ];
    },
  });
  return <MaterialReactTable table={table} />;
}
