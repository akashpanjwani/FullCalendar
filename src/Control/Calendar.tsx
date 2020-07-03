import * as React from 'react';
import { ICalendarProps } from "./ICalendarProps";
import { ICalendarState } from "./ICalendarState";
SPComponentLoader.loadCss("https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.4.0/fullcalendar.min.css");

import { SPComponentLoader } from '@microsoft/sp-loader';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
var $: any = require('jquery');
//require('fullcalendar');
//import 'fullcalendar';
//import 'calendarlocale';

export class Calendar extends React.Component<ICalendarProps, ICalendarState> {
    constructor(props: ICalendarProps) {
        super(props);

        this.state = {
            hideDialog: true,
            dialogTitle: "",
            dialogDescription: ""
        };
    }

    public componentDidMount() {
        this.displayCalendar();
    }
    private displayCalendar() {
        $.noConflict();

        //$('#calendar').fullcalendar('destroy');
        // $('#calendar').fullcalendar({
        //     //locale: 'sv', //     <---------<<<  remove this line for english
        //     header: {
        //         left: 'prev,next today',
        //         center: 'title',
        //         right: 'month,agendaWeek,agendaDay,listMonth',
        //     },
        //     buttonText: {
        //         list: 'List'
        //     },

        //     firstDay: 1,
        //     weekends: true,
        //     weekNumbers: true,
        //     navLinks: true, // can click day/week names to navigate views 
        //     eventLimit: true, // allow "more" link when too many events
        //     events: this.props.events,
        //     eventClick: (event) => {
        //         this.setState({
        //             dialogTitle: event.title,
        //             dialogDescription: event.description,
        //             hideDialog: false
        //         });

        //     }

        // });

    }
    public render(): React.ReactElement<ICalendarProps> {

        return (
            <div>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.4.0/fullcalendar.min.css" />
                <div id="calendar"></div>
                <Dialog
                    hidden={this.state.hideDialog}
                    onDismiss={() => { this.setState({ hideDialog: true }); }}
                    dialogContentProps={{
                        type: DialogType.normal,
                        title: this.state.dialogTitle,
                        subText: this.state.dialogDescription
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
            </div >
        );
    }

}