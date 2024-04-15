import { useNavigate } from "react-router-dom";
import { MonitorCardPropsType } from "../../types/MonitorCardProps.types";

import MonitorImage1 from "../../assets/monitor1.jpg";
import MonitorImage2 from "../../assets/monitor2.jpg";

import "./MonitorCard.css";
import axios from "axios";

const MonitorCard = ({ givenMonitor, removeMethod }: MonitorCardPropsType) => {
  // let path: string = "./assets/" + givenMonitor.getPictureUrl();

  const navigate = useNavigate();

  const handleCardOnClick = () => {
    navigate("/MonitorDetails/" + givenMonitor.getId());
  };

  const handleEditOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    navigate("/editMonitor/" + givenMonitor.getId());
  };

  const MonitorImage =
    givenMonitor.getId() == 1 ? MonitorImage1 : MonitorImage2;

  return (
    <div
      className="card"
      data-testid="monitor-card"
      onClick={handleCardOnClick}
    >
      <button
        className="remove-button"
        onClick={(e) => {
          e.stopPropagation(); // any parent elements that also have click event listeners will not receive the event

          // removeMethod(givenMonitor.getId());

          axios
            .delete(`http://localhost:5000/api/monitors/${givenMonitor.getId()}`)
            .then(() => {
              removeMethod(givenMonitor.getId());
            })
            .catch((error) => {
              console.error("Error deleting monitor:", error);
            });
        }}
      >
        X
      </button>

      <button className="edit-button" onClick={handleEditOnClick}>
        Edit
      </button>

      <div className="card-info">
        <div className="picture">
          <img src={MonitorImage} alt="monitor page" />
        </div>

        <div className="monitor-info">
          <div className="monitor-id">ID: {givenMonitor.getId()}</div>
          <div className="brand">Brand: {givenMonitor.getBrand()}</div>
        </div>
      </div>
    </div>
  );
};

export default MonitorCard;
