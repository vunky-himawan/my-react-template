import { createContext, useContext, useState, type FC, type PropsWithChildren } from "react";
import type { Permission } from "./types";

interface IPermissionState {
  permission: Permission | null;
  isLoading: boolean;
  setPermission: (permission: Permission | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const PermissionContext = createContext<IPermissionState | undefined>(undefined);

export const PermissionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [permission, setPermission] = useState<Permission | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <PermissionContext.Provider
      value={{
        permission,
        isLoading,
        setPermission,
        setIsLoading,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermission = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error("usePermission must be used within a PermissionProvider");
  }
  return context;
};
