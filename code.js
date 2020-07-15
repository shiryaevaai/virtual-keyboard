var keyboard;
var textarea;
var capsOn = false;
var keysPressed = {};
var keysPressedStack = [];
var switchLang = { en: "ru", ru: "en" };
var lang;
var notHiddenClass = "caseDown";

window.onload = function () {
  lang = localStorage.getItem('lang');
  if (lang === "undefined") {
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
  addDescriptionContainer();

  keyboard.onmousedown = function (event) {
    let key = event.target.closest(".keyboard-key");
    if (key !== null) {
      key.style.background = '#de1f1f';
      keysPressedStack.push(key);
    }
  };

  keyboard.onmouseup = function (event) {
    //let target = event.target.closest(".keyboard-key");
    //if (target !== null) {
    //  target.style.background = '';
    //}
    let key = keysPressedStack.pop();
    //alert(key.classList);
    if (key !== null) {
      key.style.background = '';
    }
  };

  keyboard.onclick = function (event) {
    let key = event.target.closest(".keyboard-key");
    processKeyPress(key, false);
  };
};

document.addEventListener('keydown', (event) => {
  keysPressed[event.code] = true;
  let key = document.getElementsByClassName(event.code)[0];
  if (key !== null) {
    key.style.background = '#de1f1f';
    keysPressedStack.push(key);
    processKeyDown(event.code, key);
    processKeyPress(key, true);
  }
  
  checkSwitchLang(event);
});

document.addEventListener('keyup', (event) => {
  let key = keysPressedStack.pop();
  if (key !== null) {
    key.style.background = '';
  }

  delete this.keysPressed[event.code];
  processKeyUp(event.code);

});

function processKeyDown(code, key) {
  if (code == 'ShiftLeft' || code == 'ShiftRight') {
    switchHiding(notHiddenClass, capsOn ? "shiftCaps" : "caseUp");
    notHiddenClass = capsOn ? "shiftCaps" : "caseUp";
  }

  //if (code == "CapsLock") {
  //  switchHiding(notHiddenClass, capsOn ? "caseDown" : "caps");
  //  notHiddenClass = capsOn ? "caseDown" : "caps";
  //  key.style.background = capsOn ? '' : '#de1f1f';
  //  capsOn = !capsOn;
  //}
}

function processKeyUp(code) {
  if (code == 'ShiftLeft' || code =='ShiftRight') {
    switchHiding(notHiddenClass, capsOn ? "caps" : "caseDown");
    notHiddenClass = capsOn ? "caps" : "caseDown";
  }
}

function processKeyPress(key, isKeyboardEvent) {
  if (key !== null) {
    if (key.classList.contains("Tab") ||
      key.classList.contains("AltRight") ||
      key.classList.contains("AltLeft") ||
      key.classList.contains("CtrlRight") ||
      key.classList.contains("CtrlLeft") ||
      key.classList.contains("ShiftRight") ||
      key.classList.contains("ShiftLeft")) {
      if (isKeyboardEvent) {
        return;
      }
      else {
        return;
      }
    }

    if (key.classList.contains("Backspace")) {
      let pos = getCaret();
      if (pos > 0) {
        let str = textarea.textContent;
        str = str.slice(0, pos - 1) + str.slice(pos);
        textarea.textContent = str;
      }

      return;
    }

    if (key.classList.contains("Delete")) {
      let pos = getCaret();
      if (pos != textarea.textContent.lenth) {
        let str = textarea.textContent;
        str = str.slice(0, pos) + str.slice(pos + 1);
        textarea.textContent = str;
      }

      return;
    }

    if (key.classList.contains("CapsLock")) {
      switchHiding(notHiddenClass, capsOn ? "caseDown" : "caps");
      notHiddenClass = capsOn ? "caseDown" : "caps";
      key.style.background = capsOn ? '' : '#de1f1f';
      capsOn = !capsOn;
      return;
    }

    let symbol;
    let langElements = key.childNodes;

    for (let langElement of langElements) {
      let elements = langElement.getElementsByTagName('span');

      for (let element of elements) {
        if (!element.classList.contains("hidden")) {
          symbol = element.textContent;
          //console.log(element.textContent.length);
        }
      }
    }

    textarea.textContent = textarea.textContent + symbol;
    //console.log(symbol)
    //console.log(symbol.length);
  }
}

function switchHiding(classToHide, classToShow) {
  let elementContainers = keyboard.getElementsByClassName(lang);
  for (let elementContainer of elementContainers) {
    let elementToHide = elementContainer.getElementsByClassName(classToHide)[0];
    elementToHide.classList.add("hidden");
    let elementToShow = elementContainer.getElementsByClassName(classToShow)[0];
    elementToShow.classList.remove("hidden");
  }
}

function getCaret() {
  if ((textarea.selectionStart != null) && (textarea.selectionStart != undefined)) {
    var position = textarea.selectionStart;
    return position;
  }
  else {
    return 0;
  }
}

function checkSwitchLang(event) {
  if (keysPressed['ControlLeft'] && keysPressed['AltLeft']) {
    let elementContainers = keyboard.getElementsByClassName(lang);
    for (let elementContainer of elementContainers) {
      let elementToHide = elementContainer.getElementsByClassName(notHiddenClass)[0];
      elementToHide.classList.add("hidden");
      elementContainer.classList.add("hidden");
    }

    lang = switchLang[lang];

    elementContainers = keyboard.getElementsByClassName(lang);
    for (let elementContainer of elementContainers) {
      let elementToHide = elementContainer.getElementsByClassName(notHiddenClass)[0];
      elementToHide.classList.remove("hidden");
      elementContainer.classList.remove("hidden");
    }

    //console.log(lang);
    localStorage.setItem('lang', lang);
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

function addDescriptionContainer() {
  let descriptionContainer = document.createElement("div");
  descriptionContainer.innerHTML = "<p>Клавиатура создана в операционной системе Windows</p><p>Для переключения языка комбинация: левыe ctrl + alt</p>";
  descriptionContainer.classList.add("description-container");
  let wrapper = getWrapper();
  wrapper.append(descriptionContainer);
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
  enCaseDown, enCaseUp, enCaps, enShiftCaps) {
  let key = document.createElement("div");
  key.classList.add("keyboard-key", keyClass);

  let enElementsContainer = getenElementsContainer();
  let ruElementsContainer = getRuElementsContainer();

  let enElements = createElements(enCaseDown, enCaseUp, enCaps, enShiftCaps);
  let ruElements = createElements(ruCaseDown, ruCaseUp, ruCaps, ruShiftCaps);

  addHiddenClassToKey(lang, enElementsContainer, enElements, ruElementsContainer, ruElements);
  constructKey(key, enElementsContainer, enElements, ruElementsContainer, ruElements);

  return key;
}

function createKeyWithTwoValues(lang, keyClass, value1, value2) {
  let key = document.createElement("div");
  key.classList.add("keyboard-key", keyClass);

  let enElementsContainer = getenElementsContainer();
  let ruElementsContainer = getRuElementsContainer();

  let enElements = createElements(value1, value2, value1, value2);
  let ruElements = createElements(value1, value2, value1, value2);

  addHiddenClassToKey(lang, enElementsContainer, enElements, ruElementsContainer, ruElements);
  constructKey(key, enElementsContainer, enElements, ruElementsContainer, ruElements);

  return key;
}

function createKeyWithSingleValue(lang, keyClass, value) {
  let key = document.createElement("div");
  key.classList.add("keyboard-key", keyClass);

  let enElementsContainer = getenElementsContainer();
  let ruElementsContainer = getRuElementsContainer();

  let enElements = createElements(value, value, value, value);
  let ruElements = createElements(value, value, value, value);

  addHiddenClassToKey(lang, enElementsContainer, enElements, ruElementsContainer, ruElements);
  constructKey(key, enElementsContainer, enElements, ruElementsContainer, ruElements);

  return key;
}

function getenElementsContainer() {
  let container = document.createElement("span");
  container.classList.add("en"); 
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

function addHiddenClassToKey(lang, enElementsContainer, enElements, ruElementsContainer, ruElements) {
  if (lang == 'ru') {
    enElementsContainer.classList.add("hidden");
    for (let i in enElements) {
      enElements[i].classList.add("hidden");
    }
    for (let i in ruElements) {
      if (!ruElements[i].classList.contains(notHiddenClass)) {
        ruElements[i].classList.add("hidden");
      }
    }
  }
  else {
    ruElementsContainer.classList.add("hidden");

    for (let i in ruElements) {
      ruElements[i].classList.add("hidden");
    }
    for (let i in enElements) {
      if (!enElements[i].classList.contains(notHiddenClass)) {
        enElements[i].classList.add("hidden");
      }
    }
  }
}

function constructKey(key, enElementsContainer, enElements, ruElementsContainer, ruElements) {
  for (let i in enElements) {
    enElementsContainer.append(enElements[i]);
  }

  for (let i in ruElements) {
    ruElementsContainer.append(ruElements[i]);
  }

  key.append(enElementsContainer);
  key.append(ruElementsContainer);
}

function getWrapper() {
  return document.getElementsByClassName("wrapper")[0];
}