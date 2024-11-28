
document.getElementById("account").onsubmit = function () {
    clearErrors();

    let isValid = true;
    const emailPattern = /@/;
    const dotPattern = /\./;
    
    let first = document.getElementById("fname").value;
    let last = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let checkbox = document.getElementById("checkbox");
    let linkedln = document.getElementById("linkedln").value;
    let options = document.getElementById("meet");
    let radio = document.querySelector(".check");
    let other = document.getElementById("other");
    let other2 = document.getElementById("other2");
    

    if (first === "") {
        let errSpan = document.getElementById('err-fname');
        errSpan.style.display = "inline"; 
        isValid = false;
    } 

    if (last === "") {
        let errSpan = document.getElementById('err-lname');
        errSpan.style.display = "inline"; 
        isValid = false;
    }

    if(email != "") {
        if(!emailPattern.test(email) || !dotPattern.test(email)) {
            let errSpan = document.getElementById('err-email');
            errSpan.style.display = "inline";
            isValid = false; 
        }
}

    if(checkbox.checked) {
        radio = radio.style.display = "flex";
        if(email == "") {
        let errSpan = document.getElementById('err-email2');
        errSpan.style.display = "inline";
        isValid = false;   
        }
       
    }

    if(linkedln != "") {
        if(!linkedln.startsWith("https://linkedln.com/in/")) {
        let errSpan = document.getElementById("err-linkedln");
        errSpan.style.display = "inline";
        isValid = false;
        }
    } 

    if(options.selectedIndex == 0) {
        let errSpan = document.getElementById("err-options");
        errSpan.style.display = "inline";
        isValid = false;
    }

    if(options.selectedIndex == options.length - 1) {
        other.style.display = "inline";
        if(other2.value == "") {
            isValid = false;
        }
    }

     return isValid;
 }

function clearErrors() {
    let errors = document.getElementsByClassName("err");
    let err = document.querySelector(".check");
    let errOther = document.getElementById("other");
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
    err.style.display = "none";  
    errOther.style.display = "none";
}
