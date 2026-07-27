import { AdminAuthProvider, useAdminAuth } from "./context/AdminAuthContext";
import { AdminLogin } from "./AdminLogin";
import { AdminLayout } from "./AdminLayout";

function AdminRoot() {
  const { isAuthenticated } = useAdminAuth();
  return isAuthenticated ? <AdminLayout /> : <AdminLogin />;
}

export function AdminApp() {
  return (
    <AdminAuthProvider>
      <AdminRoot />
    </AdminAuthProvider>
  );
}
