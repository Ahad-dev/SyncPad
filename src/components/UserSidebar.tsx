import {
  Sidebar,
  SidebarGroup,
  SidebarContent,
  SidebarGroupContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import LogoHeader from "./LogoHeader";
import {
  LucideLayoutDashboard,
  LucideLogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import UserDropDown from "./user-dropdown";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const MENU_ITEMS = [
  {
    title: "Dashboard",
    icon: LucideLayoutDashboard,
    href: "/",
  },
  {
    title: "Logout",
    icon: LucideLogOut,
    href: "/logout",
  },
];

const UserSidebar = () => {
    const location = useLocation();
    const {state}  = useSidebar()
    const {user} = useSelector((state:RootState) => state.auth);


    console.log("Current location:", location.pathname);
  return (
    <Sidebar collapsible="icon" variant="sidebar" className="border">
      <SidebarHeader className={`ml-4 mt-3 ${state === "collapsed" ? "ml-0" : ""}`}>
        <LogoHeader />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="overflow-hidden">
            <SidebarMenu className={` space-y-3 ml-4 mt-3 ${state === "collapsed" ? "ml-0" : ""}`}>
              {MENU_ITEMS.map((item, index) => (
                <SidebarMenuItem key={index}  >
                  <SidebarMenuButton asChild
                    className={cn(
                      "h-10 hover:bg-gradient-to-r from-sidebar-accent from-5% to-sidebar-accent/50  hover:scale-105 transition-[scale]",
                      location.pathname === item.href && "bg-gradient-to-r from-sidebar-accent to-sidebar-accent/50 border-[5D6B68]/10 "
                    )}
                    isActive={location.pathname===item.href}
                  >
                    <Link to={item.href} className="flex items-center gap-2">
                        <item.icon className="size-5" />
                        <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter
    //    className={`ml-4 mb-3 ${state === "collapsed" ? "ml-0" : ""}`}
       >
        <UserDropDown
            email={user?.user_metadata.email}
            name={user?.user_metadata.full_name}
            plan="Premium"
            avatarUrl={user?.user_metadata.avatar_url || "/logo.png"} // Default avatar URL
        />
      </SidebarFooter>
    </Sidebar>
  );
};

export default UserSidebar;
