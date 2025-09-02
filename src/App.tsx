
import { Route, Routes } from "react-router"
import SignUpPage from "./pages/auth/sign-up"
import ProtectedRoute from "./components/ProtectedRoute"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import authService from "./supabase/utils/auth"
import { finishLoading, login } from "./store/authSlice"

import SignInPage from "./pages/auth/sign-in"
import ForgotPasswordPage from "./pages/auth/forgot-password"
import UpdatePasswordPage from "./pages/auth/update-password"
import Home from "./pages/home"
import DashboardPage from "./pages/dashboard"
import Layout from "./pages/layout"
import AddNewNote from "./pages/add-new-note"
import { Toaster } from "./components/ui/sonner"

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for user authentication status
    const checkAuth = async () => {
      const { data: user } = await authService.checkAuth();
      console.log("User data:", user);

      if (user.user) {
        dispatch(login(user));
      }else{
        dispatch(finishLoading());
      }
    };
    checkAuth();
  }, [dispatch]);

  return (
    <>
          <Toaster
        richColors={true}
        position="bottom-right"
      />
    <Routes>

      {/* Protected routes with layout */}
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="home" element={<Home />} />
      </Route>
        <Route path="new/:noteId" element={<AddNewNote title="Create New Note" />} />
        <Route path="update/:noteId" element={<AddNewNote title="Update Note"  />} />
        <Route path="shared/:noteId" element={<AddNewNote title="Shared Note"  isShared />} />

      {/* Auth routes without layout */}
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/update-password" element={<UpdatePasswordPage />} />
    </Routes>
    </>
  )
}

export default App