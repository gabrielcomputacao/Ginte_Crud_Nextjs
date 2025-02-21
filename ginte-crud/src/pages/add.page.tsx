import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import circle from "@/assets/circle-chevron-left.svg";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { useEffect } from "react";

export default function Add() {
  useEffect(() => {
    const savedUser = localStorage.getItem("userToEdit");
    if (savedUser) {
      console.log(savedUser);
      localStorage.removeItem("userToEdit");
    }
  }, []);

  return (
    <div className="w-full">
      <div className="p-8 w-full">
        <div className="flex gap-2 h-auto">
          <Link href={"/"} className="h-8 mt-1">
            <Image src={circle} alt="voltar" />
          </Link>
          <h1 className="font-semibold text-3xl mb-8">Cadastrar Cliente</h1>
        </div>
        <div className="p-6 bg-[#27272A] w-full rounded-md">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Input
                className="border-[#3F3F46] text-white"
                placeholder="Nome *"
              />
              <Input
                className="border-[#3F3F46] text-white"
                placeholder="E-mail *"
              />
            </div>
            <div className="flex gap-4">
              <Input
                className="border-[#3F3F46] text-white"
                placeholder="Telefone *"
              />
              <Input
                className="border-[#3F3F46] text-white"
                placeholder="Data de nascimento *"
              />
            </div>
            <div className="w-full">
              <Input
                className="border-[#3F3F46] text-white"
                placeholder="Endereço *"
              />
            </div>
            <div className="w-full flex justify-end gap-2">
              <Button className="bg-[#4B4B4B] text-base">Cancelar</Button>
              <Button className="flex gap-1 bg-[#16A34A] text-base justify-center items-center">
                Cadastrar
                <PlusIcon className="mt-[2px]" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
