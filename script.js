// Set grid size
const grid = document.querySelector('.grid');
const slider = document.querySelector('.slider');
let gridDensity = 25;

slider.addEventListener("change", e => {
    gridDensity = e.target.value;
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
      }
      runApp();
});

function runApp() {

    // Add grid of divs to grid class
    function addDiv (rowCol) {
        
        for (let i = 0; i < rowCol; i++) {
            let row = document.createElement('div');
            row.className = "row";
            row.style.height = `${calcDim(rowCol)}%`;
            
            for (let j = 0; j < rowCol; j++) {
                let cell = document.createElement('div');
                cell.className = "cell";
                cell.style.width = `${calcDim(rowCol)}%`;
                cell.style.height = "100%";
                row.appendChild(cell);
            }

            grid.appendChild(row);
        }
    }

    function calcDim(dim) {
        return (1 / dim * 100);
    }

    addDiv(gridDensity);

    // Change color based on color button selection
    const sidebarButtons = Array.from(document.querySelectorAll(".sidebar-button"));
    const color = document.querySelector(".color-picker");
    sidebarButtons.forEach(button => {
        button.addEventListener('click', () => {
            styleButtons(button);
            button.classList.remove("inactive-button");
            button.classList.add("active-button");
        })
    })

    function styleButtons(object) {
        let zero = sidebarButtons[0];
        let one = sidebarButtons[1];
        let two = sidebarButtons[2];
        if (object == sidebarButtons[0]) {
            zero.classList.add("active-button");
            zero.classList.remove("inactive-button");
            one.classList.add("inactive-button");
            one.classList.remove("active-button");
            two.classList.add("inactive-button");
            two.classList.remove("active-button");
            display = displayTypes[0];
        } else if (object == sidebarButtons[1]) {
            one.classList.add("active-button");
            one.classList.remove("inactive-button");
            zero.classList.add("inactive-button");
            zero.classList.remove("active-button");
            two.classList.add("inactive-button");
            two.classList.remove("active-button");
            display = displayTypes[1];
        } else if (object == sidebarButtons[2]) {
            two.classList.add("active-button");
            two.classList.remove("inactive-button");
            one.classList.add("inactive-button");
            one.classList.remove("active-button");
            zero.classList.add("inactive-button");
            zero.classList.remove("active-button");
            display = displayTypes[2];
        }
    }

    let gridCells = Array.from(document.querySelectorAll(".cell"));
    let displayTypes = ["grayscale", "psychadelic", "color"];
    let display = displayTypes[0];

    gridCells.forEach(cell => {
        cell.addEventListener('mouseover', () => {
            addColor(cell);
        });
    });

    // On hover color the divs

    function addColor(object) {
        switch (display) {
            case "grayscale":
                let opacity = object.style.opacity;
                if (opacity < 1) {
                    object.style.backgroundColor = "black";
                    opacity = 0.2 + (opacity * 1);
                    object.style.opacity = `${opacity}`;
                }
                break;
            
            case "psychadelic":
                let psychadelicColors = ["aqua", "aquamarine", "blue", "blueviolet", "brown", "blanchedalmond", "charteuse", "cadetblue", "crimson", "mediumspringgreen", 
                        "darkgreen", "orange", "darksalmon", "deeppink", "tomato", "teal", "olive", "plum", "yellow", "gold", "greenyellow"];
                let randomNum = Math.floor(Math.random() * 21);
                object.style.backgroundColor = `${psychadelicColors[randomNum]}`;
                object.style.opacity = 1; 
                break;

            case "color":
                object.style.backgroundColor = color.value;
                object.style.opacity = 1; 
                break; 
        }
    }

    // Clear screen on button click
    const clear = document.querySelector(".shake");
    const handHeld = document.querySelector(".handheld");
    clear.addEventListener('click', () => {
        gridCells.forEach(cell => {
            cell.style.backgroundColor = "transparent";
        })
        handHeld.classList.add("shake-animation");
        setTimeout(function(){
            handHeld.classList.remove("shake-animation");
        }, 500);
    })

}

runApp();