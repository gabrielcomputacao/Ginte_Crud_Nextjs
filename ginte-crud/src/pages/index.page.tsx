import { Button } from "@/components/ui/button";
import Image from "next/image";
import trash from "@/assets/trash-2.svg";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/dataTable";
import { columns, User } from "@/components/dataTable/columns";

const users: User[] = [
  {
    id: "u1a2b3c4",
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "(123) 456-7890",
    birthdate: "1990-05-15",
    address: "123 Main St, Springfield, IL",
  },
  {
    id: "v5d6e7f8",
    name: "Jane Smith",
    email: "janesmith@example.com",
    phone: "(987) 654-3210",
    birthdate: "1985-08-22",
    address: "456 Elm St, Shelbyville, IL",
  },
  {
    id: "g9h0i1j2",
    name: "Michael Johnson",
    email: "michaelj@example.com",
    phone: "(555) 123-4567",
    birthdate: "1992-11-30",
    address: "789 Oak St, Capital City, IL",
  },
  {
    id: "k3l4m5n6",
    name: "Emily Davis",
    email: "emilyd@example.com",
    phone: "(222) 333-4444",
    birthdate: "1988-07-19",
    address: "321 Pine St, Ogdenville, IL",
  },
  {
    id: "o7p8q9r0",
    name: "David Wilson",
    email: "davidw@example.com",
    phone: "(777) 888-9999",
    birthdate: "1995-03-25",
    address: "654 Cedar St, North Haverbrook, IL",
  },
];

export default function Home() {
  return (
    <div className="w-full">
      <div className="p-8 w-full">
        <h1 className="font-semibold text-3xl mb-8">Clientes</h1>
        <div className="p-6 bg-[#27272A] w-full rounded-md">
          <div className="flex justify-between">
            <div>
              <Input
                className="text-white border-[#3F3F46] min-w-[358]"
                placeholder="Pesquise por nome ou email"
              />
            </div>
            <div className="">
              <Button className="bg-[#DC2626] text-white flex gap-2 font-semibold text-base">
                Excluir Selecionados
                <Image src={trash} alt="Excluir" />
              </Button>
            </div>
          </div>
          <div>
            <DataTable columns={columns} data={users} />
          </div>
        </div>
      </div>
    </div>
  );
}
