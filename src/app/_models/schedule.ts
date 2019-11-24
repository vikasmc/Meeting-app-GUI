import { Timestamp } from "rxjs";

export class Schedule {
    userId: number;
    roomName: string;
    topicName: string;
    topicDescription: string;
    startTime: Timestamp<number>;
    endTime: Timestamp<number>;
}