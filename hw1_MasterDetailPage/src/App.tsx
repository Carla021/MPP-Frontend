import {
  MonitorsContext,
  MonitorsContextProvider,
} from "./contexts/MonitorsContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DisplayMonitorsPage from "./pages/DisplayDataPage/DisplayMonitorsPage";

import "./App.css";
import MonitorDetailsPage from "./pages/MonitorDetailsPage/MonitorDetailsPage";
import AddMonitorPage from "./pages/AddMonitorPage/AddMonitorPage";
import EditMonitorPage from "./pages/EditMonitorPage/EditMonitorPage";
import FilterMonitorsPage from "./pages/FilterMonitorsPage/FilterMonitorsPage";
import ChartPage from "./pages/ChartPage/ChartPage";
import { useContext } from "react";
import Alert from "@mui/material/Alert";
import DisplayReviewsPage from "./pages/DisplayDataPage/DisplayReviewsPage";
import AddReviewPage from "./pages/AddReviewPage/AddReviewPage";
import EditReviewPage from "./pages/EditReviewPage/EditReviewPage";
import { ReviewsContextProvider } from "./contexts/ReviewsContext";
import ReviewDetailsPage from "./pages/ReviewDetailsPage/ReviewDetailsPage";

const AppContent = () => {
  const monitorsContext = useContext(MonitorsContext);
  const isServerOnline = monitorsContext?.isServerOnline;
  const isOnline = monitorsContext?.isOnline;

  console.log(isOnline);

  if (!isOnline) {
    return <Alert severity="warning">You are offline.</Alert>;
  }

  if (!isServerOnline) {
    return <Alert severity="warning">The server is down.</Alert>;
  }

  return (
    <MonitorsContextProvider>
      <ReviewsContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DisplayMonitorsPage />} />
            <Route
              path="/MonitorDetails/:monitorId"
              element={<MonitorDetailsPage />}
            />
            <Route path="/addMonitor" element={<AddMonitorPage />} />
            <Route
              path="/editMonitor/:monitorId"
              element={<EditMonitorPage />}
            />
            <Route path="/filterMonitors" element={<FilterMonitorsPage />} />
            <Route path="/monitorsChart" element={<ChartPage />} />
            <Route path="/reviews" element={<DisplayReviewsPage />} />
            <Route path="/addReview" element={<AddReviewPage />} />
            <Route path="/editReview/:reviewId" element={<EditReviewPage />} />
            <Route
              path="/ReviewDetails/:reviewId"
              element={<ReviewDetailsPage />}
            />
          </Routes>
        </BrowserRouter>
      </ReviewsContextProvider>
    </MonitorsContextProvider>
  );
};

const App = () => {
  return (
    <MonitorsContextProvider>
      <ReviewsContextProvider>
        <AppContent></AppContent>
      </ReviewsContextProvider>
    </MonitorsContextProvider>
  );
};

export default App;

//<Route path="/monitorsChart" element={<ChartPage />} />
// <Route path='/editMonitor/:monitorId' element={<EditMonitorPage/>} />
