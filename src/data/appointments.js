var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

export const appointments = [
  {
    costumerName: "טל בן עמי",
    title: "ג'ל - טל בן עמי",
    startDate: new Date(mm + "/" + dd + "/" + yyyy + " 08:30"),
    endDate: new Date(mm + "/" + dd + "/" + yyyy + " 10:30"),
    id: 0,
    location: "Room 1",
    Status: "Approved",
    email: "taltola36@gmail.com"
  },
  {
    costumerName: "טל שבתאי",
    title: "גבות - טל שבתאי",
    startDate: new Date(
      mm +
        "/" +
        String(today.getDate() + 1).padStart(2, "0") +
        "/" +
        yyyy +
        " 10:30"
    ),
    endDate: new Date(
      mm +
        "/" +
        String(today.getDate()  + 1).padStart(2, "0") +
        "/" +
        yyyy +
        " 12:00"
    ),
    id: 1,
    location: "Room 1",
    Status: "Pending",
    email: "tal.shabtay1409@gmail.com"
  },
  {
    costumerName: "מיכאלה בן דוד",
    title: "טיפול פנים - מיכאלה",
    startDate: new Date(
      mm +
        "/" +
        String(today.getDate() - 1).padStart(2, "0") +
        "/" +
        yyyy +
        " 13:15"
    ),
    endDate: new Date(
      mm +
        "/" +
        String(today.getDate()  - 1).padStart(2, "0") +
        "/" +
        yyyy +
        " 15:00"
    ),
    id: 2,
    location: "Room 2",
    Status: "Approved",
    email: "taltola36@gmail.com"
  },
  {
    costumerName: "שני כהן",
    title: "גבות + שפם - שני",
    startDate: new Date(
      mm +
        "/" +
        String(today.getDate() + 2).padStart(2, "0") +
        "/" +
        yyyy +
        " 14:00"
    ),
    endDate: new Date(
      mm +
        "/" +
        String(today.getDate()  + 2).padStart(2, "0") +
        "/" +
        yyyy +
        " 16:20"
    ),
    id: 3,
    location: "Room 2",
    Status: "Approved",
    email: "taltola36@gmail.com"
  },
  {
    costumerName: "אורטל דוד",
    title: "פדיקור + ג'ל - אורטל",
        startDate: new Date(
      mm +
        "/" +
        String(today.getDate() - 2).padStart(2, "0") +
        "/" +
        yyyy +
        " 09:00"
    ),
    endDate: new Date(
      mm +
        "/" +
        String(today.getDate()  - 2).padStart(2, "0") +
        "/" +
        yyyy +
        " 10:10"
    ),
    id: 4,
    location: "Room 2",
    Status: "Pending",
    email: "tal.shabtay2609@gmail.com"
  },
  {
    costumerName: "סופיה פרידמן",
    title: "הסרת שיער - סופיה",
    startDate: new Date(
      mm +
        "/" +
        String(today.getDate() - 3).padStart(2, "0") +
        "/" +
        yyyy +
        " 15:25"
    ),
    endDate: new Date(
      mm +
        "/" +
        String(today.getDate()  - 3).padStart(2, "0") +
        "/" +
        yyyy +
        " 17:00"
    ),
    id: 5,
    location: "Room 2",
    Status: "Pending",
    email: "tal.shabtay2609@gmail.com"
  },
  {
    costumerName: "סופיה פרידמן",
    title: "הסרת שיער - סופיה",
    startDate: new Date(
      mm +
        "/" +
        String(today.getDate() + 3).padStart(2, "0") +
        "/" +
        yyyy +
        " 08:15"
    ),
    endDate: new Date(
      mm +
        "/" +
        String(today.getDate()  + 3).padStart(2, "0") +
        "/" +
        yyyy +
        " 09:20"
    ),
    id: 5,
    location: "Room 2",
    Status: "Pending",
    email: "taltola369@gmail.com"
  },
];
