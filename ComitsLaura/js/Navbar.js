function btnDropdown(){
    const btnDrop = document.getElementById("navbarDropdown")
    if(btnDrop.textContent.includes("≡")){
        btnDrop.innerHTML = "X";
    }else{
        btnDrop.innerHTML = "≡"
    }
}