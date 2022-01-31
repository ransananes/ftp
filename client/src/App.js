import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Homepage from './pages/Homepage/Homepage';
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Homepage/>} />
      {/* <Route path="/search" component={searchPage} /> */}
    </Routes>
  </Router>
  );

}

export default App;
