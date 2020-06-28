const form = document.getElementById("registrar");
const input = form.querySelector("input");
const ul = document.getElementById("invitedList")
const main = document.querySelector(".main");


//step going to create a div tag with label and input checkbox 
//that is going to append it into the main div and above the invitees.
const div = document.createElement("div");
const label = document.createElement("label");
const inputdiv = document.createElement("input");
label.textContent = "Hide those who havent't responded";
inputdiv.type = "checkbox";

div.appendChild(label);
div.appendChild(inputdiv);
main.insertBefore(div,ul);

//Create the list we need to define the fundemental of the li element,
// with botton remove,edit and input checkbox
function createLi(){
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = input.value
    
    const label = document.createElement("label");
    label.textContent = "Confirmed";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const editBtn = document.createElement("button");
    editBtn.textContent = "edit";

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "remove";

    li.appendChild(span);
    label.appendChild(checkbox);
    li.appendChild(label);
    ul.appendChild(li);
    li.appendChild(editBtn);
    li.appendChild(removeBtn);

    return li;
}
// function that is for edit button
function editBtn(arr){
   const span = document.createElement("input");
   const replaceSpan = arr.parentNode.firstElementChild;
   const spanParent = arr.parentNode
   span.type = "text";
   span.classList.add("input");
   span.value = replaceSpan.textContent;
   spanParent.insertBefore(span,replaceSpan)
   spanParent.removeChild(replaceSpan);
   arr.textContent = "save";
}

//function that is for save button
function saveBtn(arr){
  const span = document.createElement("span");
  const replaceInput = document.querySelector(".input");
  const spanParent = arr.parentNode
  span.textContent = replaceInput.value;
  spanParent.insertBefore(span,replaceInput);
  spanParent.removeChild(replaceInput);
  arr.textContent = "edit";
}

//function that is for remove button
function removeLi(arr){
   const liParent = arr.parentNode.parentNode;
   const li = arr.parentNode;
   liParent.removeChild(li);
}

//Eventhandler that is going to input box that is going to 
//generate the invitees

form.addEventListener("submit",(e)=>{
  e.preventDefault();
  if(input.value !== ""){
    createLi();
    input.value = "";
  }
})

//Eventhandler that isgoing to add a responded class name to each li tags
ul.addEventListener("change",(e)=>{
  let checked = e.target.checked;
  const li = e.target.parentNode.parentNode;
  if(checked){
    li.classList.add("responded")
  }else{
    li.classList.remove("responded"); 
  }
})

//Eventhandler that is going to toggle on both eidt and remove botton.
ul.addEventListener("click",(e)=>{
  const targets = e.target;
  if(targets.tagName === "BUTTON"){
    if(targets.textContent === "edit"){
      editBtn(targets)
    }else if(targets.textContent === "save"){
      saveBtn(targets);
    }else if(targets.textContent === "remove"){
      removeLi(targets);
    }
  }
})

//Eventhandler that is going to filter te responed invitees and allow 
//us to filter and display them togater.
inputdiv.addEventListener("change",(e)=>{
  let checked = e.target.checked;
  const lis = ul.children;
  if(checked){
    for(let i = 0; i < lis.length; i ++){
      if(lis[i].classList.contains("responded")){
        lis[i].style.display = ""
      }else{
        lis[i].style.display = "none";
      }
    }
  }else{
    for(let i = 0; i < lis.length; i ++){
      lis[i].style.display = "";
    }
  }
})
