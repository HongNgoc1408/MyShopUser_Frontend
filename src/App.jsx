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

import CartService from "./services/CartService";
import Chat from "./chat";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const FavoriteContext = createContext();
export const CountContext = createContext();
export const AvatarContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [favoriteList, setFavoriteList] = useState([]);
  const [count, setCount] = useState([]);
  const [avatar, setAvatar] = useState([]);

  useEffect(() => {
    if (state.isAuthenticated) {
      const fetchFavorites = async () => {
        try {
          const res = await UserService.getFavorite();
          const product = await CartService.count();
          const avatar = await UserService.getAvatar();

          setFavoriteList(res.data);
          setCount(product.data);
          setAvatar(avatar.data.imageURL);
        } catch (error) {
          console.error("Error", error);
        }
      };

      fetchFavorites();
    }
  }, [state.isAuthenticated]);

  return (
    <div>
      <AuthContext.Provider value={{ state, dispatch }}>
        <AvatarContext.Provider value={{ avatar, setAvatar }}>
          <CountContext.Provider value={{ count, setCount }}>
            <FavoriteContext.Provider value={{ favoriteList, setFavoriteList }}>
              <Chat />
              <Router>
                <Routes>
                  {generatePublicRoutes(state.isAuthenticated)}
                  {generatePrivateRoutes(state.isAuthenticated)}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Router>
            </FavoriteContext.Provider>
          </CountContext.Provider>
        </AvatarContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
