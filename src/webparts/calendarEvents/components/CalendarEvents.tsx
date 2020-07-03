import * as React from 'react';
import styles from './CalendarEvents.module.scss';
import { ICalendarEventsProps } from './ICalendarEventsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { MSGraphClient } from '@microsoft/sp-http';
import { ICalendarEventsState } from './ICalendarEventsState';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, } from 'office-ui-fabric-react/lib/Button';
import { GraphGet } from '../../../Services/GraphGet';
import { EventModel } from '../../../Model/EventModel';
import { Calendar } from "../../../Control/Calendar";

export default class CalendarEvents extends React.Component<ICalendarEventsProps, ICalendarEventsState> {
  private _serveces: GraphGet;

  constructor(props: ICalendarEventsProps) {
    super(props);
    this._serveces = new GraphGet(props);
    this.state = {
      calendar: <div />,
      loader: true,
      hideDialog: true
    };
  }
  public componentDidMount() {
    this.getOutlookEvents();
  }

  private getOutlookEvents() {
    let events: EventModel[] = [];
    this._serveces.GraphGetOutlookEvents().then((result) => {
      result == null ? this.setState({ loader: false, hideDialog: false }) :
        result.value.map((event) => {
          events.push({
            title: event.subject,
            start: event.start.dateTime,
            end: event.end.dateTime,
            description: event.bodyPreview,
            color: "#0078d4" //themePrimary color
          });
        });
      this.setState({ calendar: <Calendar events={events} />, loader: false });
    });
  }

  public render(): React.ReactElement<ICalendarEventsProps> {
    return (

      <div className={styles.calendarEvents}>
        <div className={styles.container}>
          <div className={styles.row}>
            <h1 style={{ textAlign: "center" }}>{this.props.description}</h1>
            {this.state.loader == true ? <Spinner size={SpinnerSize.large} label="Hämtar händelser från Outlook..." /> : this.state.calendar}
            <Dialog
              hidden={this.state.hideDialog}
              onDismiss={() => { this.setState({ hideDialog: true }); }}
              dialogContentProps={{
                type: DialogType.largeHeader,
                title: "Ops!",
                subText: "Ops nånting gick fel! Programmet kunde inte hämta händelser från Outlook. Kontakta support. Tack för din tålamod!"
              }}
              modalProps={{
                titleAriaId: 'myLabelId',
                subtitleAriaId: 'mySubTextId',
                isBlocking: false,
                containerClassName: 'ms-dialogMainOverride'
              }}
            >
              {null /** You can also include null values as the result of conditionals */}
              <DialogFooter>
                <PrimaryButton onClick={() => { this.setState({ hideDialog: true }); }} text="OK" />
              </DialogFooter>
            </Dialog>
          </div>
        </div>
      </div>
    );
  }
}
