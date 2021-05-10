import { Redirect } from "react-router";
import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  MonthView,
  Appointments,
  ViewSwitcher,
  Toolbar,
  DragDropProvider,
  EditRecurrenceMenu,
  AppointmentTooltip,
  AppointmentForm,
  DateNavigator,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";

import { appointments } from "../../data/appointments";
import "./Calendar.css";

const currentDate = new Date();

function Calendar({ activeUser }) {
  const [data, setData] = React.useState(appointments);

  const [addedAppointment, setAddedAppointment] = React.useState({});
  const [
    isAppointmentBeingCreated,
    setIsAppointmentBeingCreated,
  ] = React.useState(false);

  const onCommitChanges = React.useCallback(
    ({ added, changed, deleted }) => {
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        setData([...data, { id: startingAddedId, ...added }]);
      }
      if (changed) {
        setData(
          data.map((appointment) =>
            changed[appointment.id]
              ? { ...appointment, ...changed[appointment.id] }
              : appointment
          )
        );
      }
      if (deleted !== undefined) {
        setData(data.filter((appointment) => appointment.id !== deleted));
      }
      setIsAppointmentBeingCreated(false);
    },
    [setData, setIsAppointmentBeingCreated, data]
  );
  
  const onAddedAppointmentChange = React.useCallback((appointment) => {
    setAddedAppointment(appointment);
    setIsAppointmentBeingCreated(true);
  });

  const TimeTableCell = React.useCallback(
    React.memo(({ onDoubleClick, ...restProps }) => (
      <WeekView.TimeTableCell {...restProps} onDoubleClick={onDoubleClick} />
    )),
    []
  );

  const CommandButton = React.useCallback(({ id, ...restProps }) => {
    if (id === "deleteButton") {
      return <AppointmentForm.CommandButton id={id} {...restProps} />;
    }
    return <AppointmentForm.CommandButton id={id} {...restProps} />;
  }, []);

  if (!activeUser) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="p-calendar">
      <Paper>
        <Scheduler data={data} height={600} locale={"he"}>
          <ViewState defaultCurrentDate={currentDate.setDate(currentDate.getDate())} />
          <EditingState
            onCommitChanges={onCommitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />

          <IntegratedEditing />
          <WeekView
            startDayHour={9}
            endDayHour={19}
            timeTableCellComponent={TimeTableCell}
          />
          <MonthView />
          <Toolbar />
          <DateNavigator />
          
          <ViewSwitcher />
          <EditRecurrenceMenu />
          <ConfirmationDialog ignoreCancel />
          <Appointments />

          <AppointmentTooltip showOpenButton showDeleteButton={true} />
          <AppointmentForm commandButtonComponent={CommandButton} />
          <DragDropProvider />

        </Scheduler>
      </Paper>
    </div>
  );
}

export default Calendar;
