import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase/config";

const RoomPages = ({ setİsAuth, setRooms }) => {
  //*Kullanıcının oturumunu sonlandırma
  const handleLogout = () => {
    //*firebase ile açtığımız oturumu sonlandırma
    signOut(auth).then(() => {
      //localstorageden kaldırma
      localStorage.removeItem("token");
      //login sayfasına yönlendirmeyi tetikler
      setİsAuth(false);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // oda ismini Küçük harfe çevirme
    const roomName = e.target[0].value.toLowerCase();

    //state'i güncelleme
    setRooms(roomName);
  };
  return (
    <form className='room-page' onSubmit={handleSubmit}>
      <h1>Chat Odası</h1>
      <p>Hangi odaya Giriceksiniz</p>
      <input type='text' placeholder='örn:haftasonu' />
      <button type='submit'>Odaya Gir</button>
      <button type='button' onClick={handleLogout}>
        Çıkış Yap
      </button>
    </form>
  );
};

export default RoomPages;
