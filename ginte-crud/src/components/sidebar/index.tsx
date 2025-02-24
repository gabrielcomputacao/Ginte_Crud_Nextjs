import Link from "next/link";
import {
  SidebarContent,
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarFooter,
} from "../ui/sidebar";
import Image from "next/image";
import marca from "@/assets/marca.svg";
import plus from "@/assets/plus.svg";
import logout from "@/assets/log-out.svg";
import people from "@/assets/users-round.svg";

const items = [
  {
    title: "Clientes",
    url: "/",
    icon: people,
    alt: "Clientes",
  },
  {
    title: "Cadastrar Cliente",
    url: "/add",
    icon: plus,
    alt: "Cadastrar cliente",
  },
];

export const AppSiderbar = () => {
  return (
    <Sidebar>
      <SidebarContent className="px-4 py-8">
        <SidebarGroup>
          <div className="w-full flex justify-center mb-12">
            <Image src={marca} alt="Ginte" width={50} height={50} />
          </div>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuButton asChild className="w-full" key={index}>
                  <Link href={item.url}>
                    <div className="flex gap-3 items-center">
                      <Image
                        src={item.icon}
                        alt={item.alt}
                        height={24}
                        width={24}
                      />
                      <span className="text-[#212121]">{item.title}</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-4 py-8">
        <div className="w-full flex p-2">
          <Link href="/">
            <div className="flex gap-3 items-center">
              <Image
                src={logout}
                alt="sair"
                height={24}
                width={24}
                className="ml-2"
              />
              <span className="text-[#DC2626] text-base">Sair</span>
            </div>
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
