let arr_request=[];
let arr_FCFSsequence=[];
let arr_SCANsequence=[];
let arr_CSCANsequence=[];
let arr_LOOKsequence=[];
let head=0;
let disk_size=200;
let disk_start=0;

document.getElementById('add').onclick=inputQueries;
document.getElementById('number').addEventListener("keyup", function (event) {                         // adding an event listner on queries input box for detecting the press of keyboard key 
    if (event.keyCode === 13)                                                                          // checking if pressed keyboard key is enter key or not(keycode of enter key is 13)
    inputQueries();                                                                                    // if above condition is true then calling InputQueries function
});

function inputQueries(){
    let q=document.getElementById("number").value;
    if(parseInt(q) < 0 || q == '' || q % 1 !== 0 || parseInt(q) > 199){
        alert("Please enter a valid positive integer!! (0<= value <= 199)");
        document.getElementById("number").value='';
    }
    else{
        arr_request.push(q);
        document.querySelector(".request-queue").insertAdjacentText("beforeend", q + ",");
        document.getElementById("number").value='';
    }
}
document.getElementById('headbtn').onclick=addHead;
document.getElementById('starting').addEventListener("keyup", function (event) {                    //adding an event listner on head input box for detecting the press of keyboard key   
    if (event.keyCode === 13)                                                                       //checking if pressed keyboard key is enter key or not(keycode of enter key is 13)
    addHead();  
});

function addHead(){
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

var rightDirection = document.getElementById('right');
var leftDirection = document.getElementById('left');

document.getElementById('cal').onclick=runAlgorithms;

function runAlgorithms(){
    setTimeout(function FCFS(){
        let seekTime=0,distance=0,current=0,head_pos=head;
        arr_FCFSsequence.push(head_pos);
        for(var i=0;i<arr_request.length;i++){
            arr_FCFSsequence.push(arr_request[i]);
            current=arr_request[i];
            distance=Math.abs(current-head_pos);
            seekTime+=distance;
            head_pos=current;
        }
        document.getElementById("outputFCFS").setAttribute('value',seekTime);
    },1);

    setTimeout(function CSCAN(){
        let seekTime=0,distance=0,current=0,direction,head_pos=head;

        if (rightDirection.checked)                                                                      // checking if right direction is selected or not
            direction = "right";                                                                          // if above condition is true then assigning value of direction to right
    

        if (leftDirection.checked)                                                                       // checking if left direction is selected or not
           direction = "left";                                                                           // if above condition is true then assigning value of direction to left
        
        let right=[];
        let left=[];

        for (let i = 0; i < arr_request.length; i++) {
            if (parseInt(arr_request[i]) < parseInt(head_pos))
                left.push(arr_request[i]);
            if (parseInt(arr_request[i]) > parseInt(head_pos))
                right.push(arr_request[i]);
        }

        left.push(disk_start);
        right.push(disk_size);

        left.sort(function(a, b){return a - b});
        right.sort(function(a, b){return a - b});

        switch(direction){
            case 'right':   for (let i = 0; i < right.length; i++){
                                current = right[i];
                                arr_CSCANsequence.push(current);
                                distance = Math.abs(current - head_pos);
                                seekTime += distance;
                                head_pos = current;
                            }
                            for (let i = 0; i < left.length; i++) {
                                current = left[i];
                                arr_CSCANsequence.push(current);
                                distance = Math.abs(current - head_pos);
                                seekTime += distance;
                                head_pos = current;
                            }
                            break;
            case 'left':    for (let i=left.length-1;i>=0;i--) {
                                current = left[i];
                                arr_CSCANsequence.push(current);
                                distance = Math.abs(current - head_pos);
                                seekTime += distance;
                                head_pos = current;
                            }
                            for (let i=right.length-1;i>=0;i--){
                                current = right[i];
                                arr_CSCANsequence.push(current);
                                distance = Math.abs(current - head_pos);
                                seekTime += distance;
                                head_pos = current;
                            }
                            break;
            default: console.log();
        }
        document.getElementById("outputCSCAN").setAttribute('value',seekTime);
    },1000);

    setTimeout(function SCAN(){
        let seekTime=0,distance=0,current=0,direction,head_pos=head;
    
     if (rightDirection.checked)                                                                      // checking if right direction is selected or not
        direction = "right";                                                                          // if above condition is true then assigning value of direction to right


     if (leftDirection.checked)                                                                       // checking if left direction is selected or not
         direction = "left";                                                                           // if above condition is true then assigning value of direction to left
        
    let right=[];
    let left=[];
        
    if(direction=='right')
            arr_request.push(parseInt(disk_size));
    else if(direction=='left')
            arr_request.push(parseInt(disk_start));
        
    for(let i=0;i<arr_request.length;++i){
            if(parseInt(arr_request[i])<parseInt(head_pos))
                left.push(arr_request[i]);
            else if(parseInt(arr_request[i])>parseInt(head_pos))
                right.push(arr_request[i]);
        }
    
        left.sort(function(a, b){return a - b});
        right.sort(function(a, b){return a - b});
    
     for(var x=2;x>0;--x){
            if(direction=='right'){
                for(var i=0;i<right.length;++i){
                    current=right[i];
                    arr_SCANsequence.push(current);
                    distance=Math.abs(current-head_pos);
                    seekTime=seekTime+distance;
                    head_pos=current;
                }
                direction='left';
            }
            else if(direction=='left'){
                for(var i=left.length-1;i>=0;--i){
                    current=left[i];
                    arr_SCANsequence.push(current);
                    distance=Math.abs(current-head_pos);
                    seekTime=seekTime+distance;
                    head_pos=current;
                }
                direction='right';
            }
        }
        document.getElementById("outputSCAN").setAttribute('value',seekTime);
    },2000);
    setTimeout(function LOOK(){
        let seekTime=0,distance=0,current=0,direction,head_pos=head;

       if (rightDirection.checked)                                                                      // checking if right direction is selected or not
         direction = "right";                                                                          // if above condition is true then assigning value of direction to right


       if (leftDirection.checked)                                                                       // checking if left direction is selected or not
          direction = "left";                                                                           // if above condition is true then assigning value of direction to left

        if(direction=='right')
            arr_request.pop();
        else if(direction=='left')
            arr_request.pop();
        let right=[];
        let left=[];
        for(let i=0;i<arr_request.length;++i){
            if(parseInt(arr_request[i])<parseInt(head_pos))
                left.push(arr_request[i]);
            if(parseInt(arr_request[i])>parseInt(head_pos))
                right.push(arr_request[i]);
        }
        left.sort(function(a, b){return a - b});
        right.sort(function(a, b){return a - b});
        let run=2;
        while(run-->0){
            if(direction=='right'){
                for(let i=0;i<right.length;++i){
                    current = right[i];
                    arr_LOOKsequence.push(current);
                    distance = Math.abs(current - head_pos);
                    seekTime += distance;
                    head_pos = current;
                }
                direction='left';
            }
            else if(direction=='left'){
                for(let i=left.length-1;i>=0;--i){
                    current = left[i];
                    arr_LOOKsequence.push(current);
                    distance = Math.abs(current - head_pos);
                    seekTime += distance;
                    head_pos = current;
                }
                direction='right';
            }
        }
        document.getElementById('outputLOOK').setAttribute('value',seekTime);
    },3000);
}

document.getElementById('diagram').onclick=showGraph;
// setTimeout(showGraph,12000);
function showGraph(){
    let operation_numberFCFS=[];
    let operation_numberSCAN=[];
    let operation_numberCSCAN=[];
    let operation_numberLOOK=[];
    arr_CSCANsequence.splice(0,0,head);
    arr_LOOKsequence.splice(0,0,head);
    arr_SCANsequence.splice(0,0,head);
    let j=0;
    for(var i=0;i<arr_FCFSsequence.length;++i){
        operation_numberFCFS[i]=j;
        ++j;
    }
    j=0;
    for(var i=0;i<arr_SCANsequence.length;++i){
        operation_numberSCAN[i]=j;
        ++j;
    }
    j=0;
    for(var i=0;i<arr_CSCANsequence.length;++i){
        operation_numberCSCAN[i]=j;
        ++j;
    }
    j=0;
    for(var i=0;i<arr_LOOKsequence.length;++i){
        operation_numberLOOK[i]=j;
        ++j;
    }
    var FCFSline={
        y:operation_numberFCFS,
        x:arr_FCFSsequence,
        type: 'scatter',
        line: {
            color: 'rgb(0,0,255)'
        },
        marker: {
            color: 'rgb(0,0,0)',
            size: 4
        }, name: 'FCFS'
    }
    var SCANline={
        y:operation_numberSCAN,
        x:arr_SCANsequence,
        type: 'scatter',
        line: {
            color: 'rgb(255,0,0)'
        },
        marker: {
            color: 'rgb(0,0,0)',
            size: 4
        }, name: 'SCAN'
    }
    var CSCANline={
        y:operation_numberCSCAN,
        x:arr_CSCANsequence,
        type: 'scatter',
        line: {
            color: 'rgb(0,255,255)'
        },
        marker: {
            color: 'rgb(0,0,0)',
            size: 4
        }, name: 'CSCAN'
    }
    var LOOKline={
        y:operation_numberLOOK,
        x:arr_LOOKsequence,
        type: 'scatter',
        line: {
            color: 'rgb(0,255,0)'
        },
        marker: {
            color: 'rgb(0,0,0)',
            size: 4
        }, name: 'LOOK'
    }
    var data=[FCFSline,SCANline,CSCANline,LOOKline];
    var layout = {
        title: {
            text: 'Compare Graph'
        },
        xaxis: {
            gridwidth: 3,
            fixedrange: true,
            tickvals: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200],
            zeroline: false,
            range: [0, 200],
            title: {
                text: 'Request Queue →'
            }
        },
        yaxis: {
            ticklen: 10,
            tickformat: '.0f',
            fixedrange: true,
            zeroline: false,
            title: {
                text: 'Operation Number →'
            }
        }
    }
    var config={
        responsive:true
    }
    Plotly.newPlot('graph', data,layout,config);
}