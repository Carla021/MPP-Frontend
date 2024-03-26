import { Monitor } from "../models/entity";

export type MonitorFormType = {
    idInput: React.RefObject<HTMLInputElement>;
    brandInput: React.RefObject<HTMLInputElement>;
    refreshRateInput: React.RefObject<HTMLInputElement>;
    urlInput: React.RefObject<HTMLInputElement>;
    givenMonitor?: Monitor;
};