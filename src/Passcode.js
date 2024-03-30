import React, { useState, useRef} from 'react';
import './Passcode.css';

const Passcode = ({ codeList, sumNumbersInArray }) => {
  const sum = sumNumbersInArray(codeList);
  const [code, setCode] = useState(Array(sum).fill(''));
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const inputRefs= useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;

    if (/^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      setShowErrorMessage(false);
      
      const nextIndex = index + 1;
      if (nextIndex < inputRefs.current.length) {
        if (inputRefs.current[nextIndex]) {
          inputRefs.current[nextIndex].focus();
        }
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
      inputRefs.current[index - 1].focus();
      
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
    event.preventDefault();

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
  
      // Wypełniamy kolejne pola wejściowe wklejonymi znakami, od bieżącego indeksu
      for (let i = 0; i < pastedChars.length; i++) {
        const newIndex = index + i;
        if (newIndex < code.length) {
          newCode[newIndex] = pastedChars[i];
          lastFilledIndex = newIndex; // Aktualizujemy indeks ostatniego wypełnionego pola
        }
      }
      // Ustawiamy nową tablicę wartości wprowadzonych
      setCode(newCode);

      // Przesuwamy fokus do ostatniego wypełnionego pola wejściowego +1, lub na ostatni input
      const nextIndex = lastFilledIndex + 1;
      if (nextIndex < code.length) {
        inputRefs.current[nextIndex]?.focus();
      } else {
        inputRefs.current[code.length - 1]?.focus();
      }
      setShowErrorMessage(false);
    } else {
      setShowErrorMessage(true);
    }
  };
  
  const handleButtonClick = () => {
    setShowErrorMessage(false);
  
    // Sprawdź, czy wszystkie pola wejściowe są wypełnione
    if (code.every(item => item !== '')) {
      let passcodeString = '';
      let currentIndex = 0;
  
      codeList.forEach((item) => {
        if (typeof item === 'number') {
          const endIndex = currentIndex + item;
          passcodeString += code.slice(currentIndex, endIndex).join('');
          currentIndex = endIndex;
        } else {
          passcodeString += item;
        }
      });
      alert("Twój passcode to: " + passcodeString);
    } else {
      alert('Wypełnij wszystkie pola!');
    }
  };
  
  const generateInputs = () => {
    let index = 0;
  
    const inputs = codeList.map((item, itemIndex) => {
      if (typeof item === 'number') {
        const inputArray = Array.from({ length: item }, (_, i) => {
          const currentIndex = index + i;
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
        index += item;
        return inputArray;
      } else {
        return <span className="separators" key={itemIndex}>{item}</span>;
      }
    });
  
    return inputs.flat();
  };
  
  return (
    <div>
    <div className="passcode-container">
      <div className="passcode-title">
      <h3>{`Wprowadź ${sum} cyfrowy passcode:`}</h3>
      </div>
      <div className="passcode-inputs">
        {generateInputs()}
      </div>
      <div className="passcode-message">
        {showErrorMessage && <div className="error-message">Tylko cyfry dozwolone!</div>}
        </div>
    </div>
    <div className="passcode-button">
    <button onClick={handleButtonClick}>Sprawdź</button>
    </div>
    </div>
  );
};

export default Passcode;
