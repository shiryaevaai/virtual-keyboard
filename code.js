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
  addRow(lang, addFirstRowKeys);
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
  let keyboard = document.getElementsByClassName("keyboard")[0];;
  keyboard.append(row);
}

function addFirstRowKeys(lang, row) {
  let backquote = createKey(lang, "Backquote", "`", "~", "`", "~", "ё", "Ё", "Ё", "ё");
  row.append(backquote);
}

function createKey(lang, keyClass, engCaseDown, engCaseUp, engCaps, engShiftCap,
  ruCaseDown, ruCaseUp, ruCaps, ruShiftCap) {
  let key = document.createElement("div");
  key.classList.add("keyboard-key", keyClass);

  let engElementsContainer = document.createElement("span");
  engElementsContainer.classList.add("eng");

  let engElements = [];
  createElement("caseDown", engCaseDown, engElements);
  createElement("caseUp", engCaseUp, engElements);
  createElement("caps", engCaps, engElements);
  createElement("shiftCaps", engShiftCap, engElements);

  let ruElementsContainer = document.createElement("span");
  ruElementsContainer.classList.add("ru");

  let ruElements = [];
  createElement("caseDown", ruCaseDown, ruElements);
  createElement("caseUp", ruCaseUp, ruElements);
  createElement("caps", ruCaps, ruElements);
  createElement("shiftCaps", ruShiftCap, ruElements);

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

  for (let i in engElements) {
    engElementsContainer.append(engElements[i]);
  }

  for (let i in ruElements) {
    ruElementsContainer.append(ruElements[i]);
  }

  key.append(engElementsContainer);
  key.append(ruElementsContainer);
  return key;
}

function createElement(className, value, elements) {
  let element = document.createElement("span");
  element.classList.add(className);
  element.innerText = value;
  elements.push(element);
}


function getWrapper() {
  return document.getElementsByClassName("wrapper")[0];
}