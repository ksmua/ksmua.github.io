let validatorIsRun = false;
/**
 *  'Valadator' - this function run ones, when callback form show first time
 */
function validator (){

  const phone = document.getElementById("your-number");
  const name = document.getElementById("your-name");
  const sendBtn = document.getElementById("clbFormSendBtn");
  
  const validFlags = {
    phone: false,
    name: false
  }
 
  const patterns = {
    name: /^[А-Я,а-я]{3,}\D*(\s\D)?$/,
    phone: /^((8|\+3)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
  }

/** 
 * This 'styleError' and 'styleSuccess' functions are for mark form fields
*/
  const styleError = (elem) => {
    elem.style.border = "2px solid red";
  };

  const styleSuccess = (elem) => {
    elem.style.border = "2px solid green";
  };

  const isValid = (curentField, value) => {
    if ( patterns[curentField].test(value) ) {
      validFlags[curentField] = true;
      return true;
    }
    return false;
  }
  
  const isChecked = () => {
    const checked = Object.entries(validFlags).every((elem) => elem[1] == true);

    checked ? sendBtn.disabled = false : sendBtn.disabled = true;
  }

  const checkInp = (event) => {
    const checkValue = event.target.value.trim();
    let currentField= '';
    
    switch (event.target.id) {
      case "your-number" :
        currentField = "phone";
        break;
      case "your-name" :
        currentField = "name";
        break;
    }
    
    isValid(currentField, checkValue) ? styleSuccess(event.target) : styleError(event.target);
    isChecked();
  }

    
  phone.addEventListener('change', checkInp);
  name.addEventListener('change', checkInp);
  

  sendBtn.onclick = (event) => {
    event.preventDefault();
    
    //Set all flags in false value
    for (let key in validFlags) {
      validFlags[key] = false;
    }
    
    //Change styles in form fields
    const fields = document.querySelectorAll('#clbForm input:not([type="submit"])'); 
    fields.forEach(elem => elem.style.border = "1px solid gray");
    sendBtn.disabled = "true"; 

    //Visual efect on close form
    setTimeout(() => {
      phone.value = '';
      name.value = '';
    }, 300);
    setTimeout(() => {
      clbForm.style.display = ("none");
    }, 600);
  }
    
} //end Valadator();

const runValidator = () => {
  if (!validatorIsRun) {
    validatorIsRun = true;
    validator();
  } 
}


const clbForm = document.getElementById("clbForm");

document.querySelector(".call-back-btn").onclick = () => {
  clbForm.style.display = "block";
  clbForm.style.top = "30px";
  runValidator();
}

document.querySelector(".call-back-btn--footer").onclick = (event) => {
  clbForm.style.display = "block";
  clbForm.style.top = (event.target.offsetTop - 130) + "px";
  runValidator();
}

document.getElementById("clb-close-btn").onclick = (event) => {
  event.preventDefault();
  clbForm.style.display = "none";
}