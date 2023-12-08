import React, { useState } from "react";
import AuthPage from "./pages/AuthPage";
import RoomPages from "./pages/RoomPages";
import Chat from "./pages/Chat";

const App = () => {
  //kullanıcının yetkisi var mı state'ini tutuyoruz
  //state'in ilk değerini localStorage'dan alıcaz

  const [isauth, setİsAuth] = useState(localStorage.getItem("token"));
  const [rooms, setRooms] = useState(null);

  // console.log(isauth);

  // console.log(auth); //*burda kullanıcının bütün bilgileri yer alır(auth(config.jsden aldık)içinde currentUser olucak ona bakıcaksın)
  //yetkisi yoksa > giriş
  if (!isauth) {
    return <AuthPage setİsAuth={setİsAuth} />;
  }
  //yetkisi varsa

  return (
    <div className='container'>
      {rooms ? (
        //*oda belirlendiyse > sohbet ekranı
        <Chat rooms={rooms} setRooms={setRooms} />
      ) : (
        //* oda belirlenmediyse > oda seçme
        <RoomPages setİsAuth={setİsAuth} setRooms={setRooms} />
      )}
    </div>
  );
};

export default App;
