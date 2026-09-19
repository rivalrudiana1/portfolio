import { useEffect, useState } from 'react';

// Typewriter loop: ketik → jeda → hapus → frasa berikutnya.
// phrases: string[] | string. loop=false berarti berhenti di frasa terakhir.
export function useTypewriter(phrases, { typeSpeed = 70, deleteSpeed = 36, pause = 1400, loop = true } = {}) {
  const list = Array.isArray(phrases) ? phrases : [phrases];
  const listKey = JSON.stringify(list);
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);
  const [prevKey, setPrevKey] = useState(listKey);

  // Reset saat daftar frasa (bahasa) berganti — pola "adjust state during render"
  // yang direkomendasikan React docs, bukan setState di dalam effect.
  if (prevKey !== listKey) {
    setPrevKey(listKey);
    setText('');
    setDone(false);
  }

  useEffect(() => {
    let items = [];
    try {
      items = JSON.parse(listKey);
    } catch {
      return undefined;
    }
    if (!Array.isArray(items) || items.length === 0) return undefined;
    // Guard: pastikan semua item string
    items = items.filter((s) => typeof s === 'string' && s.length > 0);
    if (items.length === 0) return undefined;

    let phrase = 0;
    let char = 0;
    let deleting = false;
    let timer;

    const step = () => {
      const current = items[phrase];
      if (typeof current !== 'string') {
        phrase = (phrase + 1) % items.length;
        char = 0;
        timer = setTimeout(step, 350);
        return;
      }
      if (!deleting) {
        char += 1;
        setText(current.slice(0, char));
        if (char === current.length) {
          if (!loop && phrase === items.length - 1) {
            setDone(true);
            return;
          }
          timer = setTimeout(() => {
            deleting = true;
            step();
          }, pause);
          return;
        }
        timer = setTimeout(step, typeSpeed);
      } else {
        char -= 1;
        setText(current.slice(0, char));
        if (char === 0) {
          deleting = false;
          phrase = (phrase + 1) % items.length;
          timer = setTimeout(step, 350);
          return;
        }
        timer = setTimeout(step, deleteSpeed);
      }
    };

    timer = setTimeout(step, 400);
    return () => clearTimeout(timer);
  }, [listKey, typeSpeed, deleteSpeed, pause, loop]);

  return { text, done };
}
