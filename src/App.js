import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";

const apiUrl = "https://archive-api.open-meteo.com/v1/archive?latitude=40.71&longitude=-74.01&start_date=2022-01-01&end_date=2023-04-18&daily=weathercode,temperature_2m_mean,precipitation_sum,windspeed_10m_max,windgusts_10m_max&timezone=America%2FNew_York"

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<Home apiUrl={apiUrl} />} />
          </Routes>
        </main>

      </Router>
    </div>
  );
}


export default App;
