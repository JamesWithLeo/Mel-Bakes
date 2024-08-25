import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import { IOrder } from "../appTypes";

export default function OrderTable({
  data,
  deleteRow,
}: {
  data: IOrder[];
  deleteRow: (oid: string) => void;
}) {
  const columns = useMemo<MRT_ColumnDef<IOrder>[]>(
    () => [
      {
        accessorKey: "_id",
        header: "Order id",
        size: 100,
        enableEditing: false,
      },
      {
        accessorKey: "U_id",
        header: "User id",
        size: 100,
        enableEditing: false,
      },
      {
        accessorKey: "Name",
        header: "Product",
        size: 80,
        enableEditing: false,
      },
      { accessorKey: "C_id", header: "C_id", enableEditing: false, size: 100 },
      { accessorKey: "Quantity", header: "Quantity", size: 50 },
      { accessorKey: "Amount", header: "Amount", size: 50 },
      {
        accessorKey: "DateOrdered",
        header: "DateOrdered",
        enableSorting: false,
      },
      {
        id: "IsShipping",
        accessorFn: (row) => {
          return String(row.IsShipping);
        },
        accessorKey: "IsShipping",
        header: "IsShipping",
        size: 100,
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
    enableEditing: false,
    enableCellActions: true,
    enableGrouping: true,
    enableColumnDragging: true,
    enableFacetedValues: true,
    enableExpandAll: true,
    paginationDisplayMode: "pages",
    createDisplayMode: "modal",
    enableTopToolbar: true,

    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
    },
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
