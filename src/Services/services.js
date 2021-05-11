function createCalendarId() {
  return Math.floor(Math.random() * 2) + 1;
}

export function createCalendarService(calendar) {
  //send calendar to server
  //server return created calendar id
  return createCalendarId();
}

export function getAvailableHours(date, from, to) {
  //send date to server and get available hours
  console.log(from, to);
  //for mock data - get all hours between the activity hours on selected day
  const fromHour = from?  from.split(':') : [];
  const toHour = to?  to.split(':'): [];
  from = parseInt(fromHour.filter((str) => str != "")[0]);
  to = parseInt(toHour.filter((str) => str != "")[0]);

  var quarterHours = ["00", "15", "30", "45"];
  var times = [];
  for (var i = from; i < to; i++) {
    for (var j = 0; j < 4; j++) {
      if (i < 10) {
        times.push("0" + i + ":" + quarterHours[j]);
      } else {
        times.push(i + ":" + quarterHours[j]);
      }
    }
  }
  return times;
}
