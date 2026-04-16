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

function showDeveloperInfo(lastName, firstName, position ) {
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
    let demoArea = document.getElementById("dom-demo-area");
    
    let listItems = demoArea.querySelectorAll("li");
    
    let sampleText = document.getElementById("sample-text");
    
    let auraDiv = document.createElement("div");
    auraDiv.style.color = "#10b981";
    auraDiv.style.fontStyle = "italic";
    let auraText = document.createTextNode("✨ Навколо сумки з'явилося магічне сяйво.");
    auraDiv.append(auraText); 
    demoArea.append(auraDiv); 
    
    let raritySpan = document.createElement("span");
    raritySpan.textContent = "[РІДКІСНЕ] ";
    raritySpan.style.color = "#f59e0b";
    sampleText.prepend(raritySpan); 
    
    let descriptionP = document.createElement("p");
    descriptionP.textContent = "Опис: Це спорядження було знайдено в печерах Гоблінів.";
    descriptionP.style.fontSize = "0.8em";
    sampleText.after(descriptionP);
    
    if (listItems.length > 1 && !replacedItemOriginal) {
        replacedItemOriginal = listItems[1].cloneNode(true); 
        let legendarySword = document.createElement("li");
        legendarySword.innerHTML = "<b style='color: #ef4444;'>🗡️ Екскалібур (Легендарний меч)</b>";
        listItems[1].replaceWith(legendarySword); 
    }
    
    let removeBtnId = "remove-dom-mods-btn";
    if (!document.getElementById(removeBtnId)) {
        let removeBtn = document.createElement("button");
        removeBtn.id = removeBtnId;
        removeBtn.className = "btn btn-danger";
        removeBtn.style.marginTop = "10px";
        removeBtn.textContent = "Очистити інвентар (remove)";
        removeBtn.onclick = function() {
            auraDiv.remove(); 
            raritySpan.remove(); 
            descriptionP.remove();
            
            let currentItems = Array.from(demoArea.querySelectorAll("li"));
            let found = currentItems.find(e => e.textContent.includes("Екскалібур"));
            if (found && replacedItemOriginal) {
                found.replaceWith(replacedItemOriginal);
                replacedItemOriginal = null; 
            }
            this.remove(); 
        };
        demoArea.append(removeBtn);
    }
}

function mouseLog(msg) {
    let out = document.getElementById("mouse-events-output");
    if(out) out.innerHTML += `<div>${msg}</div>`;
}

function mouseEventHandler1() {
    mouseLog("<span style='color: #10b981;'><strong>[Атрибут]</strong> Клік по кнопці (onclick атрибут).</span>");
}

document.addEventListener("DOMContentLoaded", function() {
    let btnProp = document.getElementById("btn-prop");
    if(btnProp) {
        btnProp.onclick = function() {
            mouseLog("<span style='color: #06b6d4;'><strong>[Властивість]</strong> Клік по кнопці (element.onclick).</span>");
        };
    }

    let btnAddl = document.getElementById("btn-addl");
    if(btnAddl) {
        btnAddl.addEventListener("click", function() {
            mouseLog("<span style='color: #8b5cf6;'><strong>[addEventListener 1]</strong> Відпрацював перший обробник.</span>");
        });
        btnAddl.addEventListener("click", function() {
            mouseLog("<span style='color: #8b5cf6;'><strong>[addEventListener 2]</strong> Відпрацював другий обробник цієї ж події.</span>");
        });
    }

    let btnObj = document.getElementById("btn-obj");
    
    let myHandlerObj = {
        name: "GameHandlerObject",
        handleEvent(event) {
            mouseLog(`<span style='color: #f59e0b;'><strong>[Об'єкт-обробник]</strong> Подія: ${event.type}, поточний елемент: ${event.currentTarget.id}</span>`);
        }
    };

    if(btnObj) {
        btnObj.addEventListener("click", myHandlerObj);
        
        let btnRmObj = document.getElementById("btn-rm-obj");
        if(btnRmObj) {
            btnRmObj.addEventListener("click", function() {
                btnObj.removeEventListener("click", myHandlerObj);
                mouseLog("<span style='color: #ef4444;'><strong>[removeEventListener]</strong> Об'єкт-обробник успішно видалено з попередньої кнопки. Тепер вона не реагуватиме.</span>");
            });
        }
    }

    let delegationList = document.getElementById("delegation-list");
    if(delegationList) {
        let activeLi = null;
        delegationList.onclick = function(event) {
            let target = event.target;
            
            if (target.tagName !== 'LI') return;

            if (activeLi) {
                activeLi.classList.remove('active-list-item');
            }
            
            activeLi = target;
            activeLi.classList.add('active-list-item');
            
            mouseLog(`<strong>[Делегування]</strong> Виділено елемент: ${activeLi.textContent}`);
        };
    }

    let behaviorMenu = document.getElementById("behavior-menu");
    if(behaviorMenu) {
        let menuActions = {
            save: () => mouseLog("<em>[Патерн Behavior]</em> Виклик методу: <strong style='color:#10b981'>Збереження гри...</strong>"),
            load: () => mouseLog("<em>[Патерн Behavior]</em> Виклик методу: <strong style='color:#06b6d4'>Завантаження сейву...</strong>"),
            exit: () => mouseLog("<em>[Патерн Behavior]</em> Виклик методу: <strong style='color:#ef4444'>Вихід з гри!</strong>")
        };

        behaviorMenu.addEventListener("click", function(event) {
            let action = event.target.dataset.action;
            if (action && menuActions[action]) {
                menuActions[action](); 
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {

    const hoverContainer = document.getElementById("hover-items-container");
    const hoverLog       = document.getElementById("hover-log");

    function logHover(msg) {
        if (!hoverLog) return;
        if (hoverLog.querySelector('[style*="color: #6b6e8a"]')) {
            hoverLog.innerHTML = "";
        }
        const line = document.createElement("div");
        line.innerHTML = msg;
        hoverLog.appendChild(line);
        hoverLog.scrollTop = hoverLog.scrollHeight;
    }

    function getItemLabel(el) {
        if (!el) return "поза зоною";
        const card = el.closest ? el.closest(".hover-item") : null;
        if (card) {
            const name = card.querySelector(".hover-item-name");
            return name ? name.textContent : card.dataset.item || "предмет";
        }
        if (el.id === "hover-items-container") return "контейнер";
        return el.tagName ? el.tagName.toLowerCase() : "невідомо";
    }

    if (hoverContainer) {
        hoverContainer.addEventListener("mouseover", function (e) {
            const target      = e.target;          
            const relTarget   = e.relatedTarget;  

            const card = target.closest ? target.closest(".hover-item") : null;
            if (card) {
                card.classList.add("item-hovered");

                const fromLabel = getItemLabel(relTarget);
                const toLabel   = getItemLabel(target);
                logHover(
                    `<span style='color:#10b981'>▶ mouseover</span> ` +
                    `<strong style='color:#e8e8f0'>event.target:</strong> <span style='color:#06b6d4'>${toLabel}</span> | ` +
                    `<strong style='color:#e8e8f0'>relatedTarget:</strong> <span style='color:#a78bfa'>${fromLabel}</span>`
                );
            }
        });

        hoverContainer.addEventListener("mouseout", function (e) {
            const target    = e.target;          
            const relTarget = e.relatedTarget;   

            const card = target.closest ? target.closest(".hover-item") : null;
            if (card) {
                const goingIntoCard = relTarget && card.contains(relTarget);
                if (!goingIntoCard) {
                    card.classList.remove("item-hovered");

                    const fromLabel = getItemLabel(target);
                    const toLabel   = getItemLabel(relTarget);
                    logHover(
                        `<span style='color:#ef4444'>◀ mouseout </span> ` +
                        `<strong style='color:#e8e8f0'>event.target:</strong> <span style='color:#06b6d4'>${fromLabel}</span> | ` +
                        `<strong style='color:#e8e8f0'>relatedTarget:</strong> <span style='color:#a78bfa'>${toLabel}</span>`
                    );
                }
            }
        });
    }

    const dragSource = document.getElementById("drag-source");
    const dragTarget = document.getElementById("drag-target");
    const dragLogEl  = document.getElementById("drag-log");

    function logDrag(msg) {
        if (!dragLogEl) return;
        if (dragLogEl.querySelector('[style*="color: #6b6e8a"]')) {
            dragLogEl.innerHTML = "";
        }
        const line = document.createElement("div");
        line.innerHTML = msg;
        dragLogEl.appendChild(line);
        dragLogEl.scrollTop = dragLogEl.scrollHeight;
    }

    let draggedItem  = null; 
    let dragClone    = null;  
    let offsetX      = 0;
    let offsetY      = 0;

    function createClone(item, clientX, clientY) {
        const clone = document.createElement("div");
        clone.className   = "drag-clone";
        clone.textContent = item.textContent;
        document.body.appendChild(clone);

        const rect = item.getBoundingClientRect();
        offsetX = clientX - rect.left;
        offsetY = clientY - rect.top;

        clone.style.left = (clientX - offsetX) + "px";
        clone.style.top  = (clientY - offsetY) + "px";
        return clone;
    }

    function isOverTarget(clientX, clientY) {
        if (!dragTarget) return false;
        const rect = dragTarget.getBoundingClientRect();
        return clientX >= rect.left && clientX <= rect.right &&
               clientY >= rect.top  && clientY <= rect.bottom;
    }

    function onMouseDown(e) {
        const item = e.target.closest(".drag-item");
        if (!item) return;

        e.preventDefault();
        draggedItem = item;
        draggedItem.classList.add("is-dragging");

        dragClone = createClone(item, e.clientX, e.clientY);

        logDrag(
            `<span style='color:#8b5cf6'>⬇ mousedown</span> — схоплено: ` +
            `<strong style='color:#e8e8f0'>${item.textContent.trim()}</strong>`
        );

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup",   onMouseUp);
    }

    function onMouseMove(e) {
        if (!dragClone) return;
        dragClone.style.left = (e.clientX - offsetX) + "px";
        dragClone.style.top  = (e.clientY - offsetY) + "px";

        if (dragTarget) {
            if (isOverTarget(e.clientX, e.clientY)) {
                dragTarget.classList.add("drag-over");
            } else {
                dragTarget.classList.remove("drag-over");
            }
        }
    }

    function onMouseUp(e) {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup",   onMouseUp);

        if (!draggedItem || !dragClone) return;

        dragClone.remove();
        dragClone = null;
        dragTarget && dragTarget.classList.remove("drag-over");

        if (isOverTarget(e.clientX, e.clientY)) {
            const placeholder = dragTarget.querySelector(".drop-placeholder");
            if (placeholder) placeholder.remove();

            draggedItem.classList.remove("is-dragging");
            draggedItem.classList.add("equipped");
            dragTarget.appendChild(draggedItem);

            logDrag(
                `<span style='color:#10b981'>✔ mouseup</span> — екіпіровано: ` +
                `<strong style='color:#e8e8f0'>${draggedItem.textContent.trim()}</strong> ` +
                `<span style='color:#06b6d4'>→ екіпірування</span>`
            );
        } else {
            draggedItem.classList.remove("is-dragging");
            logDrag(
                `<span style='color:#ef4444'>✖ mouseup</span> — скасовано, предмет повернуто ` +
                `<span style='color:#a78bfa'>(поза зоною)</span>`
            );
        }

        draggedItem = null;
    }

    if (dragSource) dragSource.addEventListener("mousedown", onMouseDown);
    if (dragTarget) dragTarget.addEventListener("mousedown", onMouseDown);
});