import { createContext, useEffect, useState } from "react";
import {
  MonitorsContextType,
  ProviderType,
} from "../types/MonitorsContextTypes.types";
import { Monitor } from "../models/entity";
import axios from "axios";
import { io } from "socket.io-client";

export const MonitorsContext = createContext<MonitorsContextType | null>(null);

function MonitorsContextProvider({ children }: ProviderType) {
  let [monitors, setMonitors] = useState<Monitor[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isServerOnline, setIsServerOnline] = useState(true);

  useEffect(() => {
    const socket = io('http://localhost:5000', {transports: ['websocket']});
    socket.on('newMonitor', (newMonitor: any) => {
      console.log('Received new monitor from server:', newMonitor);
      const monitor = new Monitor(newMonitor.id, newMonitor.brand, newMonitor.refreshRate, newMonitor.pictureUrl);
      setMonitors((prevMonitors) => [...prevMonitors, monitor]);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));

    return () => {
      window.removeEventListener('online', () => setIsOnline(true));
      window.removeEventListener('offline', () => setIsOnline(false));
    };
  }, []);


  const fetchMonitors = () => {
    axios
      .get("http://localhost:5000/api/monitors")
      .then((response) => {
        const monitors = response.data.map(
          (monitor: any) =>
            new Monitor(
              monitor.id,
              monitor.brand,
              monitor.refreshRate,
              monitor.pictureUrl
            )
        );
        setMonitors(monitors);
      })
      .catch((error) => {
        console.error("Error fetching monitors:", error);
        setIsServerOnline(false);
      });
  };
  useEffect(() => {
    fetchMonitors();
  }, []);

  

  const addMonitor = (newMonitor: Monitor) => {
    setMonitors((prevState: Monitor[]) => [...prevState, newMonitor]);
  };

  const removeMonitor = (monitorId: number) => {
    setMonitors((prevState: Monitor[]) =>
      prevState.filter((monitor) => monitor.getId() !== monitorId)
    );
  };

  const editMonitor = (monitorId: number, updatedMonitor: Monitor) => {
    setMonitors((prevState: Monitor[]) =>
      prevState.map((monitor) => {
        if (monitor.getId() == monitorId) {
          return updatedMonitor;
        } else {
          return monitor;
        }
      })
    );
  };

  const filterMonitor = (criteria: string) => {
    const filteredMonitors = monitors.filter(
      (monitor) =>
        monitor.getId().toString().includes(criteria) ||
        monitor.getBrand().toLowerCase().includes(criteria.toLowerCase()) ||
        monitor.getRefreshRate().toLowerCase().includes(criteria.toLowerCase())
    );
    setMonitors(filteredMonitors);
  };

  useEffect(() => {
    console.log(monitors);
  }, [monitors]);

  return (
    <MonitorsContext.Provider value={{monitors, addMonitor, removeMonitor, editMonitor, filterMonitor, isOnline, isServerOnline}}>
      {children}
    </MonitorsContext.Provider>
  );
}

export { MonitorsContextProvider };

