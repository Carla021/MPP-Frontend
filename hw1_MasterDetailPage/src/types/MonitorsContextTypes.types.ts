import { ReactNode } from "react";
import { Monitor } from "../models/entity"

export type MonitorsContextType = {
    monitors: Monitor[];
    addMonitor: (monitor: Monitor) => void;
    removeMonitor: (monitorId: number) => void;
    editMonitor: (monitorId: number, monitor: Monitor) => void;
    filterMonitor: (criteria: string) => void;
};

export type ProviderType = {
    monitorContext: MonitorsContextType;
    children: ReactNode;
}