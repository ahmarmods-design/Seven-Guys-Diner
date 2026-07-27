import { createContext, useContext } from "react";

interface AdminNavContextType {
  navigate: (key: string) => void;
}

export const AdminNavContext = createContext<AdminNavContextType>({ navigate: () => {} });
export function useAdminNav() { return useContext(AdminNavContext); }
