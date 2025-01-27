export type TMenu = {
  icon?: React.ReactNode;
  label: string;
  path: string;
  permissions: string[];
};

export type TNavbarMenu = {
  label?: string;
  menus: TMenu[];
};
