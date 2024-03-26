import { useEffect, useState } from "react";
import { Monitor } from "./models/entity";
import { MonitorsContextProvider } from "./contexts/MonitorsContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DisplayMonitorsPage from "./pages/DisplayDataPage/DisplayMonitorsPage";

import "./App.css";
import MonitorDetailsPage from "./pages/MonitorDetailsPage/MonitorDetailsPage";
import AddMonitorPage from "./pages/AddMonitorPage/AddMonitorPage";
import EditMonitorPage from "./pages/EditMonitorPage/EditMonitorPage";
import FilterMonitorsPage from "./pages/FilterMonitorsPage/FilterMonitorsPage";
import ChartPage from "./pages/ChartPage/ChartPage";
//import ChartPage from "./pages/ChartPage/ChartPage";

let demoMonitor1: Monitor = new Monitor(1, "Samsung", "75Hz", "monitor1.jpg");
let demoMonitor2: Monitor = new Monitor(2, "Lenovo", "165Hz", "monitor2.jpg");
let demoMonitor3: Monitor = new Monitor(3, "LG", "75Hz", "monitor3.jpg");
let demoMonitor4: Monitor = new Monitor(4, "Lenovo", "165Hz", "monitor4.jpg");

const App = () => {
  let [monitors, setMonitors] = useState<Monitor[]>([
    demoMonitor1,
    demoMonitor2,
    demoMonitor3,
    demoMonitor4
  ]);

  //const [data, setData] = useState([0, 1, 2, 3, 4, 5, 6, 7]);

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
    <MonitorsContextProvider
      monitorContext={{
        monitors,
        addMonitor,
        removeMonitor,
        editMonitor,
        filterMonitor,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DisplayMonitorsPage />} />
          <Route
            path="/MonitorDetails/:monitorId"
            element={<MonitorDetailsPage />}
          />
          <Route path="/addMonitor" element={<AddMonitorPage />} />
          <Route path="/editMonitor/:monitorId" element={<EditMonitorPage />} />
          <Route path="/filterMonitors" element={<FilterMonitorsPage />} />
          <Route path="/monitorsChart" element={<ChartPage />} />
        </Routes>
      </BrowserRouter>
    </MonitorsContextProvider>
  );
};

export default App;

//<Route path="/monitorsChart" element={<ChartPage />} />
// <Route path='/editMonitor/:monitorId' element={<EditMonitorPage/>} />
