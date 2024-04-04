export default function GetTableInfo(predictionData) {
  let tableHeaders = [];
  let tableRows = [];

  // Assuming predictionData is an array of objects
  if (predictionData && predictionData.length > 0) {
    const firstPrediction = predictionData[0];

    // Extract table headers from the keys of the first prediction object
    tableHeaders = Object.keys(firstPrediction);

    // Extract table rows from the prediction data
    tableRows = predictionData.map((prediction) => Object.values(prediction));
  }

  return { tableHeaders, tableRows };
}
