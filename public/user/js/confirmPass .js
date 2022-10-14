

let firstPass = document.querySelector("#firstPass");
let lastPass = document.querySelector("#lastPass");
let checkBox = document.querySelector("#check");
let btnWrapper = document.querySelector(".btnWrapper");
let confirm = document.querySelector("#confirm");

let btnWrapperWidth = btnWrapper.clientWidth; //Button wrapper width
let btnWrapperXDistance = btnWrapper.offsetLeft;//btnWrapper Distance from screen left side

checkBox.addEventListener("click", ()=>{
    if(firstPass.value != lastPass.value){
        lastPass.style.borderColor = "red";
        btnWrapper.addEventListener("mouseover", (event)=>{
            if((event.clientX - btnWrapperXDistance) <= (btnWrapperWidth/2)){
                //if we hover if first half position
                confirm.classList.add("active");
            }else{
                confirm.classList.remove("active");
            }
        })
    }else{
        confirm.classList.remove("active");
    }
})
