# Passcode Validator

Repozytorium zawiera komponent React Passcode, który umożliwia użytkownikowi wprowadzenie passcode'u zdefiniowanego na podstawie listy liczb i separatorów.

## Instalacja i Użycie

Aby zainstalować i uruchomić aplikację, wykonaj następujące kroki:

1. Sklonuj repozytorium:
   ```sh
   git clone https://github.com/username/passcode-validator.git
   ```

2. Przejdź do katalogu projektu:
   ```sh
   cd passcode-validator
   ```

3. Zainstaluj zależności:
   ```sh
   npm install
   ```

4. Uruchom aplikację:
   ```sh
   npm start
   ```

## Konfiguracja

Nie wymaga dodatkowej konfiguracji.

## Wykorzystane Technologie

- React
- JavaScript
- CSS

## Użycie

Aby użyć komponentu Passcode, zaimportuj go do swojej aplikacji React i przekaż odpowiednie propsy: `codeList` oraz `sumNumbersInArray`.

## Przykład

```jsx
import React from 'react';
import Passcode from './Passcode';

const App = () => {
  const codeList = [4, '-', 3, '-', 3];
  const sumNumbersInArray = (arr) => {
    const numbers = arr.filter(item => typeof item === 'number');
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum;
  }

  return (
    <div>
      <h1>Passcode Validator</h1>
      <Passcode codeList={codeList} sumNumbersInArray={sumNumbersInArray} />
    </div>
  );
};

export default App;
```

## Znane Problemy

Aktualnie brak znanych problemów.

## Propozycje na Przyszłość

- Dodanie wsparcia dla niestandardowych komunikatów błędów.
- Poprawa funkcji dostępności.
- Rozbudowa opcji stylizacji.

## Licencja

Ten projekt jest udostępniany na licencji MIT
