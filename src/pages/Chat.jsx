import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import Messages from "../components/Messages";

const Chat = ({ rooms, setRooms }) => {
  const [messages, setMessages] = useState(null);
  //*Kolleksiyonun referansını al
  const messagesRef = collection(db, "messages");
  //*mesaj gönderme
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target[0].value;
    //veritabanına yeni document ekler
    await addDoc(messagesRef, {
      text,
      rooms,
      author: {
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(), //*sunucunun zamanını alır
    });
    //formu temizle
    e.target[0].value = "";
  };
  //

  //kolleksiyondaki değişimi canlı olarak izleme
  useEffect(() => {
    //*Filtreleme ayarları tanımlama
    const options = query(
      messagesRef,
      where("rooms", "==", rooms),
      orderBy("createdAt", "asc")
    );
    //*Koleksiyon her değiştiğinde
    //*bir fonksiyon çaıştırıp fonksiyona güncel dökümanları parametere olarak gönderir

    const unSubscribe = onSnapshot(options, (snapshot) => {
      //*mesajları stateden önce geçici olarak tuttuğumuz alan
      const tempData = [];
      //*doc'ların verilerine erişip yeni diziye gönderiyoruz
      snapshot.docs.forEach((doc) => tempData.push(doc.data()));
      //
      //*state'i güncelliyoruz
      setMessages(tempData);
      //
    });
    //bilşenden ayrılırsam izleyici iptal edilir
    return () => unSubscribe();
  }, []);
  return (
    <div className='chat'>
      <header>
        <p>{auth?.currentUser?.displayName}</p>
        <p>{rooms}</p>
        <button onClick={() => setRooms()}>Farklı Oda</button>
      </header>
      <main>
        {messages?.map((data, i) => (
          <Messages key={i} data={data} />
        ))}
      </main>
      <form onSubmit={handleSubmit}>
        <input type='text' required placeholder='mesajınızı yazınız...' />
        <button>Gönder</button>
      </form>
    </div>
  );
};

export default Chat;
