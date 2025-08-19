import { useSelector } from "react-redux";
import { Navigate } from "react-router";


const AuthProtected = () => {
    const { auth } = useSelector((state) => state.auth);
    if (!auth) {
        return <Navigate to="/login" />;
    }
  return (
    <div>auth-protected</div>
  )
}

export default AuthProtected