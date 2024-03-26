import { useContext, useState } from "react";
import { MonitorsContext } from "../../contexts/MonitorsContext";
import Layout from "../../components/layout/Layout";
import MonitorCard from "../../features/displayMonitors/MonitorCard";

import "./DisplayMonitorsPage.css";

const DisplayMonitorsPage = () => {
  document.title = "Monitors dashboard!";

  const monitorsContext = useContext(MonitorsContext)!;

  // let monitorsArray: Monitor[] = monitorsContext.monitors;
  const removeMethod = monitorsContext.removeMonitor;
  const editMethod = monitorsContext.editMonitor;

  const monitors = monitorsContext.monitors;

  const monitorsPerPage = 2; // Number of monitors per page
  const [currentPage, setCurrentPage] = useState(1);
  
  const lastIndex = currentPage * monitorsPerPage;
  const firstIndex = lastIndex - monitorsPerPage;

  const records = monitors.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(monitors.length / monitorsPerPage);

  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  function prePage() {
    if(currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id: number) {
      setCurrentPage(id);
  }

  function nextPage() {
    if(currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <Layout>
      <div className="main-page-container">
        <div className="monitors-list">
          {records.map((monitor) => (
            <MonitorCard
              givenMonitor={monitor}
              removeMethod={removeMethod}
              editMethod={editMethod}
              key={monitor.getId()}
            />
          ))}
        </div>
      </div>
      <nav>
        <ul className='pagination'>
            <li className='page-item'>
                <a href='#' className='page-link'
                onClick={prePage}>Prev</a>
            </li>
            {
                numbers.map((n, i) => (
                  <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                      <a href='#' className='page-link'
                      onClick={() => changeCPage(n)} >{n}</a>
                  </li>
                ))
            }
            <li className='page-item'>
                <a href='#' className='page-link'
                onClick={nextPage}>Next</a>
            </li>
        </ul>
    </nav>
    </Layout>
  );
};

export default DisplayMonitorsPage;
