// Select The Start Game Button
document.querySelector(".control-buttons span").onclick = function() {

    // Prompt Window To Ask For Name
    let yourName = prompt("What's Your Name ?");
    if(yourName == null || yourName == "") {

        // Name Is Unknown Or Empty
        document.querySelector(".name span").innerHTML = "Unknown";
    } else {

        // Set Name To Your Name
        document.querySelector(".name span").innerHTML = yourName;
    }

    // Remove Splash Screen
    document.querySelector(".control-buttons").remove();
};
// Effect Duration
let duration = 2000;

// Select Block Container
let blockContainer = document.querySelector(".memory-game-blocks");

// Create Array From Game Blocks 
let blocks = Array.from(blockContainer.children);

// Create Range Of Keys [0 : 19] Spread Operator
//let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());

console.log(orderRange);
shuffle(orderRange);
console.log(orderRange);

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {

    // Add Css Order Property
    block.style.order = orderRange[index];

    // Add Click Enent
    block.addEventListener('click', function() {
        flipBlock(block);
    });

});

// Flip Block Function 
function flipBlock(selectBlock) {

    // Add Class is-flipped
    selectBlock.classList.add('is-flipped');

    // Collect All Flipped Cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));

    // If There Two Selected Blocks
    if(allFlippedBlocks.length === 2) {

        // Stop Clicking Function (Pointer Event)
        stopClicking();

        // Check Matched Block Function
        checkMatchedBlock(allFlippedBlocks[0], allFlippedBlocks[1]);
    } 
}

// Stop Clicking Function
function stopClicking() {

    // Add Class No Clicking On Main Container
    blockContainer.classList.add("no-clicking");

    // Wait Duration
    setTimeout(() => {
        // Remove Class No Clicking After The Duration
        blockContainer.classList.remove("no-clicking");
    }, duration);

}

// Check Matched Block
function checkMatchedBlock (firstBlock, secondBlock) {
    let triesElement = document.querySelector(".tries span");

    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
        document.getElementById('success').play();
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);
        document.getElementById('fail').play();
    }

}

// Shuffle Function 
function shuffle(array) {

    // Setting Variables
    let current = array.length;
    let temp;
    let random;

    while(current > 0) {
        
        // Get Random Number
        random = Math.floor(Math.random() * current);

        // Decrease Length By One
        current--;

        // [1] Save Current Element in Stash
        temp = array[current];

        // [2] Current Element = Random Element
        array[current] = array[random];

        // [3] Random Element = Get Element From Stash
        array[random] = temp;

    }    
    return array;
}



































