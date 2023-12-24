// //---------------------------------//
// //   GLOBAL VARIABLES              //
// //---------------------------------//

// const CrosswordList = [
//   {
//     id: 1,
//     question: "Thủ đô Việt Nam",
//     answer: "HaNoi",
//   },
//   {
//     id: 2,
//     question: "Đà nẵng ở đâu",
//     answer: "DaNang",
//   },
//   {
//     id: 3,
//     question: "Nam Định ở đâu",
//     answer: "NamDinh",
//   },
//   {
//     id: 4,
//     question: "Hà Nam ở đâu",
//     answer: "HaNam",
//   },
//   {
//     id: 5,
//     question: "Ninh Bình ở đâu",
//     answer: "NinhBinh",
//   },
//   {
//     id: 6,
//     question: "Hoà Bình ở đâu",
//     answer: "HoaBinh",
//   },
//   {
//     id: 7,
//     question: "Bình Thuận ở đâu",
//     answer: "BinhThuan",
//   },
//   {
//     id: 8,
//     question: "Tam Đảo ở đâu",
//     answer: "TamDao",
//   },
//   {
//     id: 9,
//     question: "Đồng Đô ở đâu",
//     answer: "DongDo",
//   },
//   {
//     id: 10,
//     question: "Bác Hồ",
//     answer: "QuangTruongBaDinh",
//   },
// ];

// var board,
//   wordArr,
//   wordBank,
//   wordsActive,
//   boardMap,
//   focusChar,
//   focusIndex = null,
//   mode,
//   wordElementsAcross,
//   wordElementsDown;

// var answers = [];

// var Bounds = {
//   top: 0,
//   right: 0,
//   bottom: 0,
//   left: 0,

//   Update: function (x, y) {
//     this.top = Math.min(y, this.top);
//     this.right = Math.max(x, this.right);
//     this.bottom = Math.max(y, this.bottom);
//     this.left = Math.min(x, this.left);
//   },

//   Clean: function () {
//     this.top = 999;
//     this.right = 0;
//     this.bottom = 0;
//     this.left = 999;
//   },
// };

// //---------------------------------//
// //   MAIN                          //
// //---------------------------------//

// function Play() {
//   var charEleArr = document.getElementsByClassName("char");
//   mode = 0;

//   for (var i = 0; i < charEleArr.length; i++) {
//     RegisterChar(charEleArr[i], boardMap[i]);
//     charEleArr[i].placeholder = "";
//   }

//   ToggleInputBoxes(false);

//   FormatClues();
// }

// function FormatClues() {
//   var cluesAcross = document.getElementById("cluesAcross"),
//     cluesDown = document.getElementById("cluesDown"),
//     directionAcross = document.getElementById("directionAcross"),
//     directionDown = document.getElementById("directionDown");

//   cluesAcross.innerHTML = "";
//   cluesDown.innerHTML = "";

//   cluesAcross.appendChild(directionAcross);
//   cluesDown.appendChild(directionDown);

//   for (i = 0; i < wordElementsAcross.length; i++) {
//     var lineEle = cluesAcross.appendChild(wordElementsAcross[i].ele),
//       numEle = lineEle.getElementsByClassName("lineNum")[0];
//     // console.log(numEle);
//     numEle.innerHTML = wordElementsAcross[i].num;
//     RemoveClass(numEle, "disabled");
//   }

//   for (i = 0; i < wordElementsDown.length; i++) {
//     var lineEle = cluesDown.appendChild(wordElementsDown[i].ele),
//       numEle = lineEle.getElementsByClassName("lineNum")[0];
//     numEle.innerHTML = wordElementsDown[i].num;
//     RemoveClass(numEle, "disabled");
//   }
// }

// function Create() {
//   wordElementsAcross = [];
//   wordElementsDown = [];

//   // console.log();

//   if (mode === 0) {
//     mode = 1;
//     document.getElementById("crossword").innerHTML = BoardToHtml(" ");
//     ToggleInputBoxes(true);
//   }
// }

// function Generate() {
//   wordElementsAcross = [];
//   wordElementsDown = [];

//   mode = 1;
//   GetWordsFromInput();

//   for (var i = 0, isSuccess = false; i < 19 && !isSuccess; i++) {
//     CleanVars();
//     isSuccess = PopulateBoard();
//   }

//   document.getElementById("crossword").innerHTML = isSuccess
//     ? BoardToHtml(" ")
//     : "Failed to find crossword.";

//   FormatClues();
//   ToggleInputBoxes(true);
// }

// function ToggleInputBoxes(active) {
//   var w = document.getElementsByClassName("word"),
//     d = document.getElementsByClassName("clue"),
//     b = document.getElementById("btnGen"),
//     dir = document.getElementsByClassName("clueDirection"),
//     char = document.getElementsByClassName("char");

//   if (active) {
//     RemoveClass(b, "disabled");

//     for (var i = 0; i < w.length; i++) {
//       RemoveClass(w[i], "hide");
//       RemoveClass(d[i], "clueReadOnly");
//       d[i].disabled = "";
//     }

//     for (i = 0; i < dir.length; i++) {
//       AddClass(dir[i], "disabled");
//     }

//     for (i = 0; i < char.length; i++) {
//       AddClass(char[i], "charReadOnly");
//       char[i].disabled = "readonly";
//     }
//   } else {
//     AddClass(b, "disabled");

//     for (var i = 0; i < w.length; i++) {
//       AddClass(w[i], "hide");
//       AddClass(d[i], "clueReadOnly");
//       d[i].disabled = "readonly";
//     }

//     for (i = 0; i < dir.length; i++) {
//       RemoveClass(dir[i], "disabled");
//     }

//     for (i = 0; i < char.length; i++) {
//       RemoveClass(char[i], "charReadOnly");
//       char[i].disabled = "";
//     }
//   }
// }

// function GetWordsFromInput() {
//   wordArr = [];
//   for (
//     var i = 0, val, w = document.getElementsByClassName("line");
//     i < w.length;
//     i++
//   ) {
//     val = w[i].getElementsByClassName("word")[0].value.toUpperCase();
//     //   console.log(val);
//     if (val !== null && val.length > 1) {
//       wordArr.push({ ele: w[i], value: val });
//     }
//   }
// }

// function CleanVars() {
//   Bounds.Clean();
//   wordBank = [];
//   wordsActive = [];
//   board = [];

//   for (var i = 0; i < 50; i++) {
//     board.push([]);
//     for (var j = 0; j < 50; j++) {
//       board[i].push({ value: null, char: [] });
//     }
//   }
// }

// function PopulateBoard() {
//   PrepareBoard();
//   //console.log("board: "+ board.length);
//   for (var i = 0, isOk = true, len = wordBank.length; i < len && isOk; i++) {
//     isOk = AddWordToBoard();
//   }
//   return isOk;
// }

// function PrepareBoard() {
//   wordBank = [];

//   for (var i = 0, len = wordArr.length; i < len; i++) {
//     wordBank.push(new WordObj(wordArr[i]));
//   }
//   //console.log(wordBank);

//   for (i = 0; i < wordBank.length; i++) {
//     for (var j = 0, wA = wordBank[i]; j < wA.char.length; j++) {
//       for (var k = 0, cA = wA.char[j]; k < wordBank.length; k++) {
//         for (var l = 0, wB = wordBank[k]; k !== i && l < wB.char.length; l++) {
//           wA.totalMatches += cA === wB.char[l] ? 1 : 0;
//         }
//       }
//     }
//   }
// }

// // TODO: Clean this guy up
// function AddWordToBoard() {
//   var i,
//     len,
//     curIndex,
//     curWord,
//     curChar,
//     curMatch,
//     testWord,
//     testChar,
//     minMatchDiff = 9999,
//     curMatchDiff;

//   if (wordsActive.length < 1) {
//     curIndex = 0;
//     for (i = 0, len = wordBank.length; i < len; i++) {
//       if (wordBank[i].totalMatches < wordBank[curIndex].totalMatches) {
//         curIndex = i;
//       }
//     }
//     wordBank[curIndex].successfulMatches = [{ x: 12, y: 12, dir: 0 }];
//   } else {
//     curIndex = -1;

//     for (i = 0, len = wordBank.length; i < len; i++) {
//       curWord = wordBank[i];
//       //console.log(curWord);
//       curWord.effectiveMatches = 0;
//       curWord.successfulMatches = [];
//       for (var j = 0, lenJ = curWord.char.length; j < lenJ; j++) {
//         curChar = curWord.char[j];
//         for (var k = 0, lenK = wordsActive.length; k < lenK; k++) {
//           testWord = wordsActive[k];
//           for (var l = 0, lenL = testWord.char.length; l < lenL; l++) {
//             testChar = testWord.char[l];
//             if (curChar === testChar) {
//               curWord.effectiveMatches++;
//               var curCross = { x: testWord.x, y: testWord.y, dir: 0 };
//               if (testWord.dir === 0) {
//                 curCross.dir = 1;
//                 curCross.x += l;
//                 curCross.y -= j;
//               } else {
//                 curCross.dir = 0;
//                 curCross.y += l;
//                 curCross.x -= j;
//               }

//               var isMatch = true;

//               for (var m = -1, lenM = curWord.char.length + 1; m < lenM; m++) {
//                 var crossVal = [];
//                 if (m !== j) {
//                   if (curCross.dir === 0) {
//                     var xIndex = curCross.x + m;

//                     if (xIndex < 0 || xIndex > board.length) {
//                       isMatch = false;
//                       break;
//                     }

//                     crossVal.push(board[xIndex][curCross.y].value);
//                     crossVal.push(board[xIndex][curCross.y + 1].value);
//                     crossVal.push(board[xIndex][curCross.y - 1].value);
//                   } else {
//                     var yIndex = curCross.y + m;

//                     if (yIndex < 0 || yIndex > board[curCross.x].length) {
//                       isMatch = false;
//                       break;
//                     }

//                     crossVal.push(board[curCross.x][yIndex].value);
//                     crossVal.push(board[curCross.x + 1][yIndex].value);
//                     crossVal.push(board[curCross.x - 1][yIndex].value);
//                   }

//                   if (m > -1 && m < lenM - 1) {
//                     if (crossVal[0] !== curWord.char[m]) {
//                       if (crossVal[0] !== null) {
//                         isMatch = false;
//                         break;
//                       } else if (crossVal[1] !== null) {
//                         isMatch = false;
//                         break;
//                       } else if (crossVal[2] !== null) {
//                         isMatch = false;
//                         break;
//                       }
//                     }
//                   } else if (crossVal[0] !== null) {
//                     isMatch = false;
//                     break;
//                   }
//                 }
//               }

//               if (isMatch === true) {
//                 curWord.successfulMatches.push(curCross);
//               }
//             }
//           }
//         }
//       }

//       curMatchDiff = curWord.totalMatches - curWord.effectiveMatches;

//       if (curMatchDiff < minMatchDiff && curWord.successfulMatches.length > 0) {
//         curMatchDiff = minMatchDiff;
//         curIndex = i;
//       } else if (curMatchDiff <= 0) {
//         return false;
//       }
//     }
//   }

//   if (curIndex === -1) {
//     return false;
//   }

//   var spliced = wordBank.splice(curIndex, 1);
//   wordsActive.push(spliced[0]);

//   var pushIndex = wordsActive.length - 1,
//     rand = Math.random(),
//     matchArr = wordsActive[pushIndex].successfulMatches,
//     matchIndex = Math.floor(rand * matchArr.length),
//     matchData = matchArr[matchIndex];

//   wordsActive[pushIndex].x = matchData.x;
//   wordsActive[pushIndex].y = matchData.y;
//   wordsActive[pushIndex].dir = matchData.dir;

//   var prevObj = null;

//   for (i = 0, len = wordsActive[pushIndex].char.length; i < len; i++) {
//     var cObj,
//       cIndex,
//       xInd = matchData.x,
//       yInd = matchData.y;

//     if (matchData.dir === 0) {
//       xInd = matchData.x + i;
//     } else {
//       yInd = matchData.y + i;
//     }

//     cObj = {
//       wordIndex: pushIndex,
//       prev: prevObj,
//       value: wordsActive[pushIndex].char[i],
//       next: null,
//     };

//     cIndex = board[xInd][yInd].char.length;

//     board[xInd][yInd].char.push(cObj);
//     board[xInd][yInd].value = wordsActive[pushIndex].char[i];

//     Bounds.Update(xInd, yInd);

//     if (prevObj !== null) {
//       prevObj.next = board[xInd][yInd].char[cIndex];
//     }

//     prevObj = board[xInd][yInd].char[cIndex];
//   }

//   prevObj = null;
//   return true;
// }

// function BoardToHtml(blank) {
//   boardMap = [];

//   for (var i = Bounds.top - 1, str = ""; i < Bounds.bottom + 2; i++) {
//     str += "<div class='row'>";
//     for (var j = Bounds.left - 1; j < Bounds.right + 2; j++) {
//       str += BoardCharToElement(board[j][i]);
//     }
//     str += "</div>";
//   }
//   return str;
// }

// function BoardCharToElement(c) {
//   var inner = "";
//   //console.log(inner);

//   if (c.value !== null) {
//     var num = "";

//     for (var i = 0; i < c.char.length; i++) {
//       c.char[i].index = boardMap.length;
//       if (c.char[i].prev === null) {
//         var matchingObj = wordsActive[c.char[i].wordIndex];

//         if (num === "") {
//           num = wordElementsDown.length + wordElementsAcross.length + 1;
//         }
//         if (matchingObj.dir === 0) {
//           wordElementsAcross.push({ num: num, ele: matchingObj.element });
//         } else {
//           wordElementsDown.push({ num: num, ele: matchingObj.element });
//         }
//       }
//     }
//     boardMap.push(c);

//     inner = EleStr(
//       "input",
//       [
//         { a: "type", v: ["text"] },
//         { a: "class", v: ["char"] },
//         { a: "maxlength", v: ["1"] },
//         { a: "data-letter", v: [c.value] },
//         { a: "placeholder", v: [c.value] },
//       ],
//       EleStr("span", [{ a: "class", v: ["num"] }], num)
//     );
//   }
//   return EleStr("div", [{ a: "class", v: ["square"] }], inner);
// }

// function BoardCharClick(boardChar) {
//   if (mode === 1) {
//     return;
//   }

//   if (boardChar.char.length > 1) {
//     if (focusIndex >= boardChar.char.length - 1) {
//       focusIndex = 0;
//     } else {
//       focusIndex++;
//     }
//   }
// }

// function BoardCharFocus(boardChar) {
//   if (mode === 1) {
//     return;
//   }

//   if (
//     !(
//       boardChar.char[focusIndex] &&
//       boardChar.char[focusIndex].prev === focusChar
//     )
//   ) {
//     focusIndex = Math.max(0, boardChar.char.indexOf(focusChar));
//   }

//   this.onkeydown = function (e) {
//     if (mode === 1) {
//       return;
//     }
//     var key = e.keyCode || e.which;

//     if (key === 8) {
//       if (boardChar.char[focusIndex].prev != null) {
//         focusChar = boardChar.char[focusIndex].prev;

//         var isEnd = boardChar.char[focusIndex].next === null ? true : false;

//         document
//           .getElementsByClassName("char")
//           [boardChar.char[focusIndex].prev.index].focus();
//         try {
//           if (isEnd) {
//             document.getElementsByClassName("char")[
//               boardChar.char[focusIndex].index
//             ].value = "";
//             document.getElementsByClassName("char")[
//               boardChar.char[focusIndex].next.index
//             ].value = "";
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     }
//   };

//   this.onkeypress = function () {
//     if (mode === 1) {
//       return;
//     }
//     if (boardChar.char[focusIndex].next !== null) {
//       focusChar = boardChar.char[focusIndex].next;
//       document
//         .getElementsByClassName("char")
//         [boardChar.char[focusIndex].next.index].focus();
//     }
//   };
// }

// //---------------------------------//
// //   OBJECT DEFINITIONS            //
// //---------------------------------//

// function WordObj(wordData) {
//   this.element = wordData.ele;
//   this.string = wordData.value;
//   this.char = wordData.value.split("");
//   this.totalMatches = 0;
//   this.effectiveMatches = 0;
//   this.successfulMatches = [];
// }

// //---------------------------------//
// //   EVENTS                        //
// //---------------------------------//

// function RegisterEvents() {
//   document.getElementById("btnPlay").addEventListener("click", Play, false);

//   document.getElementById("btnCreate").addEventListener("click", Create, false);

//   document.getElementById("btnGen").addEventListener("click", Generate, false);
// }
// RegisterEvents();

// function RegisterChar(ele, boardChar) {
//   ele.onclick = CreateCallback("click", boardChar);
//   ele.onfocus = CreateCallback("focus", boardChar);
// }

// function CreateCallback(type, boardChar) {
//   switch (type) {
//     case "click":
//       return function () {
//         BoardCharClick(boardChar);
//       };
//     case "focus":
//       return function () {
//         BoardCharFocus(boardChar);
//       };
//   }
// }

// //---------------------------------//
// //   HELPER FUNCTIONS              //
// //---------------------------------//

// function EleStr(e, c, h) {
//   h = h ? h : "";
//   for (var i = 0, s = "<" + e + " "; i < c.length; i++) {
//     s += c[i].a + "='" + ArrayToString(c[i].v, " ") + "' ";
//   }
//   return s + ">" + h + "</" + e + ">";
// }

// function ArrayToString(a, s) {
//   if (a === null || a.length < 1) return "";
//   if (s === null) s = ",";
//   for (var r = a[0], i = 1; i < a.length; i++) {
//     r += s + a[i];
//   }
//   return r;
// }

// function AddClass(ele, classStr) {
//   ele.className = ele.className.replaceAll(" " + classStr, "") + " " + classStr;
// }

// function RemoveClass(ele, classStr) {
//   ele.className = ele.className.replaceAll(" " + classStr, "");
// }

// function ToggleClass(ele, classStr) {
//   var str = ele.className.replaceAll(" " + classStr, "");
//   ele.className =
//     str.length === ele.className.length ? str + " " + classStr : str;
// }

// String.prototype.replaceAll = function (replaceThis, withThis) {
//   var re = new RegExp(replaceThis, "g");
//   return this.replace(re, withThis);
// };

// //---------------------------------//
// //   INITIAL LOAD                  //
// //---------------------------------//

// InitAns();
// Create();
// Generate();
// Play();

// function InitAns() {
//   wordArr = [];
//   for (
//     var i = 0, val, w = document.getElementsByClassName("line");
//     i < 10;
//     i++
//   ) {
//     //   val = w[i].getElementsByClassName("word")[0].value.toUpperCase();
//     w[i].getElementsByClassName("word")[0].value = CrosswordList[i].answer;
//     w[i].getElementsByClassName("clue")[0].value = CrosswordList[i].question;
//     // console.log(val);
//   }
// }

// //==================================================//

// $(document).ready(function () {
//   $("#btnCheck").click(function () {
//     let incorrect = 0;
//     $(".square input").each(function () {
//       if (!($(this).attr("data-letter") === $(this).val().toUpperCase())) {
//         incorrect++;
//         console.log("incorrect");
//         $(this).val("");
//       }
//     });
//     if (incorrect === 0) {
//       console.log("Done");
//     }
//   });
// });

// $("#btnReset").click(function () {
//   location.reload();
// });

// const targetDate = new Date("2025-01-01 00:00:00").getTime();

// // Update the countdown every second
// setInterval(() => {
//   // Get the current date and time
//   const currentDate = new Date().getTime();

//   // Calculate the remaining time
//   const remainingTime = targetDate - currentDate;

//   // Convert the remaining time to days, hours, minutes, and seconds
//   const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
//   const hours = Math.floor(
//     (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//   );
//   const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

//   // Update the HTML element with the new value
//   document.getElementById(
//     "countdown"
//   ).innerHTML = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
// }, 1000);

const CrosswordList = [
  {
    id: 1,
    question: "Thủ đô Việt Nam",
    answer: "HaNoi",
  },
  {
    id: 2,
    question: "Đà nẵng ở đâu",
    answer: "DaNang",
  },
  {
    id: 3,
    question: "Nam Định ở đâu",
    answer: "NamDinh",
  },
  {
    id: 4,
    question: "Hà Nam ở đâu",
    answer: "HaNam",
  },
  {
    id: 5,
    question: "Ninh Bình ở đâu",
    answer: "NinhBinh",
  },
  {
    id: 6,
    question: "Hoà Bình ở đâu",
    answer: "HoaBinh",
  },
  {
    id: 7,
    question: "Bình Thuận ở đâu",
    answer: "BinhThuan",
  },
  {
    id: 8,
    question: "Tam Đảo ở đâu",
    answer: "TamDao",
  },
  {
    id: 9,
    question: "Đồng Đô ở đâu",
    answer: "DongDo",
  },
  {
    id: 10,
    question: "Bác Hồ",
    answer: "QuangTruongBaDinh",
  },
];

class CrosswordRow {
  constructor(answer, typedAnswer, question) {
    this.question = question;
    this.answer = answer;
    this.typedAnswer = typedAnswer;
  }
}

//creating answers for crossword rows
// var row0 = new CrosswordRow("MUFASA", "3");
// var row1 = new CrosswordRow("SNAKE", "3");
// var row2 = new CrosswordRow("LEIA", "3");
// var row3 = new CrosswordRow("CAKE", "2");
// var row4 = new CrosswordRow("WORLD", "1");
// var row5 = new CrosswordRow("PARK", "4");
var row0 = new CrosswordRow("VINHPHUC", "1", "Dãy núi Tam Đảo nằm ở tỉnh nào?");
var row1 = new CrosswordRow(
  "BADINH",
  "2",
  "Bác Hồ đọc bản Tuyên ngôn độc lập, ngày 2/9/1945 tại quảng trường nào?"
);
var row2 = new CrosswordRow(
  "SONGHONG",
  "7",
  "Cầu Long Biên bắc qua dòng sông nào?"
);
var row3 = new CrosswordRow(
  "CHUAMOTCOT",
  "5",
  "Đây là tên một ngôi chùa nổi tiếng ở Hà Nội, nằm cạnh quần thể Quảng trường Ba Đình và Lăng Chủ tịch Hồ Chí Minh."
);
var row4 = new CrosswordRow(
  "HANOI",
  "5",
  "Đây là thủ đô của nước Việt Nam ta hiện nay."
);
var row5 = new CrosswordRow(
  "HOANKIEM",
  "7",
  "Quận nào có diện tích nhỏ nhất tại thành phố Hà Nội?"
);
var row6 = new CrosswordRow(
  "MUATHU",
  "6",
  "Mùa nào ở miền bắc có thời tiết se se lạnh, cũng là mùa các bạn học sinh tựu trường?"
);

var Crossword = [row0, row1, row2, row3, row4, row5, row6];

//number of correctly filled out rows
var numberChecker = 0;
let key = 0;
document.addEventListener("keydown", function (event) {
  key = event.keyCode;
});
//skipping to next row if current row has a letter entered
function skipToNext(elem) {
  // alert(key);
  if (key === 8 || key == 32) {
    return;
  }
  try {
    var nextElemIndex = parseFloat(elem.getAttribute("tabindex")) + 1;
    document.querySelector('[tabindex="' + nextElemIndex + '"]').focus();
  } catch {}
}

document
  .getElementById("submit_crossword")
  .addEventListener("click", function (e) {
    e.preventDefault();

    //we start with number of correct questions set to 0 each time Submit button is clicked
    numberChecker = 0;
    for (var j = 0; j < Crossword.length; j++) {
      Crossword[j].typedAnswer = "";

      for (var i = 0; i < Crossword[j].answer.length; i++) {
        //getting all letters typed in a row
        Crossword[j].typedAnswer += document
          .getElementById("cross-row" + j.toString())
          .querySelectorAll("input")
          [i].value.toUpperCase();
      }

      //if typed letters match the correct answer
      if (Crossword[j].typedAnswer === Crossword[j].answer) {
        //remove class css 'bad' which marks input with dark pink
        document
          .getElementById("cross-row" + j.toString())
          .classList.remove("bad");

        //and adds css class 'good' which marks row in lilac color
        document
          .getElementById("cross-row" + j.toString())
          .classList.add("good");
        //if good answer, increase number of correct answers
        numberChecker++;
      } else {
        document
          .getElementById("cross-row" + j.toString())
          .classList.remove("good");
        document
          .getElementById("cross-row" + j.toString())
          .classList.add("bad");
      }
    }

    //if number of correct answers equals number of rows in the crossword
    if (numberChecker == Crossword.length) {
      var highlightedWord = document.querySelectorAll(
        'input[data-type="hightlight"]'
      );
      for (var k = 0; k < highlightedWord.length; k++) {
        //add to all the inputs with data-type highlight special css class :)
        highlightedWord[k].classList.add("main-highlighted");
      }
    }
  });
document.addEventListener("DOMContentLoaded", function () {
  // Mã JavaScript của bạn ở đây
});

innitGame();
function innitGame() {
  let tabindex = 0;

  let maxlength = 0;
  for (var j = 0; j < Crossword.length; j++) {
    var typedAnswerNumber = Number(Crossword[j].typedAnswer);
    if (maxlength < typedAnswerNumber) {
      maxlength = typedAnswerNumber;
    }
  }
  var innerHTML = "";
  var innerHTMLQuestion = "";
  for (var j = 0; j < Crossword.length; j++) {
    innerHTMLQuestion += "<li>" + Crossword[j].question + "</li>";
    innerHTML +=
      '<div class="cross-row" id="cross-row' +
      j +
      '"><div id="crossword-row' +
      j +
      '"></div></div>';
  }
  // innerHTML += '<button id="submit_crossword">CHECK CROSSWORD</button>';
  document.getElementById("crossword").innerHTML = innerHTML;
  document.getElementById("question").innerHTML = innerHTMLQuestion;
  for (var j = 0; j < Crossword.length; j++) {
    innerHTML = "";
    let value = maxlength - Crossword[j].typedAnswer + 1;
    // console.log(value);
    for (var i = 0; i < value; i++) {
      innerHTML += '<span class="empty-letter"></span>';
    }
    innerHTML += '<span class="row-number"></span>';
    // console.log(innerHTML);
    for (var i = 0; i < Crossword[j].answer.length; i++) {
      tabindex++;
      if (i + 1 == Crossword[j].typedAnswer) {
        innerHTML +=
          '<input class="crossword-letter" onkeyup="skipToNext(this);" type="text" minlength="1" maxlength="1" pattern="^[A-Za-z]{1}$" required="required" value="" tabindex="' +
          tabindex +
          '"data-type="hightlight"/>';
      } else {
        innerHTML +=
          '<input class="crossword-letter" onkeyup="skipToNext(this);" type="text" minlength="1" maxlength="1" pattern="^[A-Za-z]{1}$" required="required" value="" tabindex="' +
          tabindex +
          '"/>';
      }
    }
    document.getElementById("crossword-row" + j).innerHTML = innerHTML;
  }
}
