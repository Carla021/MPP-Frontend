import { useContext } from "react";
import { useParams } from "react-router-dom";
import { MonitorsContext } from "../../contexts/MonitorsContext";

import MonitorImage1 from "../../assets/monitor1.jpg";
import MonitorImage2 from "../../assets/monitor2.jpg";

import "./MonitorDetailsPage.css";

const MonitorDetailsPage = () => {
  const { monitorId } = useParams(); 
  const { monitors } = useContext(MonitorsContext)!; 

  const parsedMonitorId = monitorId ? parseInt(monitorId) : undefined;

  const monitor = parsedMonitorId
    ? monitors.find((monitor) => monitor.getId() === parsedMonitorId)
    : undefined;

  if (!monitor) {
    return <div>Monitor not found</div>;
  }

  const MonitorImage = monitor.getId() == 1 ? MonitorImage1 : MonitorImage2;

  // let path: string = "../../assets/" + monitor.getPictureUrl();

  return (
    <div className="monitor-details-container">
      <div className="upper-section">
        <img
          src={MonitorImage}
          alt={monitor.getBrand()}
          className="monitor-image"
        />
      </div>
      <div className="lower-section">
        <h2>Monitor Details</h2>
        <p>ID: {monitor.getId()}</p>
        <p>Brand: {monitor.getBrand()}</p>
        <p>Refreshing Rate: {monitor.getRefreshRate()}</p>
      </div>
    </div>
  );
};

export default MonitorDetailsPage;
