import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";

const generateActivityData = () => {
  const data = [];

  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 6);

  const today = new Date();

  let current = new Date(startDate);

  while (current <= today) {

    data.push({
      date: current.toISOString().split("T")[0],
      count: Math.floor(Math.random() * 5),
    });

    current.setDate(current.getDate() + 1);
  }

  return data;
};

const HeatMapProfile = () => {

  const [activityData, setActivityData] = useState([]);

  useEffect(() => {

    const data = generateActivityData();

    setActivityData(data);

  }, []);

  return (
    <div className="heatmap-container">

      <div className="heatmap-header">
        Contribution Activity
      </div>

      <HeatMap
        value={activityData}
        startDate={new Date(
          new Date().setMonth(
            new Date().getMonth() - 6
          )
        )}

        width={900}

        rectSize={16}

        space={5}

        rectProps={{
          rx: 4,
        }}

        style={{
          color: "#c9d1d9",
          marginTop: "20px",
        }}

        panelColors={{
          0: "#161b22",
          1: "#0e4429",
          2: "#006d32",
          3: "#26a641",
          4: "#39d353",
        }}
      />

    </div>
  );
};

export default HeatMapProfile;