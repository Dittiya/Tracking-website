import { useEffect } from "react";
import { useState } from "react";

function Home() {
  const [motd, setMotd] = useState('Waiting...');

  useEffect(() => {
    fetchMotd().then((resp) => {
      setMotd(resp['message_1']);
    });
  });

  async function fetchMotd() {
    const url = 'https://raw.githubusercontent.com/Dittiya/Tracking-website/master/public/motd.json';
    const getter = await fetch(url);
    const data = await getter.json();

    return data;
  }

  return (
    <div className='container m-4'>
      Hello World!

      <div id="motd">
        {motd}
      </div>
    </div>
  );
}

export default Home;
