
function createCalendarId(){
   return Math.floor(Math.random() * 2) + 1;
}

export default function createCalendarService(calendar) {
    //send calendar to server
    //server return created calendar id
    return createCalendarId();
}
