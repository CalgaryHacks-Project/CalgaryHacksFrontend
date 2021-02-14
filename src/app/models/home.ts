export interface SidebarItem {
  text: string;
  id: string;
  link?: string;
  icon?: string;
  children?: SidebarItem[];
  mobile?: boolean;
}
