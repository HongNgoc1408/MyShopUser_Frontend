import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { generatePrivateRoutes, generatePublicRoutes } from "./routes";
import { initialState, reducer } from "./services/AuthReducer";
import NotFound from "./pages/NotFound/NotFound";
import UserService from "./services/UserService";
import { FavoriteContext } from "./components/Layout/DefaultLayout";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    if (state.isAuthenticated) {
      const fetchFavorites = async () => {
        try {
          const res = await UserService.getFavorite();
          // console.log("res", res.data);
          setFavoriteList(res.data);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      };
      fetchFavorites();
    }
  }, [state.isAuthenticated]);

  return (
    <div>
      <AuthContext.Provider value={{ state, dispatch }}>
        <Router>
          <FavoriteContext.Provider value={{ favoriteList, setFavoriteList }}>
            <Routes>
              {generatePublicRoutes(state.isAuthenticated)}
              {generatePrivateRoutes(state.isAuthenticated)}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </FavoriteContext.Provider>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
