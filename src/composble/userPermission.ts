import { getPermission } from "../store/profile.store";

export function usePermission() {
  const isPermission = (permission: string) => {
    const permissions = getPermission();
    return permissions?.some((item: any) => item.name === permission);
  };

  return {
    isPermission,
  };
}
