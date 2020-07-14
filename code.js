var keyboard;
var textarea;

window.onload = function () {
  var lang = localStorage.getItem('lang');
  if (lang === null) {
    lang = 'en';
    localStorage.setItem('lang', lang);
  }
  //alert(lang);

  addSection();
  addHeader();
  addTextarea();
  addKeyboardContainer();

  keyboard = document.getElementsByClassName("keyboard")[0];
  textarea = document.getElementsByName("Details")[0];

  addRow(lang, addFirstRowKeys);
  addRow(lang, addSecondRowKeys);
  addRow(lang, addThirdRowKeys);
  addRow(lang, addFourthRowKeys);
  addRow(lang, addFifthRowKeys);

  keyboard.onclick = function (event) {
    let target = event.target.closest(".keyboard-key");
    if (target !== null) {
      if (target.classList.contains("Tab") ||
        target.classList.contains("AltRight") ||
        target.classList.contains("AltLeft") ||
        target.classList.contains("CtrlRight") ||
        target.classList.contains("CtrlLeft") ||
        target.classList.contains("ShiftRight") ||
        target.classList.contains("ShiftLeft")) {
        return;
      }

      let symbol;
      let langElements = target.childNodes;
      console.log(langElements);

      for (let langElement of langElements) {
        let elements = langElement.getElementsByTagName('span');

        for (let element of elements) {
          if (!element.classList.contains("hidden")) {
            symbol = element.innerText;
          }
        }
      }

      textarea.textContent = textarea.textContent + symbol;
      console.log(symbol)
    }
  };
};

let switchLang = function (event) {
  if (event.altKey && event.shiftKey) {
    alert('Ура!');
  }
};

function addSection() {
  let section = document.createElement("section");
  section.innerHTML = "<div class=\"wrapper\"></div>";
  document.body.append(section);
}

function addHeader() {
  let header = document.createElement("h1");
  header.innerHTML = "RSS Виртуальная клавиатура";
  header.classList.add("header");
  let wrapper = getWrapper();
  wrapper.append(header);
}

function addTextarea() {
  let textContainer = document.createElement("div");
  textContainer.innerHTML = "<textarea name=\"Details\" placeholder=\"\"></textarea>";
  textContainer.classList.add("text-container");
  let wrapper = getWrapper();
  wrapper.append(textContainer);
}

function addKeyboardContainer() {
  let keyboardContainer = document.createElement("div");
  keyboardContainer.innerHTML = "<div class=\"keyboard\"></div>";
  keyboardContainer.classList.add("keyboard-container");
  let wrapper = getWrapper();
  wrapper.append(keyboardContainer);
}

function addRow(lang, addKeys) {
  let row = document.createElement("div");
  row.classList.add("keyboard-row");
  addKeys(lang, row);
  //let keyboard = document.getElementsByClassName("keyboard")[0];
  keyboard.append(row);
}

function addFirstRowKeys(lang, row) {
  let backquote = createKey(lang, "Backquote", "ё", "Ё", "Ё", "ё", "`", "~", "`", "~");
  row.append(backquote);
  let digit1 = createKeyWithTwoValues(lang, "Digit1", "1", "!");
  row.append(digit1);
  let digit2 = createKey(lang, "Digit2", "2", "\"", "2", "\"", "2", "@", "2", "@");
  row.append(digit2);
  let digit3 = createKey(lang, "Digit3", "3", "№", "3", "№", "3", "#", "3", "#");
  row.append(digit3);
  let digit4 = createKey(lang, "Digit4", "4", ";", "4", ";", "4", "$", "4", "$");
  row.append(digit4);
  let digit5 = createKeyWithTwoValues(lang, "Digit5", "5", "%");
  row.append(digit5);
  let digit6 = createKey(lang, "Digit6", "6", ":", "6", ":", "6", "^", "6", "^");
  row.append(digit6);
  let digit7 = createKey(lang, "Digit7", "7", "?", "7", "?", "7", "&", "7", "&");
  row.append(digit7);
  let digit8 = createKeyWithTwoValues(lang, "Digit8", "8", "*");
  row.append(digit8);
  let digit9 = createKeyWithTwoValues(lang, "Digit9", "9", "(");
  row.append(digit9);
  let digit0 = createKeyWithTwoValues(lang, "Digit0", "0", ")");
  row.append(digit0);
  let minus = createKeyWithTwoValues(lang, "Minus", "-", "_");
  row.append(minus);
  let equal = createKeyWithTwoValues(lang, "Equal", "=", "+");
  row.append(equal);
  let backspace = createKeyWithSingleValue(lang, "Backspace", "Backspace");
  row.append(backspace);
}

function addSecondRowKeys(lang, row) {
  let tab = createKeyWithSingleValue(lang, "Tab", "Tab");
  row.append(tab);
  let keyQ = createKey(lang, "KeyQ", "й", "Й", "Й", "й", "q", "Q", "Q", "q");
  row.append(keyQ);
  let keyW = createKey(lang, "KeyW", "ц", "Ц", "Ц", "ц", "w", "W", "W", "w");
  row.append(keyW);
  let keyE = createKey(lang, "KeyE", "у", "У", "У", "у", "e", "E", "E", "e");
  row.append(keyE);
  let keyR = createKey(lang, "KeyR", "к", "К", "К", "к", "r", "R", "R", "r");
  row.append(keyR);
  let keyT = createKey(lang, "KeyT", "е", "Е", "Е", "е", "t", "T", "T", "t");
  row.append(keyT);
  let keyY = createKey(lang, "KeyY", "н", "Н", "Н", "н", "y", "Y", "Y", "y");
  row.append(keyY);
  let keyU = createKey(lang, "KeyU", "г", "Г", "Г", "г", "u", "U", "U", "u");
  row.append(keyU);
  let keyI = createKey(lang, "KeyI", "ш", "Ш", "Ш", "ш", "i", "I", "I", "i");
  row.append(keyI);
  let keyO = createKey(lang, "KeyO", "щ", "Щ", "Щ", "щ", "o", "O", "O", "o");
  row.append(keyO);
  let keyP = createKey(lang, "KeyP", "з", "З", "З", "з", "p", "P", "P", "p");
  row.append(keyP);
  let bracketLeft = createKey(lang, "BracketLeft", "х", "Х", "Х", "х", "[", "{", "[", "{");
  row.append(bracketLeft);
  let bracketRight = createKey(lang, "BracketRight", "ъ", "Ъ", "Ъ", "ъ", "]", "}", "]", "}");
  row.append(bracketRight);
  let backslash = createKey(lang, "Backslash", "\\", "/", "\\", "/", "\\", "|", "\\", "|");
  row.append(backslash);
  let del = createKeyWithSingleValue(lang, "Delete", "Del");
  row.append(del);
}

function addThirdRowKeys(lang, row) {
  let capsLock = createKeyWithSingleValue(lang, "CapsLock", "CapsLock");
  row.append(capsLock);
  let keyA = createKey(lang, "KeyA", "з", "З", "З", "з", "a", "A", "A", "a");
  row.append(keyA);
  let keyS = createKey(lang, "KeyS", "ы", "Ы", "Ы", "ы", "s", "S", "S", "s");
  row.append(keyS);
  let keyD = createKey(lang, "KeyD", "в", "В", "В", "в", "d", "D", "D", "d");
  row.append(keyD);
  let keyF = createKey(lang, "KeyF", "а", "А", "А", "а", "f", "F", "F", "f");
  row.append(keyF);
  let keyG = createKey(lang, "KeyG", "п", "П", "П", "п", "g", "G", "G", "g");
  row.append(keyG);
  let keyH = createKey(lang, "KeyH", "р", "Р", "Р", "р", "h", "H", "H", "h");
  row.append(keyH);
  let keyJ = createKey(lang, "KeyJ", "о", "О", "О", "о", "j", "J", "J", "j");
  row.append(keyJ);
  let keyK = createKey(lang, "KeyK", "л", "Л", "Л", "л", "k", "K", "K", "k");
  row.append(keyK);
  let keyL = createKey(lang, "KeyL", "д", "Д", "Д", "д", "l", "L", "L", "l");
  row.append(keyL);
  let semicolon = createKey(lang, "Semicolon", "ж", "Ж", "Ж", "ж", ";", ":", ";", ":");
  row.append(semicolon);
  let quote = createKey(lang, "Quote", "э", "Э", "Э", "э", "'", "\"", "'", "\"");
  row.append(quote);
  let enter = createKeyWithSingleValue(lang, "Enter", "Enter");
  row.append(enter);
}

function addFourthRowKeys(lang, row) {
  let shiftLeft = createKeyWithSingleValue(lang, "ShiftLeft", "Shift");
  row.append(shiftLeft);
  let keyZ = createKey(lang, "KeyZ", "я", "Я", "Я", "я", "z", "Z", "Z", "z");
  row.append(keyZ);
  let keyX = createKey(lang, "KeyX", "ч", "Ч", "Ч", "ч", "x", "X", "X", "x");
  row.append(keyX);
  let keyC = createKey(lang, "KeyC", "с", "С", "С", "с", "c", "C", "C", "c");
  row.append(keyC);
  let keyV = createKey(lang, "KeyV", "м", "М", "М", "м", "v", "V", "V", "v");
  row.append(keyV);
  let keyB = createKey(lang, "KeyB", "и", "И", "И", "и", "b", "B", "B", "b");
  row.append(keyB);
  let keyN = createKey(lang, "KeyN", "т", "Т", "Т", "т", "n", "N", "N", "n");
  row.append(keyN);
  let keyM = createKey(lang, "KeyM", "ь", "Ь", "Ь", "ь", "m", "M", "M", "m");
  row.append(keyM);
  let сomma = createKey(lang, "Comma", "б", "Б", "Б", "б", ",", "&lt;", ",", "&lt;");
  row.append(сomma);
  let period = createKey(lang, "Period", "ю", "Ю", "Ю", "ю", ".", "&gt;", ".", "&gt;");
  row.append(period);
  let slash = createKey(lang, "Slash", ".", ",", ".", ",", "/", "?", "/", "?");
  row.append(slash);
  let arrowUp = createKeyWithSingleValue(lang, "ArrowUp", "▲");
  row.append(arrowUp);
  let shiftRight = createKeyWithSingleValue(lang, "ShiftRight", "Shift");
  row.append(shiftRight);
}

function addFifthRowKeys(lang, row) {
  let ctrlLeft = createKeyWithSingleValue(lang, "CtrlLeft", "Ctrl");
  row.append(ctrlLeft);
  let altLeft = createKeyWithSingleValue(lang, "AltLeft", "Alt");
  row.append(altLeft);
  let space = createKeyWithSingleValue(lang, "Space", " ");
  row.append(space);
  let altRight = createKeyWithSingleValue(lang, "AltRight", "Alt");
  row.append(altRight);
  let arrowLeft = createKeyWithSingleValue(lang, "ArrowLeft", "◄");
  row.append(arrowLeft);
  let arrowDown = createKeyWithSingleValue(lang, "ArrowDown", "▼");
  row.append(arrowDown);
  let arrowRight = createKeyWithSingleValue(lang, "ArrowRight", "►");
  row.append(arrowRight);
  let ctrlRight = createKeyWithSingleValue(lang, "CtrlRight", "Ctrl");
  row.append(ctrlRight);
}

function createKey(lang, keyClass, ruCaseDown, ruCaseUp, ruCaps, ruShiftCaps,
  engCaseDown, engCaseUp, engCaps, engShiftCaps) {
  let key = document.createElement("div");
  key.classList.add("keyboard-key", keyClass);

  let engElementsContainer = getEngElementsContainer();
  let ruElementsContainer = getRuElementsContainer();

  let engElements = createElements(engCaseDown, engCaseUp, engCaps, engShiftCaps);
  let ruElements = createElements(ruCaseDown, ruCaseUp, ruCaps, ruShiftCaps);

  addHiddenClassToKey(lang, engElementsContainer, engElements, ruElementsContainer, ruElements);
  constructKey(key, engElementsContainer, engElements, ruElementsContainer, ruElements);

  return key;
}

function createKeyWithTwoValues(lang, keyClass, value1, value2) {
  let key = document.createElement("div");
  key.classList.add("keyboard-key", keyClass);

  let engElementsContainer = getEngElementsContainer();
  let ruElementsContainer = getRuElementsContainer();

  let engElements = createElements(value1, value2, value1, value2);
  let ruElements = createElements(value1, value2, value1, value2);

  addHiddenClassToKey(lang, engElementsContainer, engElements, ruElementsContainer, ruElements);
  constructKey(key, engElementsContainer, engElements, ruElementsContainer, ruElements);

  return key;
}

function createKeyWithSingleValue(lang, keyClass, value) {
  let key = document.createElement("div");
  key.classList.add("keyboard-key", keyClass);

  let engElementsContainer = getEngElementsContainer();
  let ruElementsContainer = getRuElementsContainer();

  let engElements = createElements(value, value, value, value);
  let ruElements = createElements(value, value, value, value);

  addHiddenClassToKey(lang, engElementsContainer, engElements, ruElementsContainer, ruElements);
  constructKey(key, engElementsContainer, engElements, ruElementsContainer, ruElements);

  return key;
}

function getEngElementsContainer() {
  let container = document.createElement("span");
  container.classList.add("eng"); 
  return container;
}

function getRuElementsContainer() {
  let container = document.createElement("span");
  container.classList.add("ru");
  return container;
}

function createElements(caseDown, caseUp, caps, shiftCaps) {
  let elements = [];
  createElement("caseDown", caseDown, elements);
  createElement("caseUp", caseUp, elements);
  createElement("caps", caps, elements);
  createElement("shiftCaps", shiftCaps, elements);
  return elements;
}

function createElement(className, value, elements) {
  let element = document.createElement("span");
  element.classList.add(className);
  element.innerText = value;
  elements.push(element);
}

function addHiddenClassToKey(lang, engElementsContainer, engElements, ruElementsContainer, ruElements) {
  if (lang == 'ru') {
    engElementsContainer.classList.add("hidden");
    for (let i in engElements) {
      engElements[i].classList.add("hidden");
    }
    for (let i in ruElements) {
      if (!ruElements[i].classList.contains("caseDown")) {
        ruElements[i].classList.add("hidden");
      }
    }
  }
  else {
    ruElementsContainer.classList.add("hidden");

    for (let i in ruElements) {
      ruElements[i].classList.add("hidden");
    }
    for (let i in engElements) {
      if (!engElements[i].classList.contains("caseDown")) {
        engElements[i].classList.add("hidden");
      }
    }
  }
}

function constructKey(key, engElementsContainer, engElements, ruElementsContainer, ruElements) {
  for (let i in engElements) {
    engElementsContainer.append(engElements[i]);
  }

  for (let i in ruElements) {
    ruElementsContainer.append(ruElements[i]);
  }

  key.append(engElementsContainer);
  key.append(ruElementsContainer);
}

function getWrapper() {
  return document.getElementsByClassName("wrapper")[0];
}