import React, { useState, useRef} from 'react';
import './Passcode.css';

const Passcode = ({ codeList, sumNumbersInArray }) => {
  const [code, setCode] = useState(Array(sumNumbersInArray(codeList)).fill(''));
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const inputRefs= useRef([]);


  const handleChange = (e, index) => {
    const { value } = e.target;
    // Sprawdź, czy wprowadzany znak jest cyfrą
    if (/^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      setShowErrorMessage(false);
      
      // Przenieś fokus na następne pole wejściowe, jeśli to możliwe
      const nextIndex = index + 1;
      if (nextIndex < inputRefs.current.length) {
        inputRefs.current[nextIndex].focus();
      }
    } else {
      setShowErrorMessage(true);
    }
  };

  const handleBackspace = (event, index) => {
    setShowErrorMessage(false)
    // Jeśli klawisz Backspace jest naciśnięty na ostatnim pustym polu, usuń poprzednie pole
    if (index === code.length - 1 && code[index] === '') {
      const newCode = [...code];
      newCode[index - 1] = '';
      newCode[index] = '';
      setCode(newCode);
      inputRefs.current[index - 1].focus();
    } 
    // Jeśli klawisz Backspace jest naciśnięty na bieżącym pustym polu, przesuń fokus do poprzedniego pola i usuń poprzednie pole
    else if (index > 0 && code[index] === '') {
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
      // setTimeout(() => {
        inputRefs.current[index - 1].focus();
      // }, 0);
      
    } 
    // Jeśli klawisz Backspace jest naciśnięty w polu, które ma wartość, usuń tę wartość
    else {
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
    }
  };
  
  const handleArrowKeys = (event, index) => {
    if (event.key === 'ArrowLeft' && index > 0) {
      // Przesuń fokus do poprzedniego pola w lewo
      inputRefs.current[index - 1].focus();
    } else if (event.key === 'ArrowRight' && index < code.length - 1) {
      // Przesuń fokus do następnego pola w prawo
      inputRefs.current[index + 1].focus();
    }
  };
  
  const handlePaste = (event, index) => {
    event.preventDefault(); // Zapobiegamy domyślnej akcji wklejania
  
    // Pobieramy wklejony tekst
    const pastedText = event.clipboardData.getData('text');
  
    // Sprawdzamy czy wklejony tekst zawiera tylko cyfry
    if (/^\d+$/.test(pastedText)) {
      // Podziel wklejony tekst na pojedyncze znaki
      const pastedChars = pastedText.split('');
  
      // Tworzymy nową tablicę z wartościami wprowadzonymi przez wklejanie
      const newCode = [...code];
  
      // Zmienna do przechowania indeksu ostatniego wypełnionego pola
      let lastFilledIndex = index;
  
      // Wypełniamy kolejne pola wejściowe wklejonymi znakami, począwszy od bieżącego indeksu
      for (let i = 0; i < pastedChars.length; i++) {
        const newIndex = index + i;
        if (newIndex < code.length) {
          newCode[newIndex] = pastedChars[i];
          lastFilledIndex = newIndex; // Aktualizujemy indeks ostatniego wypełnionego pola
        }
      }
  
      // Ustawiamy nową tablicę wartości wprowadzonych
      setCode(newCode);
  
      // Przesuwamy fokus do ostatniego wypełnionego pola wejściowego +1
      inputRefs.current[lastFilledIndex + 1]?.focus();
      setShowErrorMessage(false); // Ukrywamy komunikat, gdy wklejony tekst zawiera tylko cyfry
    } else {
      setShowErrorMessage(true); // Wyświetlamy komunikat, gdy wklejony tekst zawiera coś innego niż cyfry
    }
  };
  
  


  const generateInputs = () => {
    let index = 0;
  
    const inputs = codeList.map((item, itemIndex) => {
      if (typeof item === 'number') {
        const inputArray = Array.from({ length: item }, (_, i) => {
          const currentIndex = index;
          index++;
          return (
            <input
              key={`${itemIndex}-${i}`}
              type="text"
              maxLength={1}
              value={code[currentIndex] || ''}
              onChange={(e) => handleChange(e, currentIndex)}
              onKeyDown={(e) => {
                if (e.key === 'Backspace') {
                  handleBackspace(e, currentIndex);
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                  handleArrowKeys(e, currentIndex);
                }
              }}
              onPaste={(e) => handlePaste(e, currentIndex)}
              ref={(input) => (inputRefs.current[currentIndex] = input)}
              className="passcode-input"
            />
          );
        });
        return inputArray;
      } else {
        return <span key={itemIndex}>{item}</span>;
      }
    });
  
    return inputs.flat();
  };
  

  return (
    <div className="passcode-container">
      <div className="passcode-inputs">
        {generateInputs()}
      </div>
      {showErrorMessage && <div className="error-message">Only numbers allowed!</div>}
    </div>
  );
};

export default Passcode;
