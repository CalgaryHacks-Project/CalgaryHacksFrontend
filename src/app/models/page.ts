/**
 * Page
 * Window
 * Sidebar
 * Notifications
 */
export interface WindowOptions {
  windowWidth: number;
  xl: boolean;
  lg: boolean;
  md: boolean;
  sm: boolean;
  scrollY: number;
  lgOnly: boolean;
  mdOnly: boolean;
  smOnly: boolean;
}
export interface PageOptions {}

export interface NotificationsOptions {
  clickable?: boolean;
}

export interface SidebarOptions {
  open: boolean;
}
