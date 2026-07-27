function PerformanceChart({ history = [] }) {

  const chartData = history.map(
    (item, index) => ({
      label: `P${index + 1}`,
      value: Number(
        item.predictedPercentage || 0
      ),
    })
  );

  if (chartData.length === 0) {
    return (
      <div className="performance-chart">

        <div className="chart-header">
          <div>
            <h3>Prediction Trend</h3>

            <p>
              Your ML predictions over time
            </p>
          </div>

          <span className="chart-badge">
            ML
          </span>
        </div>

        <div className="chart-empty">
          <p>
            Analyze your academic performance
            to start building your trend.
          </p>
        </div>

      </div>
    );
  }


  /*
   * SVG dimensions
   *
   * x = horizontal position
   * y = score percentage
   */

  const width = 600;
  const height = 220;

  const leftPadding = 35;
  const rightPadding = 25;

  const topPadding = 25;
  const bottomPadding = 35;

  const usableWidth =
    width -
    leftPadding -
    rightPadding;

  const usableHeight =
    height -
    topPadding -
    bottomPadding;


  const getX = (index) => {

    if (chartData.length === 1) {
      return width / 2;
    }

    return (
      leftPadding +
      (index /
        (chartData.length - 1)) *
        usableWidth
    );
  };


  const getY = (value) => {

    const safeValue = Math.max(
      0,
      Math.min(100, value)
    );

    return (
      topPadding +
      ((100 - safeValue) / 100) *
        usableHeight
    );
  };


  const points = chartData
    .map(
      (item, index) =>
        `${getX(index)},${getY(item.value)}`
    )
    .join(" ");


  return (
    <div className="performance-chart">

      <div className="chart-header">

        <div>
          <h3>
            Prediction Trend
          </h3>

          <p>
            Last {chartData.length} ML analyses
          </p>
        </div>

        <span className="chart-badge">
          ML
        </span>

      </div>


      <div className="chart-container">

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="performance-svg"
        >

          {/* 100% */}

          <line
            x1={leftPadding}
            y1={getY(100)}
            x2={width - rightPadding}
            y2={getY(100)}
            className="chart-grid-line"
          />

          {/* 75% */}

          <line
            x1={leftPadding}
            y1={getY(75)}
            x2={width - rightPadding}
            y2={getY(75)}
            className="chart-grid-line"
          />

          {/* 50% */}

          <line
            x1={leftPadding}
            y1={getY(50)}
            x2={width - rightPadding}
            y2={getY(50)}
            className="chart-grid-line"
          />

          {/* 25% */}

          <line
            x1={leftPadding}
            y1={getY(25)}
            x2={width - rightPadding}
            y2={getY(25)}
            className="chart-grid-line"
          />


          {/* TREND LINE */}

          {chartData.length > 1 && (
            <polyline
              points={points}
              className="chart-line"
            />
          )}


          {/* DATA POINTS */}

          {chartData.map(
            (item, index) => (

              <g key={index}>

                <circle
                  cx={getX(index)}
                  cy={getY(item.value)}
                  r="5"
                  className="chart-point"
                />

                <text
                  x={getX(index)}
                  y={
                    getY(item.value) - 12
                  }
                  textAnchor="middle"
                  className="chart-value"
                >
                  {item.value.toFixed(1)}%
                </text>

              </g>

            )
          )}

        </svg>


        <div className="history-labels">

          {chartData.map(
            (item, index) => (

              <span key={index}>
                {item.label}
              </span>

            )
          )}

        </div>

      </div>

    </div>
  );
}

export default PerformanceChart;