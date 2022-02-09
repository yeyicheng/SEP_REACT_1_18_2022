//Convert json string date to html date in format yyyy-mm-dd
const convertDate = (str) => {
  const date = new Date(Number(str));
  const year = date.getFullYear().toString();
  const month = date.toLocaleString("en-US", { month: "2-digit" });
  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const newDate = `${year}-${month}-${day}`;
  return newDate;
};
//finish Show Feature
//get events from json and render to html
const getEvents = () => {
  $.ajax({
    url: "http://localhost:3000/events",
  }).done(function (data) {
    console.log(data);
    let markup = "";
    $.each(data, function (index, ele) {
      markup += `
            <tr>
              <td>
                <input type="text" id="eventName_${ele.id}" value=${
        ele.eventName
      } disabled>
              </td>
              <td>
                <input type="date" id="startDate_${ele.id}" value=${convertDate(
        ele.startDate
      )} disabled>
              </td>
              <td>
                <input type="date" id="endDate_${ele.id}" value=${convertDate(
        ele.endDate
      )} disabled>
              </td>
              <td>
                <button type="button" class="edit_${ele.id}">EDIT</button>
                <button type="button" class="delete_${ele.id}">DELETE</button>
              </td>
            </tr>`;
    });
    $(".events").append(markup);
  });
};
getEvents();

// Add new empty rows when click button
var rowIdx = 0;
$("#addBtn").on("click", function (e) {
  e.preventDefault();
  rowIdx++;

  const temp = `
    <tr>
      <td>
        <input type="text" id="newEvent_${rowIdx}">
      </td>
      <td>
        <input type="date" id="newStartDate_${rowIdx}">
      </td>
      <td>
        <input type="date" id="newEndDate_${rowIdx}">
      </td>
      <td>
        <button type="button" class="save save_${rowIdx}">Save</button>
        <button type="button" class="close close_${rowIdx}">Close</button>
      </td>
    </tr>`;
  $(".events").append(temp);
});
$(".events").on("click", (e) => {
  e.preventDefault();
  //save new event
  if (e.target.className.includes("save")) {
    const id = e.target.className.slice(-1);
    $.ajax({
      url: "http://localhost:3000/events",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        eventName: $(`#newEvent_${id}`).val(),
        startDate: Date.parse($(`#newStartDate_${id}`).val()) + "",
        endDate: Date.parse($(`#newEndDate_${id}`).val()) + "",
      }),
      success: () => {
        getEvents();
      },
    });
  }
  //delete event
  if (e.target.className.includes("delete")) {
    const id = e.target.className.slice(-1);
    $(`.delete_${id}`).parent().parent().remove();
    $.ajax({
      url: `http://localhost:3000/events/${id}`,
      type: "DELETE",
      contentType: "application/json",
    });
  }
  //edit
  if (e.target.className.includes("edit")) {
    const id = e.target.className.slice(-1);
    $(`#eventName_${id}`).removeAttr("disabled");
    $(`#startDate_${id}`).removeAttr("disabled");
    $(`#endDate_${id}`).removeAttr("disabled");
    $(`.edit_${id}`).replaceWith(
      `<button type="button" class="change_${id}">SAVE</button>`
    );
  }
  // after edit, save the changed event
  if (e.target.className.includes("change")) {
    e.preventDefault();
    const id = e.target.className.slice(-1);
    $.ajax({
      url: `http://localhost:3000/events/${id}`,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify({
        eventName: $(`#eventName_${id}`).val(),
        startDate: Date.parse($(`#startDate_${id}`).val()) + "",
        endDate: Date.parse($(`#endDate_${id}`).val()) + "",
      }),
    }).done(function (data) {
      console.log(data);
    });
  }
});
