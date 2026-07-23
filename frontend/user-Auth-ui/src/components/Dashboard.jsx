import { useContext } from "react";
import { AuthContext } from "../context/Auth";
export default function Dashboard() {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <p>Loding...</p>;
  }
  return (
    <div>
      <h2>Dashboard Component</h2>
      <p>Welcome {user.email} !</p>
    </div>
  );
}
