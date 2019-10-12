import { Timestamp } from "rxjs";

export class Schedule {
    userId: string;
    rommId: string;
    topicName: string;
    topicDescription: string;
    startTime: Timestamp<number>;
    endTime: Timestamp<number>;
}