"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RiArrowUpDownFill } from "react-icons/ri";
import Moment from "react-moment";

import { Button } from "@/components/ui/button";
import CellActions from "./CellActions";

export const columns: ColumnDef<itemProps>[] = [
  {
    accessorKey: "Thumbnail",
    header: "Image",
    cell: ({ row }) => (
      <div className="text-center">
        <img
          src={row.getValue("Thumbnail")}
          alt="itemImage"
          className="h-10 w-10 rounded-md"
        />
      </div>
    ),
  },

  {
    accessorKey: "Name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-[20px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <RiArrowUpDownFill className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "startingPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-[20px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Starting Price
          <RiArrowUpDownFill className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("startingPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "Ksh",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "bidding",
    header: "Bidding is",
  },

  {
    accessorKey: "expiryDate",
    header: "Closes or closed",
    cell: ({ row }) => <Moment fromNow>{row.getValue("expiryDate")}</Moment>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellActions data={row.original} Name="Item" />,
  },
];
