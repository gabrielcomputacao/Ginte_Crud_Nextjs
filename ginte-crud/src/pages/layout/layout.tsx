import { AppSiderbar } from "@/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SidebarProvider>
        <AppSiderbar />
        <main className="w-full">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
