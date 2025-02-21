import { AppSiderbar } from "@/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SidebarProvider>
        <AppSiderbar />
        <main className="w-full">{children}</main>
      </SidebarProvider>
    </div>
  );
}
