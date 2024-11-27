document.getElementById('password-form').onsubmit = function () {
    const password = "12345";
    let isValid = true;

    const passwordEntry = document.getElementById('password').value;

    if(passwordEntry !== password){
        document.getElementById('err-password').style.display = 'inline';
        isValid = false;
    } else{
        document.getElementById('err-password').style.display = 'none';
    }

    return isValid;
}
