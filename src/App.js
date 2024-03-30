import React from 'react';
import Passcode from './Passcode.js';

const App = () => {

  const codeList = [2, '/', 6, '=', 3]

  const sumNumbersInArray = (arr) => {
    const numbers = arr.filter(item => typeof item === 'number');

    const sum = numbers.reduce((acc, curr) => acc + curr, 0);

    return sum;
  }

  return (
    <div>
      <h1>My App</h1>
      <Passcode 
      codeList={codeList}
      sumNumbersInArray={sumNumbersInArray}
      /> 
    </div>
  );
};

export default App;
