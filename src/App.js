import React from 'react';
import Passcode from './Passcode.js';

const App = () => {

  const codeList = [2, '/', 5, '=', 3]

  const sumNumbersInArray = (arr) => {
    const numbers = arr.filter(item => typeof item === 'number');
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum;
  }

  return (
    <div>
      <Passcode 
      codeList={codeList}
      sumNumbersInArray={sumNumbersInArray}
      /> 
    </div>
  );
};

export default App;
