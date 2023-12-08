import { signInWithPopup } from "firebase/auth";
import React, { useEffect } from "react";
import { auth, provider } from "../firebase/config";
import "aos/dist/aos.css";
import AOS from "aos";

const AuthPage = ({ setİsAuth }) => {
  useEffect(() => {
    AOS.init({
      // AOS'u başlat
      duration: 1000, // Animasyon süresi (isteğe bağlı)
      easing: "ease-in-out", // Animasyon eğrisi (isteğe bağlı)
      once: true, // Animasyonun sadece bir kez çalışmasını sağlar (isteğe bağlı)
    });
  }, []);

  //Google ile giriş
  const handlelogin = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        //oturumunun açık olduğunu uygulamada yönetmek için localStorage'e kaydedicez.
        localStorage.setItem("token", res.user.refreshToken);
        //kullanıcı yetkilidir state'ini true'ya çekeriz
        setİsAuth(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div data-aos='zoom-in' className='container'>
      <div className='auth'>
        <h1>Chat Odası</h1>
        <p>Devam etmek için Giriş yapın</p>
        <button onClick={handlelogin}>
          <img src='/public/g-logo.png' alt='google-logo' />
          <span>Google ile Gir</span>
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
