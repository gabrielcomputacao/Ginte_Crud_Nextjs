import Link from "next/link";
import {
  SidebarContent,
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
} from "../ui/sidebar";
import Image from "next/image";
import marca from "@/assets/marca.svg";
import plus from "@/assets/plus.svg";
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
              {items.map((item) => (
                <SidebarMenuButton asChild className="w-full">
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
    </Sidebar>
  );
};
