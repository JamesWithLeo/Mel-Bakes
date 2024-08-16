import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import { IProduct } from "../slice/orderSlice";

export default function ProductTable({
  data,
  addRow,
  updateRow,
}: {
  data: IProduct[];
  addRow: (product: IProduct) => void;
  updateRow: (product: IProduct) => void;
}) {
  const HandleEditingRowSave: MRT_TableOptions<IProduct>["onEditingRowSave"] =
    async ({ values, table }) => {
      updateRow(values);
      table.setEditingRow(null);
    };
  const columns = useMemo<MRT_ColumnDef<IProduct>[]>(
    () => [
      {
        accessorKey: "_id",
        header: "CupcakeId",
        size: 100,
        enableEditing: false,
      },
      { accessorKey: "Name", header: "Product Name", size: 100 },
      { accessorKey: "Price", header: "Price", size: 60 },
      { accessorKey: "Flavor", header: "Flavor", size: 80 },
      { accessorKey: "Quantity", header: "Quantity", size: 60 },
      { accessorKey: "PublicId", header: "Img PublicId", size: 100 },
      { accessorKey: "Description", header: "Desciption", size: 150 },
    ],
    [],
  );
  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnResizing: true,
    enableHiding: true,
    enableRowActions: true,

    enablePagination: true,
    enableRowNumbers: true,
    enableRowVirtualization: true,

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
        Flavor: false,
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
    onEditingRowSave: HandleEditingRowSave,
    renderRowActionMenuItems: ({ closeMenu, row }) => {
      return [
        <div className="flex flex-col gap-2 py-1">
          <button className="px-8 py-2 hover:bg-gray-100">Delete</button>
        </div>,
      ];
    },
    renderTopToolbarCustomActions: ({ table }) => {
      return (
        <div className="flex w-max items-center justify-center px-2 py-1">
          <button
            className="rounded border border-gray-400 px-2 py-1"
            onClick={() => {
              table.setCreatingRow(true);
            }}
          >
            Add Product
          </button>
        </div>
      );
    },
  });
  return <MaterialReactTable table={table} />;
}
