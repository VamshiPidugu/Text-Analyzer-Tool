import { FC, useState, useEffect, useRef } from 'react';
import './style.css';
import Form from 'react-bootstrap/Form';
export const App: FC<{ name: string }> = ({ name }) => {
  const containerBox = {
    padding: '1rem 1rem',
    gap: '1rem',
    width: '100%',
    height: '100%',
    borderRadius: '1rem',
    // border:"1px solid red",
    boxShadow:
      'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
    color: '#9e9e9e',
    fontSize: '16px',
    fontWeight: '500',
  };

  const [words, setWords] = useState(0);
  const [chars, setChars] = useState(0);
  const [sent, setSent] = useState(0);
  const [par, setPar] = useState(0);
  const [noun, setpronoun] = useState(0);
  const [longWord, setLongWord] = useState('');
  const [readtime, setreadTime] = useState('');
  const [pronounCount, setPronounCount] = useState(0);

  const [textData, setData] = useState('');
  const [isTextEmpty, setIsTextEmpty] = useState(true);
  const [readTime, setReadTime] = useState('');
  useEffect(() => {
    if (textData.length) {
      charsCount();
      wordCount();
      countSentences();
      countParagraphs();
      calculateReadingTime();
      calculatePronouns();
    } else {
      setChars(0);
      setWords(0);
      setSent(0);
      setPar(0);
      setLongWord('');
      setReadTime('');
      setPronounCount(0);
    }
  }, [textData]);

  const charsCount = () => {
    let count = textData.length;
    setChars(count);
    // const textArray = textData.split("");
    // setChars(textArray.length);
  };

  const wordCount = () => {
    const wordsArray = textData.split(' ');
    let maxlength = 0;
    let longword = '';
    for (let i = 0; i < wordsArray.length; i++) {
      if (wordsArray[i].length > maxlength) {
        maxlength = wordsArray[i].length;
        longword = wordsArray[i];
      }
    }
    setLongWord(longword);
    setWords(wordsArray.length);
  };
  const countSentences = () => {
    const sentencesArray = textData.split('.');
    setSent(sentencesArray.length);
  };

  const countParagraphs = () => {
    const paragraphsArray = textData.split('\n\n');
    setPar(paragraphsArray.length);
  };

  const calculateReadingTime = () => {
    const averageReadingSpeed = 200; // Adjust this value based on your desired
    const words = textData.split(' ');
    const wordCount = words.length;
    const readingTime = Math.ceil(wordCount / averageReadingSpeed);
    setReadTime(readingTime.toString());
  };

  const calculatePronouns = () => {
    const pronouns = [
      'I',
      'you',
      'he',
      'she',
      'it',
      'we',
      'they',
      'me',
      'you',
      'him',
      'her',
      'us',
      'them',
      'myself',
      'yourself',
      'himself',
      'herself',
      'itself',
      'ourselves',
      'yourselves',
      'themselves',
    ];

    const words = textData.split(' ');
    let pronounCount = 0;
    words.forEach((word) => {
      if (pronouns.includes(word.toLowerCase())) {
        console.log(word);
        pronounCount++;
      }
    });
    setPronounCount(pronounCount);
  };

  return (
    <>
      <div style={{ ...containerBox }}>
        <span className="Words">
          <h3>Words</h3>
          <span className="value">{words}</span>
        </span>
        <span className="Words">
          <h3>Characters</h3>
          <span className="value">{chars}</span>
        </span>
        <span className="Words">
          <h3>Sentences</h3>
          <span className="value">{sent}</span>
        </span>
        <span className="Words">
          <h3>Paragraphs</h3>
          <span className="value">{par}</span>
        </span>
        <span className="Words">
          <h3>Pronouns</h3>
          <span className="value">{pronounCount}</span>
        </span>
      </div>
      <div>
        <div className="textBox">
          <textarea
            className="formControl"
            id="exampleFormControlTextarea1"
            placeholder="Paste Text Here"
            value={textData}
            onChange={(e) => setData(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="statistics" style={{ ...containerBox }}>
        Average Reading Time~ <span className="longword"> {readTime}mins</span>
        <br />
        Longest Word: <span className="longword"> {longWord}</span>
      </div>
    </>
  );
};
