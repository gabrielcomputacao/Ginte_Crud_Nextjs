"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import trash from "@/assets/trash-2.svg";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/dataTable";
import { columns } from "@/components/dataTable/columns";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { DialogClose } from "@radix-ui/react-dialog";

export default function Home() {
  const [users, setUsers] = useState([]);
  const { register, watch } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const [selectedIds, setSelectedIds] = useState<any[]>([]);
  const inputSearch = watch("search");
  const [isLoading, setIsLoading] = useState(false);

  function onChangeSelectedIds(value: any) {
    const listUsers = value.rows;
    setSelectedIds(listUsers);
  }

  async function getUsers() {
    try {
      setIsLoading(true);
      const result = await api.get("/users");

      if (result.status != 200) {
        throw new Error();
      }

      setUsers(result.data);
    } catch (err: any) {
      toast(err.response?.data?.message, {
        style: {
          backgroundColor: "#DC2626",
          color: "white",
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function getSearchUsers(search: string) {
    try {
      setIsLoading(true);
      const result = await api.get(`/users?search=${search}`);

      setUsers(result.data);
    } catch (err: any) {
      toast(err.response?.data?.message, {
        style: {
          backgroundColor: "#DC2626",
          color: "white",
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteUsers() {
    const idUsers = selectedIds.map((value) => value.original.id);

    try {
      const result = await api.delete("/users", { data: { ids: idUsers } });

      if (result.status != 204) {
        throw new Error();
      }

      getUsers();

      toast("Usuários deletados com sucesso!", {
        style: {
          backgroundColor: "#16A34A",
          color: "white",
        },
      });
    } catch (err: any) {
      toast(err.response?.data?.message, {
        style: {
          backgroundColor: "#DC2626",
          color: "white",
        },
      });
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
              <Dialog>
                <DialogTrigger>
                  <Button
                    // onClick={deleteUsers}
                    className="bg-[#DC2626] text-white flex gap-2 font-semibold text-base"
                  >
                    Excluir Selecionados
                    <Image src={trash} alt="Excluir" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-white rounded-lg p-5">
                  <DialogHeader>
                    <DialogTitle className="">
                      <span className="text-[#DC2626]">Cuidado:</span>{" "}
                      <span>Você está prestes a excluir um cliente!</span>
                    </DialogTitle>
                  </DialogHeader>
                  <hr />
                  <div className="flex items-center space-x-2"></div>
                  <hr />
                  <DialogFooter className="flex justify-end">
                    <DialogClose asChild className="">
                      <Button
                        type="button"
                        className="bg-[#475569] text-white text-base"
                      >
                        Cancelar
                      </Button>
                    </DialogClose>
                    <Button
                      className="bg-[#dc2626] text-white text-base"
                      type="button"
                      variant="secondary"
                    >
                      <Image src={trash} alt="Excluir" /> Deletar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div>
            <DataTable
              columns={columns}
              data={users}
              onChangeSelectedIds={onChangeSelectedIds}
              isLoading
            />
          </div>
        </div>
      </div>
    </div>
  );
}
