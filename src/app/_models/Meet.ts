import { Timestamp } from "rxjs/internal/operators/timestamp";

export class Meet {
    roomName: string;
    topicName: string;
    startTime: Timestamp<Number>;
    endTime: Timestamp<Number>;
    presenter: string;
}