import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./firebase/config";
import AuthForm from "./components/AuthForm";
import ChatPage from "./pages/ChatPage/ChatPage";
import FullPageLoader from "./components/FullPageLoader";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <FullPageLoader visible />;

  return (
    <>
      {user ? <ChatPage /> : <AuthForm />}
    </>);
}

export default App;
