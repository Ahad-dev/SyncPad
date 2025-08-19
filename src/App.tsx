
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
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      } />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
  <Route path="/update-password" element={<UpdatePasswordPage />} />
    </Routes>
  )
}

export default App