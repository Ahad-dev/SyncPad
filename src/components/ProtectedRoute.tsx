import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const auth = useSelector((state: any) => state.auth.auth);
  const loading = useSelector((state: any) => state.auth.loading);

  console.log(auth)
  if (loading) {
    return <p>Loading...</p>; // or a loading spinner
  }

  if (!auth) {
    return <Navigate to="/sign-up" replace />;
  }
  return <>{children}</>;
}
