import { useContext, useRef, useEffect } from "react";
import { MonitorsContext } from "../../contexts/MonitorsContext";
import { useNavigate, useParams } from "react-router-dom";
import { Monitor } from "../../models/entity";
import Layout from "../../components/layout/Layout";
import Button from "../../components/button/Button";

import "./EditMonitorPage.css";

const EditMonitorPage = () => {
  document.title = "Edit a monitor";

  const { monitorId } = useParams(); 
  const idInput = useRef<HTMLInputElement>(null);
  const brandInput = useRef<HTMLInputElement>(null);
  const refreshRateInput = useRef<HTMLInputElement>(null);
  const urlInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const monitorsContext = useContext(MonitorsContext);

  if (!monitorId) {
    navigate("/");
    return;
  }

  useEffect(() => {
    if (!monitorsContext) return;

    const monitor = monitorsContext.monitors.find(
      (monitor) => monitor.getId() === parseInt(monitorId)
    );
    if (!monitor) return;

    idInput.current!.value = monitor.getId().toString();
    brandInput.current!.value = monitor.getBrand();
    refreshRateInput.current!.value = monitor.getRefreshRate();
    urlInput.current!.value = monitor.getPictureUrl();
  }, [monitorId, monitorsContext]);

  const handleClickOnWrapper = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      if (
        !idInput.current ||
        !brandInput.current ||
        !refreshRateInput.current ||
        !urlInput.current
      )
        throw new Error("Inputs references are null");

      const monitorId = parseInt(idInput.current.value);
      const monitorBrand = brandInput.current.value;
      const monitorRefreshRate = refreshRateInput.current.value;
      const monitorUrl = urlInput.current.value;

      const updatedMonitor = new Monitor(
        monitorId,
        monitorBrand,
        monitorRefreshRate,
        monitorUrl
      );

      monitorsContext?.editMonitor(monitorId, updatedMonitor);
      navigate("/"); // Navigate back to the main page after editing
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Layout>
      <div className="edit-page-container">
        <div className="edit-title">Edit monitor</div>

        <form onSubmit={handleClickOnWrapper}>
          <input type="text" placeholder="ID" ref={idInput} readOnly />
          <input type="text" placeholder="Brand" ref={brandInput} />
          <input type="text" placeholder="RefreshRate" ref={refreshRateInput} />
          <input type="text" placeholder="url" ref={urlInput} readOnly />

          <Button
            type="submit"
            buttonMessage="Edit monitor"
            className="form-button"
          />
        </form>
      </div>
    </Layout>
  );
};

export default EditMonitorPage;
