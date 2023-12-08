import React, { useEffect } from "react";
import { auth } from "../firebase/config";
import "aos/dist/aos.css";
import AOS from "aos";

const Messages = ({ data }) => {
  useEffect(() => {
    AOS.init({
      // AOS'u başlat
      duration: 500, // Animasyon süresi (isteğe bağlı)
      easing: "ease-in-out", // Animasyon eğrisi (isteğe bağlı)
      once: true, // Animasyonun sadece bir kez çalışmasını sağlar (isteğe bağlı)
    });
  }, []);
  console.log(data);

  //mesajı atan kişinin id'si
  //oturumu açık olan kullanıcının id'sini eşitse
  //yani oturumu açıp ben girdiysem benim id me eşitliyor(google hesabıma)
  if (auth.currentUser.uid === data.author.uid) {
    return (
      <div data-aos='zoom-in' className='msg-user'>
        {data.text}
      </div>
    );
  }
  console.log(data);
  //*Mesajı başka kullanıcı attıysa
  return (
    <div data-aos='zoom-in'>
      <div className='msg-other'>
        <p className='user-info'>
          <img src={data.author.photo} />
          <span>{data.author.name} :</span>
        </p>
        <p className='msg-text'>{data.text}</p>
      </div>
    </div>
  );
};

export default Messages;
