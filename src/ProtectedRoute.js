import Login from './Login';
import { useAuth } from "./Auth";

const ProtectedRoute = ({children}) => {
  const [loggedIn] = useAuth();
  console.log("ProtectedRoute is ", loggedIn)
  if (!loggedIn) {
    return <Login />;
  }
  return children;
}

export default ProtectedRoute;