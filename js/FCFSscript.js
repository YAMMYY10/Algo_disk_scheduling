// LOOK algorithm 
// Author: Pulak Jain, Om Patel, Nabhi Shah, Saumya Shah, Jugal Soni

/* ------------------------------------------------Taking input from User and forming Request Queue-------------------------------------------------------- */

let arr_requestQueue = [];                                                                             // creating an array for storing request queue queries

document.getElementById('add').onclick = inputQueries;                                                 // calling input queries function on click event on add button of queries

                                //The below line 12 to line 15 is code to input values from user on press of enter key

document.getElementById('number').addEventListener("keyup", function (event) {                         // adding an event listner on queries input box for detecting the press of keyboard key 
    if (event.keyCode === 13)                                                                          // checking if pressed keyboard key is enter key or not(keycode of enter key is 13)
    inputQueries();                                                                                // if above condition is true then calling InputQueries function
});

                              // The below line 19 to 32 will check the input of user and then push in array and will also create request queue html               

function inputQueries() {

    let val = document.getElementById("number").value;                                                 // storing value in val which is being input by user in queries input box
    
    if (parseInt(val) < 0 || val == '' || val % 1 !== 0 || parseInt(val) > 199) {                      // checking if input number is non positive integer or not
        alert("Please enter a valid positive integer!! (0<= value <= 199)");                           // if condition is true alerting about wrong input is written
        document.getElementById("number").value = '';                                                  // And then again making input box empty for user 
    }
    else {
        arr_requestQueue.push(val);                                                                    // if condition is false then pushing that value in array  
        document.querySelector(".request-queue").insertAdjacentText("beforeend", val + ",");           // Printing the value in request queue section
        document.getElementById("number").value = '';                                                  // And then again making input box empty for user 
    }
}

/* -------------------------------------------------------------Taking input for Head position------------------------------------------------------------------------ */

let head, temp;                                                                                        // Creating variables for storing purpose of input

document.getElementById('headbtn').onclick = addHead;                                                  // calling addHead function on click event on add button of Head

// let text=document.getElementsByClassName("toalert");

                                  // The below line 44 to line 48 is code to input values from user on press of enter key

document.getElementById('starting').addEventListener("keyup", function (event) {                      //adding an event listner on head input box for detecting the press of keyboard key   
    if (event.keyCode === 13)                                                                       //checking if pressed keyboard key is enter key or not(keycode of enter key is 13)
    addHead();                                                                                    //if above condition is true then calling addHead function
    
});

                                  // The below line 52 to line 67 is code to input values from user on press of enter key

function addHead() {
    temp = document.getElementById('starting').value;                                                 // Storing value of head entered by user in temperory variable
    if (parseInt(temp) < 0 || temp == '' || temp % 1 !== 0 || parseInt(temp) > 199) {                 // checking if input number is non positive integer or not
        alert("Please enter a valid positive integer!! (0<= head <= 199)");                           // if condition is true alerting about wrong input is written
        document.getElementById("starting").value = '';                                               // And then again making input box empty for user 
    }
    else{ 
        head = temp;                                                                                  // if condition is false then storing in head variable
        
        document.querySelector(".toalert").innerHTML="Head Added";
        
        setTimeout(function(){
            document.querySelector(".toalert").innerHTML="";
        }, 1000);
    }                                                                                  
}

// /* --------------------------------------------------------------------Taking input for Direction--------------------------------------------------------------- */

// var rightDirection = document.getElementById('right');
// var leftDirection = document.getElementById('left');

/* -----------------------------------------------------------------Toggling the display for chart and time seek statement---------------------------------------- */

                   // Here In HTML mutiple class are written and if an event (click on calculate button) occur the other class is getting activate 

document.querySelector('#cal').addEventListener("click", () => {
    document.querySelector('.time-seek').classList.toggle('toogle-class');
    document.querySelector('#graph').classList.toggle('toogle-class');
});


// let arr_seekSeq = [];                                                                                // declaring array
// let current, distance = 0, seekTime = 0;                                                             // declaring variables
document.getElementById('cal').onclick=FCFS;

var arr_seekSeq = [],current_position;                                                                  // declaring array
function FCFS(){
    var distance=0,seekTime=0;
    for(var i=0;i<arr_requestQueue.length;i++){
        arr_seekSeq.push(arr_requestQueue[i]);
        current_position=arr_requestQueue[i];
        distance=Math.abs(current_position-head);
        seekTime+=distance;
        head=current_position;
    }
    document.getElementById("output").setAttribute('value',seekTime);
    // console.log("the final seek seqyuence is:",arr_seekSeq);
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
            text: 'FCFS Graph'
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
            range: [ 0,j],
            ticklen: 10,
            tickformat: '.0f',
            fixedrange: true,
            zeroline: false,
            // tickangle:-90,
            title: {
                text: 'Operation Number →'
            }
        }
    };

    
    var config = {
        responsive: true,
        displayModeBar: false
    }
    Plotly.newPlot('graph', data, layout, config);
}





/* Time complexity for the LOOK algorithm : 

 1) sorting arr_left & arr_right  -->  = 2*O(nlogn)
 2) calculating total seek time --> O(m)+O(n-m)     m is the length of arr_right.
 3) all other functions like push, Math.abs & if else loops ----> O(1)
 
 therefore overall time complexity : O(nlogn), for best case, average case and worst case.
 where n is the number of elements in the request queue.*/



 /* Time complexity of graph:
 
 for loop traversing the array arr_seekSequence will run n times
 other operations will have constant time complexity, Hence time complexity : O(n)
 
 */


 /* Space complexity: 
 
   Creating three new arrays of length n for CSCAN akgorithm of length n, hence space complexity == O(n), while its O(1) for plotting the graph
   
*/

// /* Creation of Request Queue */

// let arr=[]; // creating array for request queue

// document.getElementById('add').onclick=inputQueries;


// document.getElementById('number').addEventListener("keyup", function(event) {
//     if (event.keyCode === 13) {
//         event.preventDefault();
//         inputQueries();
//     }
// });

// function inputQueries(){
//     let val=document.getElementById("number").value;
//     if(val<0 || val%1!==0 || val==''){
//         alert("Please enter a valid number");
//         document.getElementById("number").value="";
//     }
//     else{
//         arr.push(val);
//         document.querySelector(".request-queue").insertAdjacentText("beforeend",val+",");
//         document.getElementById("number").value='';
//     }
// }


// /* Addition of head position value of which is taken from user */

// let head_position=0;//inititalising head_position

// document.getElementById('headbtn').onclick=addHead;

// document.getElementById('starting').addEventListener("keyup", function(event) {
//     if (event.keyCode === 13) {
//         event.preventDefault();
//         addHead();
//     }
// });

// function addHead(){
//     let temp_head=document.getElementById('starting').value;
    
//     // console.log(typeof(temp_head));
    
//     if(temp_head<0 || temp_head%1!==0 || temp_head==''){
//         alert("Please enter a valid number");
//         document.getElementById('starting').value="";
//     }
//     else
//     head_position=temp_head;
    
// }

// /* Calling FCFS algorithm on click of Calculate Button */

// document.getElementById('cal').onclick=FCFS;

// /* The below code is FCFS algorithm and Seekcount algorithm*/


// function FCFS(){
//     var distance,current_position;
//     var seekCount=0;
//     for(var i=0;i<arr.length;i++){
//         current_position=arr[i];
//         distance=Math.abs(current_position-head_position);
//         seekCount+=distance;
//         head_position=current_position;
//     }
//     document.getElementById("output").setAttribute('value',seekCount);
// }

// /* The below code will show the chart on the screen */

// document.getElementById('diagram').onclick=showGraphFCFS;
// function showGraphFCFS(){
//     head=document.getElementById('starting').value;
//     var newarray=arr;
//     newarray.splice(0,0,head);
//     var xAxis=newarray;
//     var yAxis=[];
//      var j=0;
//      for(var i=0;i<arr.length;++i){
//          yAxis[i]=j;
//          j++;
//      }
//     new Chart("FCFSchart", {
//         type: "line",
//         title:{
//             text:"Seek sequence graph"
//         },
//         data: {
//           labels: yAxis,
//           datasets: [{
//               label:'Disk graph',
//             backgroundColor: "rgba(0,0,0,1.0)",
//             borderColor: "rgb(255,0,0)",
//             data: xAxis
//           }]
//         },
//         options:{
//           legend: {display: false},
//           scales: {
//             yAxes: {
//                 title: {
//                     display: true,
//                     text: "Request_Queue →",
//                     font: {
//                         size: 15
//                     }
//                 },
//                 ticks: {
//                     precision: 0
//                 }
//             },
//             xAxes: {
//                 title: {
//                     display: true,
//                     text: "Operation Number →",
//                     font: {
//                         size: 15
//                     }
//                 }
//             }
//         },
//           plugins: {
//             legend: {
//                 display: false
//             }
//         }
//         }
//     });
// }

// /* Now the below code will toggle chart and time seek statement */

// /* Here In HTML mutiple class are written and if an event (click on calculate button) occur the other class is getting activate  */
// document.querySelector('#cal').addEventListener("click",()=>{
//     document.querySelector('.time-seek').classList.toggle('toogle-class');
//     document.querySelector('.Chart').classList.toggle('toogle-class');
// });