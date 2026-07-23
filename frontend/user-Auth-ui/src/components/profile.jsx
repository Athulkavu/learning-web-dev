import { useContext } from "react";
import { AuthContext } from "../context/Auth";

export default function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Loding...</p>;
  }

  return (
    <div>
      <h2>Profile Component</h2>
      
      <p>ID - {user._id}</p>
      <p>EMAIL - {user.email}</p>
    </div>
  );
}
