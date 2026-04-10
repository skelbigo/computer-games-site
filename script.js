function userDialog() {
    let output = document.getElementById("dialog-output");
    let numStr = prompt("Скільки ворогів ви плануєте здолати у цьому квесті? (від 1 до 5):", "3");
    
    if (numStr === null) {
        output.innerHTML = "Похід скасовано. Гравці розійшлися по домівках.";
        return;
    }
    
    let num = parseInt(numStr);
    
    if (isNaN(num) || num < 1 || num > 5) {
        output.innerHTML = "<span style='color: #ef4444;'>Помилка! Ваше військо не витримає таку кількість (введіть від 1 до 5).</span>";
    } else {
        let resultHTML = "Квест розпочато! Ви обрали <strong>" + num + "</strong> цілей.<br>Журнал бою:<ul>";
        for (let i = 1; i <= num; i++) {
            resultHTML += "<li>Ворога №" + i + " здолано! Отримано досвід.</li>";
        }
        resultHTML += "</ul>";
        output.innerHTML = resultHTML;
    }
}

function showDeveloperInfo(lastName, firstName, position = "Веб розробник") {
    let output = document.getElementById("dev-output");
    output.innerHTML = `<strong>Прізвище:</strong> ${lastName}<br>
                        <strong>Ім'я:</strong> ${firstName}<br>
                        <strong>Посада:</strong> ${position}`;
}

function compareStrings(str1, str2) {
    if (str1.length > str2.length) {
        alert(`Артефакт "${str1}" має більшу магічну силу!`);
    } else if (str2.length > str1.length) {
        alert(`Артефакт "${str2}" виявився ціннішим!`);
    } else {
        alert("Обидва предмети мають рівну вагу в інвентарі.");
    }
}

let originalBg = "";
let bgTimeout;

function changeBackgroundTemporarily() {
    if (!originalBg) {
        originalBg = document.body.style.backgroundColor || window.getComputedStyle(document.body).backgroundColor;
    }
    document.body.style.backgroundColor = "#1a1a2e";
    clearTimeout(bgTimeout);
    
    let btn = document.querySelector("button[onclick='changeBackgroundTemporarily()']");
    let origText = btn.textContent;
    btn.textContent = "Режим Стелс активовано!";
    btn.disabled = true;
    
    bgTimeout = setTimeout(() => {
        document.body.style.backgroundColor = originalBg;
        btn.textContent = origText;
        btn.disabled = false;
    }, 30000);
}

function redirectToGames() {
    if (confirm("Відкрити портал до магазину ігор? (Це перенесе вас на іншу локацію)")) {
        location.href = "games.html";
    }
}

let replacedItemOriginal = null;

function demonstrateDOM() {
    let log = document.getElementById("dom-log");
    log.innerHTML = "<div style='color: #a855f7; border-bottom: 1px solid #333;'>--- Лог системи інвентарю ---</div>"; 
    
    let addLog = (msg) => log.innerHTML += "<div>" + msg + "</div>";
    
    let demoArea = document.getElementById("dom-demo-area");
    addLog("<strong>[getElementById]</strong> Сканування сумки...");
    
    let listItems = demoArea.querySelectorAll("li");
    addLog("<strong>[querySelectorAll]</strong> Виявлено " + listItems.length + " базових предмети.");
    
    let sampleText = document.getElementById("sample-text");
    addLog("<strong>[innerHTML]</strong> Вміст слоту: " + sampleText.innerHTML.substring(0,30) + "...");
    addLog("<strong>[textContent]</strong> Чистий текст: " + sampleText.textContent);
    addLog("<strong>[outerHTML]</strong> Структура вузла: " + sampleText.outerHTML.substring(0,25) + "...");
    
    if (listItems.length > 0 && listItems[0].firstChild) {
        addLog("<strong>[nodeValue]</strong> Назва першого предмета: " + listItems[0].firstChild.nodeValue);
    }
    
    let auraDiv = document.createElement("div");
    auraDiv.style.color = "#10b981";
    auraDiv.style.fontStyle = "italic";
    let auraText = document.createTextNode("✨ Навколо сумки з'явилося магічне сяйво.");
    auraDiv.append(auraText); // append
    demoArea.append(auraDiv); 
    addLog("<strong>[append]</strong> Створено магічну ауру.");
    
    let raritySpan = document.createElement("span");
    raritySpan.textContent = "[РІДКІСНЕ] ";
    raritySpan.style.color = "#f59e0b";
    sampleText.prepend(raritySpan); // prepend
    addLog("<strong>[prepend]</strong> Додано статус рідкісності.");
    
    let descriptionP = document.createElement("p");
    descriptionP.textContent = "Опис: Це спорядження було знайдено в печерах Гоблінів.";
    descriptionP.style.fontSize = "0.8em";
    sampleText.after(descriptionP); // after
    addLog("<strong>[after]</strong> Додано історію предмета.");
    
    if (listItems.length > 1 && !replacedItemOriginal) {
        replacedItemOriginal = listItems[1].cloneNode(true); 
        let legendarySword = document.createElement("li");
        legendarySword.innerHTML = "<b style='color: #ef4444;'>🗡️ Екскалібур (Легендарний меч)</b>";
        listItems[1].replaceWith(legendarySword); // replaceWith
        addLog("<strong>[replaceWith]</strong> Старий предмет перековано на легендарний меч!");
    }
    
    let removeBtnId = "remove-dom-mods-btn";
    if (!document.getElementById(removeBtnId)) {
        let removeBtn = document.createElement("button");
        removeBtn.id = removeBtnId;
        removeBtn.className = "btn btn-danger";
        removeBtn.style.marginTop = "10px";
        removeBtn.textContent = "Очистити інвентар (remove)";
        removeBtn.onclick = function() {
            auraDiv.remove(); // remove
            raritySpan.remove(); 
            descriptionP.remove();
            
            let currentItems = Array.from(demoArea.querySelectorAll("li"));
            let found = currentItems.find(e => e.textContent.includes("Екскалібур"));
            if (found && replacedItemOriginal) {
                found.replaceWith(replacedItemOriginal);
                replacedItemOriginal = null; 
            }
            this.remove(); 
            log.innerHTML += "<div style='color: #ef4444;'>[remove] Всі магічні модифікації видалено!</div>";
        };
        demoArea.append(removeBtn);
    }
}