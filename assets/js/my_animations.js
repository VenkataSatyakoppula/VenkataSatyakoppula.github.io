$(document).ready(function() {
   // text typing
  var $textElement = $(".iam-txt");
  var $textElement2 = $(".myname-color");
  var text1 = [`A DEVELOPER`,`A DESIGNER`,`AN ENGINEER`,`A PROGRAMMER`];
  var index = 0;
  let textArray = text1[0].split("");
async function type(i) {
    if (index < text1[i].length) {
      $textElement.append(text1[i].charAt(index));
      index++;
      textArray = text1[i].split("");
      setTimeout(function() {
         type(i);
      },200);
    }else{
      if(textArray.length === index){
         await new Promise(r => setTimeout(r, 2000));
      }
      textArray.pop();
      $textElement.html(textArray.join(""));
      if (textArray.length ==0){
         index = -1
         setTimeout(function() {
            type((i+1)%(text1.length));
         },200);
      }else{
      setTimeout(function() {
         type(i);
      },200);
   }

    }
  }
   type(0)

});