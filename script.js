const colors = document.querySelectorAll('.color');
const memoryBox = document.querySelector(".memory-box");
const symbols = document.querySelectorAll('.symbol');
const symbolBox = document.querySelector(".symbol-cir");
const coloreraser = document.querySelector(".color-title .eraser");
const symboleraser = document.querySelector(".symbol-title .eraser");



colors.forEach(color => {

    color.addEventListener("dragstart", (e) => {

        memoryBox.classList.add("glow");

        e.dataTransfer.setData(
            "color",
            color.dataset.color
        );

    });
    console.log(color.dataset.color);

});

memoryBox.addEventListener("dragover", (e) => {
    e.preventDefault();
});

memoryBox.addEventListener("drop", (e) => {

    memoryBox.classList.remove("glow");

    e.preventDefault();

    const color =
        e.dataTransfer.getData("color");

    memoryBox.style.backgroundColor =
        color;

});

symbols.forEach(symbol => {

    symbol.addEventListener("dragstart", (e) => {
        
        symbolBox.classList.add("glow");

        e.dataTransfer.setData(
            "symbol",
            symbol.dataset.symbol
        );

    });
    console.log(symbol.dataset.symbol);
    
});

symbolBox.addEventListener("dragover", (e) => {
    e.preventDefault();
});

symbolBox.addEventListener("drop", (e) => {

    e.preventDefault();
    symbolBox.classList.remove("glow");
    const type = e.dataTransfer.getData("symbol");

    symbolBox.innerHTML = "";

    const selected = document.querySelector(`[data-symbol="${type}"]`);

    symbolBox.appendChild(selected.cloneNode(true));
    symbolBox.style.backgroundColor = "white";

});

coloreraser.addEventListener("click", () => {

    memoryBox.style.backgroundColor = "";
    memoryBox.style.color = "";
    memoryBox.style.boxShadow = "";

});

symboleraser.addEventListener("click", () => {

    symbolBox.innerHTML = "";
    symbolBox.style.backgroundColor = "";
    symbolBox.classList.remove("glow");

});