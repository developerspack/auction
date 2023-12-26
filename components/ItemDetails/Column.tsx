"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RiArrowUpDownFill } from "react-icons/ri";
import Moment from "react-moment";

import { Button } from "@/components/ui/button";
import CellActions from "./CellActions";

export const columns: ColumnDef<bidProps>[] = [
  {
    accessorKey: "userPhoto",
    header: "Bidder Photo",
    cell: ({ row }) => (
      <div className="text-center">
        <img
          src={row.getValue("userPhoto")}
          alt="itemImage"
          className="h-10 w-10 rounded-md"
        />
      </div>
    ),
  },

  {
    accessorKey: "userName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-[20px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Bidder
          <RiArrowUpDownFill className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "bid",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-[20px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Bid
          <RiArrowUpDownFill className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("bid"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "Ksh",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Bid",
    cell: ({ row }) => <Moment fromNow>{row.getValue("createdAt")}</Moment>,
  },
  {
    accessorKey: "BidStatus",
    header: "Bid's Status",
    cell: ({ row }) => (
      <>
        {row.getValue("BidStatus") === "pending" ? (
          <p className="bg-blue-500 p-2 w-20 text-center rounded-md">Pending</p>
        ) : (
          <p className="bg-green-500 p-2 w-20 text-center rounded-md">
            Accepted
          </p>
        )}
      </>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
