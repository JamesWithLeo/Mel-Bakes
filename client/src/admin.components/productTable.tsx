import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import { IProduct } from "../slice/orderSlice";

export default function ProductTable({ data }: { data: IProduct[] }) {
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
      columnVisibility: {},
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
        </div>,
      ];
    },
  });
  return <MaterialReactTable table={table} />;
}
