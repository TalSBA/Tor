import DayHours from "../Model/DayHours";
import ActivityHours from "./ActivityHours";

export default class Calendar {
    constructor(plainCalendar) {
      this.id = plainCalendar.id;
      this.name = plainCalendar.name;
      this.address = plainCalendar.address;
      this.type = plainCalendar.type;
      this.phone = plainCalendar.phone;
      this.services = plainCalendar.services;
      this.image = plainCalendar.image;
      this.activityHours = plainCalendar.activityHours;
      this.userId = plainCalendar.userId;
    }
  }
  