import { getPermission } from "../store/profile.store";

export const isPermission = (permission_name: string): boolean => {
  const permissions = getPermission();
  const findPermission = permissions?.findIndex(
    (item: any) => item.name === permission_name,
  );
  if (findPermission != -1) {
    return true;
  } else {
    return false;
  }
};
