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
$.ajax({
  url: "http://localhost:3000/events",
}).done(function (data) {
  console.log(data);
  let markup = "";
  $.each(data, function (index, ele) {
    console.log(ele);
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
  console.log(markup);
  $(".events").append(markup);
});
