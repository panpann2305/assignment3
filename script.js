const colors = document.querySelectorAll('.color');
const memoryBox = document.querySelector(".memory-box");
const symbols = document.querySelectorAll('.symbol');
const symbolBox = document.querySelector(".symbol-cir");
const coloreraser = document.querySelector(".color-title .eraser");
const symboleraser = document.querySelector(".symbol-title .eraser");

colors.forEach(color => {

    color.addEventListener("dragstart", (e) => {

        memoryBox.classList.add("glow");
        //I decided to add glow effect onto the destination element
        //as a sign of where user should drag the draggable element//

        e.dataTransfer.setData(
            "color",
            color.dataset.color
        ); //Set the data to be transferred during the drag-and-drop, using the color's data-color

    });
    console.log(color.dataset.color);

});

memoryBox.addEventListener("dragover", (e) => {
    e.preventDefault();
});

memoryBox.addEventListener("drop", (e) => {

    memoryBox.classList.remove("glow"); //Remove the glow effect once the color is dropped

    e.preventDefault();

    const color =
        e.dataTransfer.getData("color"); //Get the chosen color

    memoryBox.style.backgroundColor =
        color; //and change the color of the memoryBox to the chosen color

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

//I used ChatGPT to help me with this part
symbolBox.addEventListener("drop", (e) => {

    e.preventDefault();
    symbolBox.classList.remove("glow");
    const type = e.dataTransfer.getData("symbol");

    symbolBox.innerHTML = ""; //take the symbol inside the html file, take only one and clear the rest

    const selected = document.querySelector(`[data-symbol="${type}"]`); //select the symbol element that matches the dropped symbol type

    symbolBox.appendChild(selected.cloneNode(true)); //drag the symbol without moving it from the symbol path
    symbolBox.style.backgroundColor = "white"; //the symbol box change to white background

});

coloreraser.addEventListener("click", () => { //click to erase

    memoryBox.style.backgroundColor = ""; //clear every style and return to the default state
    memoryBox.style.color = "";
    memoryBox.style.boxShadow = "";

});

symboleraser.addEventListener("click", () => {

    symbolBox.innerHTML = "";
    symbolBox.style.backgroundColor = "";
    symbolBox.classList.remove("glow");

});