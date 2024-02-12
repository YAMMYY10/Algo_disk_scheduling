// SCAN algorithm 
// author: Pulak Jain, Om Patel, Nabhi Shah

/* ------------------------------------------------Taking input from User and forming Request Queue-------------------------------------------------------- */

let arr_requestQueue = [];                                                                // creating an array for storing request queue queries

document.getElementById('add').onclick = inputQueries;                                    // calling input queries function on click event on add button of queries

//The below line 16 to line 20 is code to input values from user on press of enter key

document.getElementById('number').addEventListener("keyup", function (event) {            // adding an event listner on queries input box for detecting the press of keyboard key 
    if (event.keyCode === 13)                                                             // checking if pressed keyboard key is enter key or not(keycode of enter key is 13)
    inputQueries();                                                                    // if above condition is true then calling InputQueries function
    
});

//The below line 24 to 36 will check the input of user and then push in array and will also create request queue html               

function inputQueries() {
    let val = document.getElementById("number").value;                                      // storing value in val which is being input by user in queries input box
    if (parseInt(val) < 0 || val == '' || val % 1 !== 0 || parseInt(val) > 199) {           // checking if input number is non positive integer or not
        alert("Please enter a valid positive integer!! (0<= value <= 199)");                // if condition is true alerting about wrong input is written
        document.getElementById("number").value = '';                                       // And then again making input box empty for user 
    }
    else {
        arr_requestQueue.push(val);                                                                    // if condition is false then pushing that value in array  
        document.querySelector(".request-queue").insertAdjacentText("beforeend", val + ",");           // Printing the value in request queue section
        document.getElementById("number").value = '';                                                  // And then again making input box empty for user 
    }
}

/* -------------------------------------------------------------Taking input for Head position--------------------------------------------------------- */

let head, temp;                                                                             // Creating variables for storing purpose of input

document.getElementById('headbtn').onclick = addHead;                                       // calling addHead function on click event on add button of Head

//The below line 45 to line 50 is code to input values from user on press of enter key

document.getElementById('starting').addEventListener("keyup", function (event) {            //adding an event listner on head input box for detecting the press of keyboard key   
    if (event.keyCode === 13)                                                              //checking if pressed keyboard key is enter key or not(keycode of enter key is 13)
    addHead();                                                                          //if above condition is true then calling addHead function
    
});

//The below line 53 to line 62 is code to input values from user on press of enter key

function addHead() {
    temp = document.getElementById('starting').value;                                      // Storing value of head entered by user in temperory variable
    if (parseInt(temp) < 0 || temp == '' || temp % 1 !== 0 || parseInt(temp) > 199) {      // checking if input number is non positive integer or not
        alert("Please enter a valid positive integer!! (0<= head <= 199)");                // if condition is true alerting about wrong input is written
        document.getElementById("starting").value = '';                                    // And then again making input box empty for user 
    }
    else 
    head = temp;                                                                       // if condition is false then storing in head variable
    
}

/* --------------------------------------------------------------------Taking input for Direction--------------------------------------------------------------- */

var rightDirection = document.getElementById('right');
var leftDirection = document.getElementById('left');

/* -----------------------------------------------------------------Toggling the display for chart and time seek statement---------------------------------------- */

// Here In HTML mutiple class are written and if an event (click on calculate button) occur the other class is getting activate 

document.querySelector('#cal').addEventListener("click", () => {
    document.querySelector('.time-seek').classList.toggle('toogle-class');
    document.querySelector('.Chart').classList.toggle('toogle-class');
});

/* ------------------------------------------------------------------------------SCAN Algorithm ------------------------------------------------------------------ */

let arr_seekSeq = [];                                                                       // declaring array
let arr_right = [];                                                                         // declaring array
let arr_left = [];                                                                          // declaring array 
let diskSize = 199;                                                                         // initializing disk size to 200
let current, distance = 0, seekTime = 0;                                                    // declaring variables

document.getElementById('cal').onclick = SCAN;                                              // calling SCAN function on click event on Calculate button


//Function- Scan implementing algorithm

function SCAN() {

    if (rightDirection.checked)                                                         // checking if right direction is selected or not
    direction = "right"                                                              // if above condition is true then assigning value of direction to right
    

    if (leftDirection.checked)                                                         // checking if left direction is selected or not
    direction = "left"                                                              // if above condition is true then assigning value of direction to left
    

    if (direction == 'right') 
    arr_requestQueue.push(diskSize);                                                //if direction == right , pushing disksize to request Queue, 
    
    else if (direction == 'left')                                                      // else pushing 0
    arr_requestQueue.push(0);
    

    for (let i = 0; i < arr_requestQueue.length; ++i) {
        if (parseInt(arr_requestQueue[i]) < parseInt(head))                               //dividing the array into right and left sub array according to their values
        arr_left.push(arr_requestQueue[i]);                                           //compared to the head (greater or less)
        else if (parseInt(arr_requestQueue[i]) > parseInt(head))
        arr_right.push(arr_requestQueue[i]);
    }

    arr_left.sort(function (a, b) { return a - b });                                      // Sorting left and right sub array according to seektime
    arr_right.sort(function (a, b) { return a - b });

    for (var x = 2; x > 0; --x) {
        if (direction == 'right') {
            for (var i = 0; i < arr_right.length; ++i) {
                current = arr_right[i];
                arr_seekSeq.push(current);
                distance = Math.abs(current - head);                                       //Calculating total seekTime for right sub array
                seekTime = seekTime + distance;
                head = current;
            }
            direction = 'left';
        }
        else if (direction == 'left') {
            for (var i = arr_left.length - 1; i >= 0; --i) {                              
                current = arr_left[i];                                                 
                arr_seekSeq.push(current);
                distance = Math.abs(current - head);                                      // Calculating total seek time for left sub array
                seekTime = seekTime + distance;
                head = current;
            }
            direction = 'right';
        }
    }
    document.getElementById("output").setAttribute('value', seekTime);                    // setting the value attribute of output to seekTime
}

/* ---------------------------------------------Disabling the edit for time seek ------------------------------------------------------ */
document.getElementById('output').disabled = true;

/* ---------------------------------------------------Plotting Graph------------------------------------------------------------------ */

document.getElementById('diagram').onclick = showGraph;
function showGraph() {
    head = document.getElementById('starting').value;
    arr_seekSeq.splice(0, 0, head);
    var seekSequence = arr_seekSeq;
    var operationNumber = [];
    var j = 0;
    for (var i = 0; i < arr_seekSeq.length; ++i) {
        operationNumber[i] = j;
        ++j;
    }

    /*--------------------------------------Styling  Graph----------------------------------------------*/

    var data = [{
        x: seekSequence,
        y: operationNumber,
        type: 'lines',
        line: {
            color: 'rgb(0,0,255)'
        },
        marker: {
            color: 'rgb(0,0,0)',
            size: 8
        }
    }];
    var layout = {
        //Code to add title of the graph 
        title: {
            text: 'SCAN Graph'
        },
        xaxis: {
            gridwidth: 3,
            fixedrange: true,
            tickvals: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200],
            zeroline: false,
            range: [0, 200],
            // tickangle:-90,
            title: {
                text: 'Request Queue →'
            }
        },
        yaxis: {
            range: [j, 0],
            ticklen: 10,
            tickformat: '.0f',
            fixedrange: true,
            zeroline: false,
            // tickangle:-90,
            title: {
                text: '← Operation Number'
            }
        }
    };

    
    var config = {
        responsive: true,
        displayModeBar: false
    }
    Plotly.newPlot('graph', data, layout, config);
}





 /* Time complexity for the SCAN algorithm : 

 1) sorting arr_left & arr_right  -->  = 2*O(nlogn)
 2) calculating total seek time --> O(m)+O(n-m)     m is the length of arr_right.
 3) all other functions like push, Math.abs & if else loops ----> O(1)
 
 therefore overall time complexity : O(nlogn), for best case, average case and worst case.
 where n is the number of elements in the request queue.*/



 /* Time complexity of graph:
 
 for loop traversing the array arr_seekSequence will run n times
 other operations will have constant time complexity, Hence time complexity : O(n)
 
 */


 /* Space complexity:  Creating three new arrays of length n for SCAN akgorithm of length n, hence space complexity == O(n), while its O(1) for plotting the graph */