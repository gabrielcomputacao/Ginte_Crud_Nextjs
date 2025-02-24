import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthdate: string;
  address: string;
  created_at?: string;
};

export type UserRequest = User & {
  type: string;
};

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className=" border-white"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className=" border-white"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: () => <div className="text-left">E-mail</div>,
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: () => <div className="text-left">Telefone</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("phone")}</div>
      );
    },
  },
  {
    accessorKey: "birthdate",
    header: () => <div className="text-left">Nascimento</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("birthdate")}</div>
      );
    },
  },
  {
    accessorKey: "address",
    header: () => <div className="text-left">Endereco</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("address")}</div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const router = useRouter();
      const user = row.original;

      const handleEdit = () => {
        localStorage.setItem(
          "userToEdit",
          JSON.stringify({ ...user, type: "update" })
        );
        router.push("/add");
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEdit}>Editar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
