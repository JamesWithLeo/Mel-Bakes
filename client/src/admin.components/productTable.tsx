import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import { IProduct } from "../AppDataTypes";
import { Public } from "@mui/icons-material";

export default function ProductTable({
  data,
  addRow,
  updateRow,
  deleteRow,
}: {
  data: IProduct[];
  addRow: (product: IProduct) => void;
  updateRow: (product: IProduct) => void;
  deleteRow: (_id: string) => void;
}) {
  const HandleEditingRowSave: MRT_TableOptions<IProduct>["onEditingRowSave"] =
    async ({ values, table }) => {
      updateRow(values);
      table.setEditingRow(null);
    };

  const HandleCreatingRowSave: MRT_TableOptions<IProduct>["onCreatingRowSave"] =
    async ({ values, table }) => {
      addRow(values);
      table.setCreatingRow(null);
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
      { accessorKey: "Stock", header: "Stock", size: 60 },
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
        Description: false,
        PublicId: false,
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
    onCreatingRowSave: HandleCreatingRowSave,
    onEditingRowSave: HandleEditingRowSave,
    renderRowActionMenuItems: ({ closeMenu, row }) => {
      return [
        <div className="flex flex-col gap-2 py-1">
          <button
            className="px-8 py-2 hover:bg-gray-100"
            onClick={() => {
              deleteRow(row.original._id);
            }}
          >
            Delete
          </button>
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
    renderDetailPanel: ({ row }) => (
      <div className="flex w-full items-center justify-center gap-4">
        <div className="flex h-full items-center justify-center gap-2">
          <h1>{row.original.Flavor}</h1>
          <img src={row.original.Url} className="w-32" alt="" />
        </div>
        <div className="w-40 text-justify">
          <h1>{row.original.Description}</h1>
        </div>
      </div>
    ),
  });
  return <MaterialReactTable table={table} />;
}
