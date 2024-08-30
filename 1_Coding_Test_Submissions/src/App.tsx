import TimeTable from './pages/TimeTable';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/timetable" element={<TimeTable />} />
    </Routes>
  );
}

export default App;