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
import { fade } from "@material-ui/core/styles/colorManipulator";

// import { appointments } from "../../data/appointments";
import "./Calendar.css";
import { makeStyles } from "@material-ui/core";

const currentDate = new Date();

function Calendar({
  activeUser,
  calendar,
  appointments,
  onUpdateAppointments,
}) {
  const [data, setData] = React.useState(appointments);

  const [addedAppointment, setAddedAppointment] = React.useState({});
  const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] =
    React.useState(false);

  const useStyles = makeStyles((theme) => ({
    todayCell: {
      backgroundColor: fade(theme.palette.primary.main, 0.1),
      "&:hover": {
        backgroundColor: fade(theme.palette.primary.main, 0.14),
      },
      "&:focus": {
        backgroundColor: fade(theme.palette.primary.main, 0.16),
      },
    },
    weekendCell: {
      backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
      "&:hover": {
        backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
      },
      "&:focus": {
        backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
      },
    },
    today: {
      backgroundColor: fade(theme.palette.primary.main, 0.16),
    },
    weekend: {
      backgroundColor: fade(theme.palette.action.disabledBackground, 0.06),
    },
  }));

  const onCommitChanges = React.useCallback(
    ({ added, changed, deleted }) => {
      let updatedData = [];
      console.log(changed);
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        // setData([...data, { id: startingAddedId, ...added }]);
        updatedData = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        // setData(
        //   data.map((appointment) =>
        //     changed[appointment.id]
        //       ? { ...appointment, ...changed[appointment.id] }
        //       : appointment
        //   )
        // );
        updatedData = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        // setData(data.filter((appointment) => appointment.id !== deleted));
        updatedData = data.filter((appointment) => appointment.id !== deleted);
      }
      setIsAppointmentBeingCreated(false);
      setData(updatedData);
      onUpdateAppointments(updatedData);
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

  const DayScaleCell = (props) => {
    const classes = useStyles();
    const { startDate, today } = props;

    if (today) {
      return <WeekView.DayScaleCell {...props} className={classes.today} />;
    }
    if (startDate.getDay() === 0 || startDate.getDay() === 6) {
      return <WeekView.DayScaleCell {...props} className={classes.weekend} />;
    }
    return <WeekView.DayScaleCell {...props} />;
  };

  const CommandButton = React.useCallback(({ id, ...restProps }) => {
    if (id === "deleteButton") {
      return <AppointmentForm.CommandButton id={id} {...restProps} />;
    }
    return <AppointmentForm.CommandButton id={id} {...restProps} />;
  }, []);

  React.useEffect(() => {
    console.log(data);
  }, [data]);
  if (!activeUser) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="p-calendar">
      <Paper>
        <Scheduler data={data} height="auto" locale={"he"}>
          <ViewState
            defaultCurrentDate={currentDate.setDate(currentDate.getDate())}
          />
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
            dayScaleCellComponent={DayScaleCell}
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
          <DragDropProvider onCommitChanges={onCommitChanges} />
        </Scheduler>
      </Paper>
    </div>
  );
}

export default Calendar;
