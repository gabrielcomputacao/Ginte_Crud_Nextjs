"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import trash from "@/assets/trash-2.svg";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/dataTable";
import { columns, User } from "@/components/dataTable/columns";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

export default function Home() {
  const [users, setUsers] = useState([]);
  const { register, watch } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const inputSearch = watch("search");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectionChange = (selectedRows: any[]) => {
    const ids = selectedRows.map((user) => user.id);
    setSelectedIds(ids);
  };

  async function getUsers() {
    try {
      const result = await api.get("/users");

      if (result.status != 200) {
        throw new Error();
      }

      setUsers(result.data);
    } catch (error) {
      toast("Erro ao buscar usuários.Contate o suporte técnico.", {
        style: {
          backgroundColor: "#DC2626",
          color: "white",
        },
      });
    }
  }

  async function getSearchUsers(search: string) {
    try {
      const result = await api.get(`/users?search=${search}`);

      setUsers(result.data);
    } catch (error) {
      toast(
        "Erro ao buscar usuários pelo termo de busca.Contate o suporte técnico.",
        {
          style: {
            backgroundColor: "#DC2626",
            color: "white",
          },
        }
      );
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (inputSearch.length > 1) {
      const timeoutId = setTimeout(() => {
        getSearchUsers(inputSearch);
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      getUsers();
    }
  }, [inputSearch]);

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
                {...register("search")}
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
