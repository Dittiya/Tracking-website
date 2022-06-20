import React, { useEffect, useState } from 'react';
import './Typewriter.css';

function* textGenerator(sentence) {
  var text = '';
  const sentenceToArray = sentence.split("");

  for (const letter of sentenceToArray) {
    text += letter;
    yield [text, false];
  }

  const delay = 15;
  for (let i = 0; i < delay; i++) {
    yield [text, true];
  }
}

export default function Typewriter({ sentence }) {
  const [[text, state], setText] = useState("");

  useEffect(() => {
    const generator = textGenerator(sentence);

    const interval = window.setInterval(() => {
      const { value, done } = generator.next();

      if (done) {
        window.clearInterval(interval);
      } else {
        setText(value);
      }
    }, 100);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const className = `typewriter ${state ? 'caret-blink' : ''}`;

  return <div className={className}>{text}</div>
}
