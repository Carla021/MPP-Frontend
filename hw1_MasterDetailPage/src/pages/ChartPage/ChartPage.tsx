//import { useContext, useEffect, useRef, useState } from 'react';
//import { Chart } from 'react-chartjs-2';
//import { MonitorsContext } from '../../contexts/MonitorsContext';
//import Chart from 'chart.js';
import { useContext, useEffect, useRef } from "react";
//import { Chart } from 'chart.js/auto';
import Chart, { ChartData } from "chart.js/auto";
import { MonitorsContext } from "../../contexts/MonitorsContext";
import Layout from "../../components/layout/Layout";
import "./ChartPage.css";

/*interface Props {
  chartData: number[];
}*/

const MonitorChart = () => {
  const { monitors } = useContext(MonitorsContext)!;

  // Function to get unique brands
  const getUniqueBrands = () => {
    const uniqueBrands = new Set<string>();
    monitors.forEach((monitor) => {
      uniqueBrands.add(monitor.getBrand());
    });
    return Array.from(uniqueBrands);
  };

  // Function to count monitors for each brand
  const countMonitorsByBrand = () => {
    const uniqueBrands = getUniqueBrands();
    const brandCounts: number[] = [];
    uniqueBrands.forEach((brand) => {
      const count = monitors.filter(
        (monitor) => monitor.getBrand() === brand
      ).length;
      brandCounts.push(count);
    });
    return brandCounts;
  };

  const formatData = (): ChartData => ({
    labels: getUniqueBrands(),
    datasets: [
      {
        label: "Number of Brands",
        data: countMonitorsByBrand(),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  });

  const chartRef = useRef<Chart | null>(null);

  const canvasCallback = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: getUniqueBrands(),
          datasets: [
            {
              label: "Number of Brands",
              data: countMonitorsByBrand(),
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
      });
    }
  };

  useEffect(() => {
    // must verify that the chart exists
    const chart = chartRef.current;
    if (chart) {
      chart.data = formatData();
      chart.update();
    }
  });

  return (
    <Layout>
      <div className="self-center w-1/2">
        <div className="overflow-hidden">
          <canvas ref={canvasCallback}></canvas>
        </div>
      </div>
    </Layout>
  );
};

export default MonitorChart;
