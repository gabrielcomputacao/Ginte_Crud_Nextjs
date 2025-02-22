import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import circle from "@/assets/circle-chevron-left.svg";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { UserRequest } from "@/components/dataTable/columns";

const UserFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Precisa ter pelo menos 3 letras" })
    .transform((value) => value.toLocaleLowerCase()),
  email: z.string().email("E-mail inválido"),
  phone: z
    .string()
    .min(10, { message: "Precisa conter ddd e o número" })
    .refine(
      (phone) => {
        const onlyNumbers = phone.replace(/\D/g, "");
        return onlyNumbers.length === 10 || onlyNumbers.length === 11;
      },
      { message: "Precisa ser um número válido" }
    ),
  birthdate: z.string(),
  address: z.string().transform((value) => value.toLocaleLowerCase()),
});

type UserFormData = z.infer<typeof UserFormSchema>;

export default function Add() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(UserFormSchema),
  });

  const [objectRequest, setObjectRequest] = useState<UserRequest>(
    {} as UserRequest
  );

  async function handleFormSubmit(data: UserFormData) {
    if (objectRequest.type != "update") {
      try {
        const result = await api.post("/users", {
          name: data.name,
          email: data.email,
          phone: data.phone,
          birthdate: data.birthdate,
          address: data.address,
        });

        if (result.status !== 201) {
          throw new Error();
        }

        reset();
        toast("Dados cadastrados com sucesso!", {
          style: {
            backgroundColor: "#16A34A",
            color: "white",
          },
        });
      } catch (err) {
        toast("Erro ao cadastrar usuário.Contate o suporte técnico.", {
          style: {
            backgroundColor: "#DC2626",
            color: "white",
          },
        });
      }
    } else {
      try {
        const userUpdate = await api.put("/users", {
          id: objectRequest.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          birthdate: data.birthdate,
          address: data.address,
        });

        if (userUpdate.status !== 202) {
          throw new Error();
        }

        toast("Dados cadastrados com sucesso!", {
          style: {
            backgroundColor: "#16A34A",
            color: "white",
          },
        });
      } catch (err) {
        toast("Erro ao atualizar usuário.Contate o suporte técnico.", {
          style: {
            backgroundColor: "#DC2626",
            color: "white",
          },
        });
      }
    }
  }

  useEffect(() => {
    const savedUser = localStorage.getItem("userToEdit");
    if (savedUser) {
      const objectUser = JSON.parse(savedUser);

      setObjectRequest(objectUser);

      setValue("name", objectUser.name);
      setValue("email", objectUser.email);
      setValue("phone", objectUser.phone);
      setValue("birthdate", objectUser.birthdate);
      setValue("address", objectUser.address);

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
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex flex-col w-full">
                  <Input
                    className="border-[#3F3F46] text-white"
                    placeholder="Nome *"
                    {...register("name")}
                  />
                  <span className="text-red-500 text-sm">
                    {errors?.name?.message}
                  </span>
                </div>
                <div className="flex flex-col w-full">
                  <Input
                    className="border-[#3F3F46] text-white"
                    placeholder="E-mail *"
                    {...register("email")}
                  />
                  <span className="text-red-500 text-sm">
                    {errors?.email?.message}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col w-full">
                  <Input
                    className="border-[#3F3F46] text-white"
                    placeholder="Telefone *"
                    {...register("phone")}
                  ></Input>
                  <span className="text-red-500 text-sm">
                    {errors?.phone?.message}
                  </span>
                </div>
                <div className="flex flex-col w-full">
                  <Input
                    className="border-[#3F3F46] text-white"
                    placeholder="Data de nascimento *"
                    {...register("birthdate")}
                  />
                  <span className="text-red-500 text-sm">
                    {errors?.birthdate?.message}
                  </span>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-col w-full">
                  <Input
                    className="border-[#3F3F46] text-white"
                    placeholder="Endereço *"
                    {...register("address")}
                  />
                  <span className="text-red-500 text-sm">
                    {errors?.address?.message}
                  </span>
                </div>
              </div>
              <div className="w-full flex justify-end gap-2">
                <Button
                  type="button"
                  className="bg-[#4B4B4B] text-base"
                  onClick={() => {
                    reset();
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="flex gap-1 bg-[#16A34A] text-base justify-center items-center"
                >
                  Cadastrar
                  <PlusIcon className="mt-[2px]" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
