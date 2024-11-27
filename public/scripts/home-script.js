document.getElementById('assignment-form').onsubmit = function () {
    clearErrors();

    let isValid = true;

    let assignment = document.getElementById('assignment').value;

    if(assignment=== ""){
        document.getElementById('err-assignment').style.display = 'inline';
        isValid = false;
    } else{
        document.getElementById('err-assignment').style.display = 'none';
    }

    let className = document.getElementById('class').value;

    if(className === ""){
        document.getElementById('err-class').style.display = 'inline';
        isValid = false;
    } else{
        document.getElementById('err-class').style.display = 'none';
    }

    let priority = document.getElementById('priority').value;

    if(priority === ""){
        document.getElementById('err-priority').style.display = 'inline';
        isValid = false;
    } else{
        document.getElementById('err-priority').style.display = 'none';
    }

    let dueDate = document.getElementById('due-date').value;

    if(dueDate === ""){
        document.getElementById('err-date').style.display = 'inline';
        isValid = false;
    } else{
        document.getElementById('err-date').style.display = 'none';
    }


    return isValid;
}

function clearErrors() {
    let errors = document.getElementsByClassName('err');
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = 'none';
    }
}