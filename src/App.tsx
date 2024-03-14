import { BrowserRouter, Route, Routes } from "react-router-dom";

import { NewRoom } from "./pages/NewRoom";
import { Home } from "./pages/Home";
import { Room } from "./pages/Room";

import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/*" Component={Home}/>
          <Route path="/rooms/new" Component={NewRoom}/>
          <Route path="/rooms/:id" Component={Room}/>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;