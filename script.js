const colors = document.querySelectorAll('.color');
const memoryBox = document.querySelector(".memory-box");
const symbols = document.querySelectorAll('.symbol');
const symbolBox = document.querySelector(".symbol-cir");
const coloreraser = document.querySelector(".color-title .eraser");
const symboleraser = document.querySelector(".symbol-title .eraser");
const stars = document.querySelectorAll(".star");
const memoryPart = document.querySelector(".memory-part");
const bgColor = memoryBox.style.backgroundColor;
const trashZone = document.querySelector(".trash-zone");

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
    if (!color) return;
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

//drag the whole memorybox, but you actually can drag only the symbol into the zodiac stars
memoryPart.addEventListener("dragstart", (e) => {

    e.dataTransfer.setData(
        "memory",
        "memory"
    );

});

stars.forEach(star => {

    star.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    star.addEventListener("dragenter", () => {
        star.classList.add("glow"); //glow as a sign of postion
    });

    star.addEventListener("dragleave", () => {
        star.classList.remove("glow");
    });

    star.addEventListener("drop", (e) => {
        e.preventDefault();
        star.classList.remove("glow"); //drop down and remove the add-in glow
        const memory =
            e.dataTransfer.getData("memory"); //to get the right memory element

        if (!memory) return;

        const color =
            memoryBox.style.backgroundColor; //take the bg color

        const currentSymbol =
            symbolBox.firstElementChild; //take the current chosen symbol

            //I use Chat GPT to help me with this part
        if (!currentSymbol) return; //when you drag a new one

        star.innerHTML = ""; //then the old one will be delete

        const preview =
            currentSymbol.cloneNode(true); //make a copy of the symbol 

        applyColor(preview, color); //apply the color before put it in place

        star.appendChild(preview); //the symbol will appear with color on the zodiac sign
        // but not changing the color status of the symbols in the symbol choosing box

    });

});
//I use Chat GPT to help me with this part and fix the needed parts
function applyColor(symbol, color) { //apply the symbol and the color for the star

    if ( //if those are circle, square and star symbol
        symbol.classList.contains("circle") ||
        symbol.classList.contains("square") ||
        symbol.classList.contains("starr")
    ) {
        symbol.style.backgroundColor = color; //then take the textbox bgcolor to apply on the symbol
    }
//the triangle is made by border element so the coloring here is different
    if (symbol.classList.contains("triangle")) {
        symbol.style.borderBottomColor = color;
    }
//this is the filling part for the heart and the flower
    const shapes = symbol.querySelectorAll("path, circle, rect");

    shapes.forEach(shape => {
        shape.setAttribute("fill", color);
    }); //fill the path, circle and rect
}

let draggedStar = null;

// drag start
stars.forEach(star => {
    star.addEventListener("dragstart", () => {
        draggedStar = star;
    });
});

// allow drop
stars.forEach(star => {
    star.addEventListener("dragover", (e) => {
        e.preventDefault();
    });
});

//I use Chat GPT to help me with this part and fix the needed parts
// swap position
stars.forEach(star => {
    star.addEventListener("drop", (e) => {
        e.preventDefault();
        if (
            !draggedStar ||
            draggedStar === star
        ) return;
        //take all the star's content in the html (symbol and color)
        const draggedHTML = draggedStar.innerHTML;
        const targetHTML = star.innerHTML;
        //swap between the stars
        draggedStar.innerHTML = targetHTML;
        star.innerHTML = draggedHTML;
    });
});

trashZone.addEventListener(
    "dragover",
    (e) => {
        e.preventDefault();
    }
);

trashZone.addEventListener(
    "drop",
    (e) => {
        e.preventDefault();
        if (!draggedStar) return; //the star (colored symbol) will dissapear
        //and return all elements to the default
        draggedStar.innerHTML = "";
        draggedStar.style.backgroundColor = "";
        draggedStar.style.boxShadow = "";
    }
);