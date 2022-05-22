
// Define an array to save the details of each task as an object and add to the array
let arr = [];

// define a variable to give a unique value to each task which the user enter as an ID
let counter = 0;


// Bringing a button object from the DOM using a function that is inside DOCUMENT and 
//an action has been added to it, here Action type is a click, when the event occurs 
//triggers the anonymous function within which there is a function inside 


document.getElementById("btn_add").addEventListener("click", () => {
    checkValue();
});

document.getElementById("btn_clear").addEventListener("click", () => {
    deletValue();
});

// Building a function that receives data from the user checks if data is not empty and 
//also checks the validation of data then adds to the table and adds to LocalStorage

function checkValue() { 

    // define a helper variable as a flag to check the values which user insert

    let valid=true;

    // get data from user

    let description = document.getElementById("desc");
    let dateTask = document.getElementById("date");
    let timeTask = document.getElementById("time");




    // patterns to check validation data 

    var text_regex = /^[a-zA-Z]+$/; 
    var date_regex = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
    var time_regex = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
    

    // check data if empty will display a message that the user should fill all the inputs  

    if(description.value == '' && dateTask.value == '' && timeTask.value == ''){ 
        valid=false;
        alert("Please fill all the inputs");
    } 

    // check if the input of text is valid or according to text's pattern 

    else if(!text_regex.test(description.value)){
        valid=false;
        alert("please insert a text");
    } 

    // check if the input of date is valid or according to date's pattern 

    else if(!date_regex.test(dateTask.value)){
        valid=false; 
        alert("please enter a valid date. Format: dd/mm/yyyy");
    } 

    // check if the input of time is valid or according to time's pattern 

    else if(!time_regex.test(timeTask.value)){ 
        valid=false; 
        alert("please enter a valid time. Format: hh/mm");

    }


    // check if the inputs are not empty and all the data is valid it will add to table and localStorage

    else if (valid) {

        // define object variable to save all data for each task as an object

        let objTask = {
            descT: description.value,
            dateT: dateTask.value,
            timeT: timeTask.value
        };

        // add object to table

        addTask(objTask);

        // add object to array 
        arr.push(objTask);

        // add / save data in localStorage
        addToLocalStorage();

    }

}


// Building a function which recive an object then add it to table 

function addTask(objTask) {

    // get table to fill with data 

    let taskTable = document.getElementById("myTable");

    // building the infrastructure from the outside to the inside

    let trow = document.createElement("tr");
    let tdNum = document.createElement("td");
    let tdDesc = document.createElement("td");
    let tdDate = document.createElement("td");
    let tdTime = document.createElement("td");
    let tdRemove = document.createElement("td");

    // give a class to design row 

    trow.className = "styleRow";


    // create elemnts 

    let labelNum = document.createElement("label");
    let labelDesc = document.createElement("label");
    let labelDate = document.createElement("label");
    let labelTime = document.createElement("label");
    let removeIcon = document.createElement("i");

    // giving a class to elemnts 

    labelNum.className = "fadeIn";
    labelDesc.className = "fadeIn";
    labelDate.className = "fadeIn";
    labelTime.className = "fadeIn";
    removeIcon.className = "icons";


    // This icon has a design from bootstrap

    removeIcon.className = "bi bi-trash3";

    removeIcon.value = "remove";

    // add event to the icon adding action to a click icon when an action occurs triggers a function delete

    removeIcon.addEventListener("click", () => {

        // Before the user deletes a task's row , pops up a message asks a user if he is sure he wants to delete 
        // function confirm return true if user answer ok, false if user answer no 

        let question = confirm("Are you sure to delete the task?");
        if (question) {

            // define a vairiable to save the index of obj which the user select to delete 
           

            let deleteIndex = arr.findIndex((val , obj) => {
                if ((val.descT == objTask.descT) &&
                    (val.dateT == objTask.dateT) &&
                    (val.timeT == objTask.timeT)) return true;
            });

            // delete the object from array 

            arr.splice(deleteIndex, 1, );

            //delete or edit localStorage after delete an object

            addToLocalStorage();

            // delete a row from table

            trow.remove();


         }

    })

    // Each time the algorithem enter to this block, add 1 to  variable counnter as ID

    counter++;

    // building or fill table

    labelNum.textContent = counter;
    tdNum.appendChild(labelNum);
    trow.appendChild(tdNum);
    taskTable.appendChild(trow);

    labelDesc.textContent = objTask.descT;
    tdDesc.appendChild(labelDesc);
    trow.appendChild(tdDesc);
    taskTable.appendChild(trow);

    labelDate.textContent = objTask.dateT;
    tdDate.appendChild(labelDate);
    trow.appendChild(tdDate);
    taskTable.appendChild(trow);

    labelTime.textContent = objTask.timeT;
    tdTime.appendChild(labelTime);
    trow.appendChild(tdTime);
    taskTable.appendChild(trow);


    tdRemove.appendChild(removeIcon);
    trow.appendChild(tdRemove);
    taskTable.appendChild(trow);


}
 
// function clear the form 

function deletValue() {

    let description = document.getElementById("desc");
    let dateTask = document.getElementById("date");
    let timeTask = document.getElementById("time");

    description.value = '';
    dateTask.value = '';
    timeTask.value = '';

}

// save data to localStorage by using setItem function which recive table's name as a string in addtion 
//localStorage knows to deal with data, so the JSON library is used to convert dataType to data by using a stringify function. 

function addToLocalStorage() {

    localStorage.setItem("tableTask", JSON.stringify(arr));

} 


// function that fill the table from localStorage 

function loadingFromLocalStorage() { 

    // check if there is a table in localStorage 

    if (localStorage.getItem("tableTask")) { 

        // An array stores the data which contained in LocalStorage and using JASON library is used to return the data to the data type

        arr = JSON.parse(localStorage.getItem("tableTask")); 

        // A loop passes over the array and send each object to addTask function

        for (let i of arr) {
            addTask(i);
        }

    }
}

// when user does refresh  the page it will loading from localStorage

loadingFromLocalStorage();

























