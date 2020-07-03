import { ICalendarEventsProps } from '../webparts/calendarEvents/components/ICalendarEventsProps';

export class GraphGet {
    private _graph;

    constructor(graph: ICalendarEventsProps) {
        this._graph = graph;
    }

    public GraphGetOutlookEvents(): Promise<any> {
        return this._graph.contextGraph.getClient().then((client: any) => {
            console.log("From client: ", client);
            return client.api('me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location')
                .get()
                .then((response) => {
                    console.log("From graph: ", response);
                    return response;
                });
        })
            .catch((error: any) => {
                console.log("Error: ", error);
            });
    }
}