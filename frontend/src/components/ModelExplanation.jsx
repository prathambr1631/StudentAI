function ModelExplanation({ academicData }) {

  const explanation =
    academicData?.explanation || [];

  if (explanation.length === 0) {
    return null;
  }

  const featureLabels = {
    G1: "First Period Grade",
    G2: "Second Period Grade",
    studytime: "Study Time",
    failures: "Previous Failures",
    absences: "Absences",
  };


  const sortedFeatures = [
    ...explanation
  ].sort(
    (a, b) =>
      Math.abs(b.contribution) -
      Math.abs(a.contribution)
  );


  const maxContribution = Math.max(
    ...sortedFeatures.map(
      (item) =>
        Math.abs(item.contribution)
    ),
    1
  );


  return (
    <div className="explanation-card">

      <div className="explanation-header">

        <div>
          <h3>
            Why this prediction?
          </h3>

          <p>
            Feature contributions from the
            Linear Regression model
          </p>
        </div>

        <span className="explain-badge">
          XAI
        </span>

      </div>


      <div className="explanation-list">

        {sortedFeatures.map(
          (item) => {

            const width =
              (
                Math.abs(
                  item.contribution
                ) /
                maxContribution
              ) * 100;

            return (
              <div
                className="explanation-item"
                key={item.feature}
              >

                <div className="explanation-info">

                  <span>
                    {featureLabels[
                      item.feature
                    ] || item.feature}
                  </span>

                  <strong>
                    {item.contribution > 0
                      ? "+"
                      : ""}
                    {item.contribution}
                  </strong>

                </div>


                <div className="explanation-track">

                  <div
                    className={
                      item.contribution >= 0
                        ? "explanation-fill positive"
                        : "explanation-fill negative"
                    }
                    style={{
                      width: `${width}%`
                    }}
                  />

                </div>


                <div className="explanation-details">

                  Value: {item.value}

                  {" · "}

                  Model coefficient:{" "}
                  {item.coefficient}

                </div>

              </div>
            );
          }
        )}

      </div>

    </div>
  );
}

export default ModelExplanation;