import { Monitor } from "../models/entity";

export type MonitorCardPropsType = {
    givenMonitor: Monitor;
    removeMethod: (monitorId: number) => void;
    editMethod: (monitorId: number, monitor: Monitor) => void;
}