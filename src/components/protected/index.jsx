// outlet
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import PageLoader from "../loader/page-loader";

const Protected = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setUser(user));
    return () => unsub();
  }, []);

  if (user === undefined) return <PageLoader />; // Yükleniyor ekranı

  if (user === null) {
    return <Navigate to="/" replace />; // Giriş yapılmamışsa anasayfaya
  }

  if (!user.emailVerified) {
    toast.info("Mailinizi Doğrulayın");
    return <Navigate to="/" replace />; // Email doğrulanmamışsa anasayfaya
  }

  return <Outlet context={user} />; // Her şey tamamsa outlet göster
};

export default Protected;
