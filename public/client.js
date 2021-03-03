// "*LETS KEEP IT DARK MODE*"
//import bubble_Sort from '/bs.js'
// client-side js
// run by the browser each time your view template is loaded
let oldSize = 0;
let newSize = 0;
let oldGridSize = 0;
let newGridSize = 0;
let randArr = [];
let maxHeight = parseFloat(20.0);
let minHeight = parseFloat(2.0);
let timeValue = 0;
let isSorting = false;
let cells;
let focusBlue = "#2471a3";
let baseBlue = "#5dade2";
let correctGreen = "#2ecc71";
let wrongRed = " #f62a2a ";

function timer(ms) {
  return new Promise(res => setTimeout(res, ms));
}

function swap(arr, first_Index, second_Index) {
  var temp = arr[first_Index];
  arr[first_Index] = arr[second_Index];
  arr[second_Index] = temp;
}

function focusBar(arr, barInd1, barInd2, color) {
  document.getElementById("bar" + barInd1).style.backgroundColor = color;
  document.getElementById("bar" + barInd2).style.backgroundColor = color;
}

async function new_bubble_sort(arr) {
  var len = arr.length,
    i,
    j;
  for (i = 0; i < len - 1; i++) {
    for (j = 0; j < len - i - 1; j++) {
      focusBar(arr, j, j + 1, focusBlue);
      await timer(1000);
      if (arr[j] > arr[j + 1]) {
        focusBar(arr, j, j + 1, wrongRed);
        await timer(500);
        swap(arr, j, j + 1);
        generateGraphWithArgs(arr);
      }
      focusBar(arr, j, j + 1, correctGreen);
      await timer(1000);
      focusBar(arr, j, j + 1, baseBlue);
    }
  }
  return arr;
}

async function insertionSort(arr) {
  let i, j, key;
  const len = arr.length;
  for (i = 1; i < len; i++) {
    key = arr[i];

    j = i - 1;
    focusBar(arr, j, j, focusBlue);
    await timer(1000);
    while (j >= 0 && arr[j] > key) {
      focusBar(arr, j, j + 1, correctGreen);
      await timer(500);
      focusBar(arr, j, j + 1, baseBlue);
      arr[j + 1] = arr[j];
      generateGraphWithArgs(arr);
      j = j - 1;
    }
    arr[j + 1] = key;
    generateGraphWithArgs(arr);
  }

  return arr;
}
//console.log(insertionSort([7, 8, 5, 2, 4, 6, 3]));

function enableInput() {
  var to_disable_elems = document.getElementsByClassName("to-disable");
  document.getElementById("sort").innerHTML = "SORT";
  document.getElementById("sort").style.backgroundColor = "blue";
  for (let i = 0; i < to_disable_elems.length; i++) {
    to_disable_elems[i].style.pointerEvents = "all"; //style.display = "none";
  }
}
$(document).ready(function() {
  $(".dropdown-submenu a.test").on("click", function(e) {
    $(this)
      .next("ul")
      .toggle();
    e.stopPropagation();
    e.preventDefault();
  });

  $("#graph").html(
    '<div id="fixed" style="height:' +
      parseInt(maxHeight + 1) +
      'em;width:0.4px"></div>'
  );
  generateGraph();
  generateGrid();

  $("#sort").click(function(e) {
    e.preventDefault();
    //Disables the buttons
    var to_disable_elems = document.getElementsByClassName("to-disable");
    document.getElementById("sort").innerHTML = "SORTING";
    document.getElementById("sort").style.backgroundColor = "gray";
    for (let i = 0; i < to_disable_elems.length; i++) {
      to_disable_elems[i].style.pointerEvents = "none"; //style.display = "none";
    }
    //
    var currentSelection = document.getElementById("select_dropdown").value;
    //console.log(document.getElementById("select_dropdown").value);
    //bubble_sort_beta(randArr);
    if (currentSelection == "bubble_sort") {
      new_bubble_sort(randArr).then(() => {
        enableInput();
      });
    } else if (currentSelection == "insertion_sort") {
      insertionSort(randArr).then(() => {
        enableInput();
      });
    }
    //to_disable_elems = document.getElementsByClassName("to-disable")
    //document.getElementById("sort").innerHTML = "SORT";
    //document.getElementById("sort").style.backgroundColor = "blue";
    // for(let i =0;i<to_disable_elems.length;i++){
    //     to_disable_elems[i].style.pointerEvents =  "all";//style.display = "none";
    //   }
    // bubble_Sort(randArr);

    // insertionSort(randArr);

    //bubble_Sort(randArr)
  });
});

function onSelect(selectionDiv) {
  $("#navbarSupportedContent .active").removeClass("active");
  $("#" + selectionDiv).addClass("active");
}

function generateGraphWithArgs(arr) {
  var allBars = document.getElementsByClassName("bar");
  var allBarsSize = document.getElementsByClassName("bar-items");
  for (var i = 0; i < allBarsSize.length; i++) {
    allBarsSize[i].innerHTML = arr[i];
  }
  for (var i = 0; i < allBars.length; i++) {
    allBars[i].style.height = arr[i] + "em";
    allBars[i].height = arr[i];
  }

  // $("#graph").html(
  //     '<div id="fixed" style="height:' +
  //       parseInt(maxHeight + 1) +
  //       'em;width:0.4px"></div>'
  //   );
  //   arr.forEach(element => {
  //       $("#graph").append(
  //         '<div class="bar" id="bar' +
  //           index++ +
  //           '" style="height:' +
  //           element +
  //           'em"></div>'
  //       );
  //     });
}

function generateGraph() {
  newSize = $("#size_input").val();
  // console.log(oldSize);
  //console.log("a" + newSize);

  if (newSize != oldSize) {
    isSorting = false;
    var index = 0;
    $("#graph").html(
      '<div id="fixed" style="height:' +
        parseInt(maxHeight + 1) +
        'em;width:0.4px"></div>'
    );
    randArr = Array.from({ length: newSize }, () =>
      Math.floor(Math.random() * (maxHeight - minHeight) + minHeight)
    );
    randArr.forEach(element => {
      $("#graph").append(
        '<div class="bar-container"><div class="bar-items">' +
          element +
          '</div><div class="bar" id="bar' +
          index++ +
          '" style="height:' +
          element +
          'em"></div></div>'
      );
    });
    //console.log(randArr)
    oldSize = newSize;
  } else {
    isSorting = true;
  }
}

function changeColor(e) {
  let red = 256;
  let green = 256;
  let blue = 256;

  color = `rgb(${red},${green},${blue})`;
  e.target.style.backgroundColor = "black";
  //colorCount += 0.10;
}
function generateGrid() {
  mainDiv = $("#pathf_graph table");
  newGridSize = $("#gridsize_input").val();
  if (newGridSize != oldGridSize) {
    mainDiv.html("");
    gridSize = newGridSize;
    for (var i = 0; i < gridSize; i++) {
      const rowDiv = document.createElement("tr");
      rowDiv.className = "gridrow";
      for (var j = 0; j < gridSize * 4; j++) {
        const newDiv = document.createElement("td");
        newDiv.className = "grid";
        //newDiv.innerText = i + ' ' + j;
        rowDiv.append(newDiv);
      }
      mainDiv.append(rowDiv);
    }

    oldGridSize = newGridSize;
  }
}

setInterval(() => {
  generateGraph();
  generateGrid();
}, 50);
