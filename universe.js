//I used Chat GPT to help me with this part and I fix the needed parts
document.addEventListener("DOMContentLoaded", () => {
    const viewport = document.getElementById("viewport");
    const canvas = document.getElementById("canvas");

    let scale = 1.5; //i choose to zoom a bit so it bring more discovery vibe
    // when user have to drag around to see all the zodiac sign
    let x = 0;
    let y = 0;

    //take the starting drag position
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    //to tell the canvas to move with the mouse movement
    function applyTransform() {
        canvas.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    }

    //put the view at center and calculate the zoom
    function initCenter() {
        const vp = viewport.getBoundingClientRect();
        const cv = canvas.getBoundingClientRect();
    //calculate the zoom after status
        const scaledWidth = cv.width * scale;
        const scaledHeight = cv.height * scale;
    //screen size - image size/2 -> the margin space -> then the canvas will be in the center at the start
        x = (vp.width - scaledWidth) / 2;
        y = (vp.height - scaledHeight) / 2;

        applyTransform();
    }

    viewport.addEventListener("mousedown", (e) => {
        isDragging = true; //start dragging
    //save the start point (the offset between the mouse and the canvas)
        startX = e.clientX - x; 
        startY = e.clientY - y;

        viewport.style.cursor = "grabbing";
    });
    //continue moving while dragging
    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return; //no drag then the canvas will stop moving
    //new position = current mouse position - the offset at the start
        x = e.clientX - startX;
        y = e.clientY - startY;

        applyTransform(); //decide the new position
    });

    document.addEventListener("mouseup", () => { //not clicking the mouse
        isDragging = false;//then stop dragging
        viewport.style.cursor = "grab"; //change the mouse icon
    });

    initCenter();
});