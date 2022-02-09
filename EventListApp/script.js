const baseUrl = 'http://localhost:3000/events';
// get data
async function getData() {
    const response = await fetch(baseUrl);
    return response.json();
}

// selectors
const table = document.querySelector('#table_body');
// const addBtn = document.querySelector('#add-btn');

// function to format date
const getDate = function (date) {
    const time = new Date(date);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    return [year, month, day].join('-');
}

// get data from backend and format it 
getData().then((data) => {
    const eventsData = data;
    // convert the date string to format date
    eventsData.forEach((item) => {
        const startTime = +item.startDate;
        const start = getDate(startTime);
        item.startDate = start;

        const endTime = +item.endDate;
        const end = getDate(endTime);
        item.endDate = end;
    })
    // call function loopData to load the table
    loopData(eventsData);
})

// Use the data to create the table
const loopData = data => {
    data.forEach(item => {
        const row = createRow(item);
        table.appendChild(row);
    });
}

// create the table row
const createRow = (item) => {
    const tableRow = document.createElement('tr');
    tableRow.id = `row${item.id}`;

    for (let keys of Object.keys(item)) {
        const tableData = document.createElement('td'); // create td
        tableData.id = `td_${keys}_${item.id}`;  // set td id
        if (keys === 'id') { // key === id, create four buttons
            const editButton = document.createElement('button');  // edit button
            editButton.id = `edit_button_${item.id}`;  // add id
            editButton.innerHTML = 'Edit';    // set content
            tableData.appendChild(editButton);  // append button to td
            editButton.addEventListener('click', editRow);  // add eventlistener for edit button

            const deleteButton = document.createElement('button');  // delete button
            deleteButton.id = `delete_button_${item.id}`;
            deleteButton.innerHTML = 'Delete';
            tableData.appendChild(deleteButton);
            deleteButton.addEventListener('click', deleteRow); //eventlistener for delete button

            const updateButton = document.createElement('button');  // update button
            updateButton.id = `update_button_${item.id}`;
            updateButton.innerHTML = 'Update';
            tableData.appendChild(updateButton);
            // by default, hide the update button
            updateButton.style.display = 'none';
            updateButton.addEventListener('click', updateRow); // eventlistener for update button
        } else {
            tableData.innerHTML = item[keys];
        }
        // append td to table row
        tableRow.appendChild(tableData);
    }
    return tableRow;
}

// function to edit row  
function editRow(row) {  
    const targets = row.target.id.split('_');  // split the target id by '_'
    // console.log(targets)  // ['edit', 'button', '1'] for example
    const no = targets[2];  // get the row number, which is same to the item.id
    row.target.style.display = 'none';
    document.getElementById("delete_button_" + no).style.display = "none";
    document.getElementById("update_button_" + no).style.display = "block";

    const name = document.getElementById('td_eventName_' + no); // get name td
    const start = document.getElementById('td_startDate_' + no);  // get startDate td
    const end = document.getElementById('td_endDate_' + no);   // get endDate td

    // edit content to each td
    const name_data = name.innerHTML;
    const start_data = start.innerHTML;
    const end_data = end.innerHTML;

    // write content to each td
    name.innerHTML = "<input type='text' id='eventName_text" + no + "' value='" + name_data + "'>";
    start.innerHTML = "<input type='date' id='startDate_text" + no + "' value='" + start_data + "'>";
    end.innerHTML = "<input type='date' id='endDate_text" + no + "' value='" + end_data + "'>";
}

// async function to delete a row and reflect to json-server
async function deleteRow(row) {
    const targets = row.target.id.split('_');
    id = targets[2];
    await fetch(baseUrl + "/" + id, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    });
    document.getElementById("row" + id).remove();
}

// function to update row and reflect to localhost
async function updateRow(row) {
    const targets = row.target.id.split('_');  // split the target id by '_'
    const no = targets[2];

    const name_val = document.getElementById("eventName_text" + no).value;
    const start_val = document.getElementById("startDate_text" + no).value;
    const end_val = document.getElementById("endDate_text" + no).value;

    // change the date time to milliseconds
    const start_t = new Date(start_val).getTime();
    const end_t = new Date(end_val).getTime();

    const doc = {
        eventName: name_val,
        startDate: start_t,
        endDate: end_t
    }

    if (name_val === '' || start_val === '' || end_val === '') {
        alert("The table can not be empty.");
    } else {
        await fetch(baseUrl + "/" + no, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(doc)
        });
        
        // Send the value to the table
        document.getElementById("td_eventName_" + no).innerHTML = name_val;
        document.getElementById("td_startDate_" + no).innerHTML = start_val;
        document.getElementById("td_endDate_" + no).innerHTML = end_val;
        // Set display
        row.target.style.display = 'none';
        document.getElementById("edit_button_" + no).style.display = "inline-block";
        document.getElementById("delete_button_" + no).style.display = "inline-block";
    }   
}

// add new btn event listener
// addBtn.addEventListener('click', addRow);
$("#add-btn").on("click", addRow);

// function to add an empty row  
function addRow() {
    const rowCount = table.rows.length;  // get table rows' length
    const No = rowCount + 1;  
    const row = table.insertRow(rowCount); // insert a new row
    row.id = `row${No}`;  // add row id

    const cell1 = row.insertCell(0);  // insert cell, which is td
    cell1.id = `td_eventName_${No}`;  // add td id
    const input1 = document.createElement("input");  // create input
    input1.type = "text";   // for event name, input type = text
    input1.id = `eventName_text${No}`;  // add input id
    cell1.appendChild(input1);

    const cell2 = row.insertCell(1);
    cell2.id = `td_startDate_${No}`;
    const input2 = document.createElement("input");
    input2.type = "date";  // for start date, input type = 'date'
    input2.id = `startDate_text${No}`;
    cell2.appendChild(input2);

    const cell3 = row.insertCell(2);
    cell3.id = `td_endDate_${No}`;
    const input3 = document.createElement("input");
    input3.type = "date";  // for end date, input type = 'date'
    input3.id = `endDate_text${No}`;
    cell3.appendChild(input3);

    const cell4 = row.insertCell(3);
    cell4.id = `td_${''}_${No}`; // add td id

    // create save button and close button
    const saveButton = document.createElement('button');  // save button
    saveButton.id = `save_button_${No}`;
    saveButton.innerHTML = 'Save';
    cell4.appendChild(saveButton);
    saveButton.addEventListener('click', saveRow); // eventlistener for save button

    const closeButton = document.createElement('button');  // close button
    closeButton.id = `close_button_${No}`;
    closeButton.innerHTML = 'Close';
    cell4.appendChild(closeButton);
    closeButton.addEventListener('click', closeRow); // eventlistener for close button
}


// function to save row and reflect to json-server. As soon as the data is saved, 
// it will refresh the page and generate the table
async function saveRow(row) {
    const targets = row.target.id.split('_');
    const no = targets[2];   
    // Get the values
    const name_val = document.getElementById("eventName_text" + no).value;
    const start_val = document.getElementById("startDate_text" + no).value;
    const end_val = document.getElementById("endDate_text" + no).value;

    // change the date time to milliseconds
    const start_t = new Date(start_val).getTime();
    const end_t = new Date(end_val).getTime();

    const doc = {
        eventName: name_val,
        startDate: start_t,
        endDate: end_t
    }

    // Make sure the td is not empty
    if (name_val === '' || start_val === '' || end_val === '') {
        alert("Please fullfill the table.");
    } else {
        fetch(baseUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(doc)
        })
        .then(window.location.reload());
    }   
}

// function to close row, it will simply remove the row from UI
function closeRow(row) {
    const targets = row.target.id.split('_');
    const no = targets[2];  
    document.getElementById("row" + no).remove();
}



