"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
  const [openDialong, setOpenDialog] = useState(false);

  function onChangeSelectedIds(value: any) {
    const listUsers = value.rows;
    setSelectedIds(listUsers);
  }

  async function getUsers() {
    try {
      setIsLoading(true);
      const result = await api.get("/users");

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

      setOpenDialog(false);
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
        <div className="p-6 bg-[#18181B] w-full rounded-md">
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-0 justify-between flex-wrap">
            <div>
              <Input
                className="text-white border-[#3F3F46]  sm:min-w-[358]"
                placeholder="Pesquise por nome ou email"
                {...register("search")}
              />
            </div>
            <div className="">
              <Dialog open={openDialong} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button
                    type="button"
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
                  <div className="">
                    <p>
                      Tem certeza de que deseja excluir permanentemente os
                      clientes{" "}
                      {selectedIds.map((value, index) => {
                        return (
                          <span className="text-[#DC2626]">
                            {value.original.name}{" "}
                            {index < selectedIds.length - 1 && ", "}
                          </span>
                        );
                      })}{" "}
                      ? Esta ação não pode ser desfeita e todos os dados
                      relacionados ao cliente, incluindo histórico de
                      empréstimos e faturas, serão removidos permanentemente.
                    </p>
                  </div>
                  <hr />
                  <DialogFooter className="flex justify-end">
                    <DialogClose asChild>
                      <Button
                        type="button"
                        className="bg-[#475569] text-white text-base"
                      >
                        Cancelar
                      </Button>
                    </DialogClose>
                    <Button
                      className="bg-[#dc2626] text-white text-base hover:bg-[#ec9696]"
                      type="button"
                      variant="secondary"
                      onClick={deleteUsers}
                      disabled={selectedIds.length <= 0 ? true : false}
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
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
