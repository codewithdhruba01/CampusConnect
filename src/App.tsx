import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ClassroomView from "./pages/ClassroomView";
import AppLayout from "./components/layout/AppLayout";
import { ClassroomProvider } from "./hooks/useClassrooms";

function App() {
  return (
    <Router>
      <ClassroomProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/classroom/:id" element={<ClassroomView />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </ClassroomProvider>
    </Router>
  );
}

export default App;
