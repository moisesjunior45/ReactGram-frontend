import "./App.css";

// Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Hooks
import { useAuth } from "./hooks/useAuth";

// Components
import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";

// Pages
import Home from "./pages/Home/home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import EditProfile from "./pages/EditProfile/editProfile";
import Profile from "./pages/Profile/profile";
import Photo from "./pages/Photo/photo";
import Search from "./pages/Search/search";

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={auth ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={auth ? <EditProfile /> : <Navigate to="/login" />}
            />
            <Route
              path="/users/:id"
              element={auth ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!auth ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!auth ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="/search"
              element={auth ? <Search /> : <Navigate to="/login" />}
            />
            <Route
              path="/photos/:id"
              element={auth ? <Photo /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
