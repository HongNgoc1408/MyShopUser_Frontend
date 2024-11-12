// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// // import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";

// // Kommunicate.init("34144efbc2238a6239923d4db0ab623f7", {
// //     automaticChatOpenOnNavigation: true,
// //     popupWidget: true
// //   });

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
// reportWebVitals();

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Cookies from "js-cookie";
import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";

const RootComponent = () => {
  // const [email, setEmail] = useState("");
  // const [fullName, setFullName] = useState("");

  const [registed, setRegistered] = useState(false);

  // const checkLogin = () => {
  //   const user = Cookies.get("user_data");
  //   if (user) {
  //     const userData = JSON.parse(user);
  //     setEmail(userData.email);
  //     setFullName(userData.fullName);
  //     return true;
  //   }
  //   return false;
  // };

  useEffect(() => {
    const initializeChatbot = () => {
      //   if (fullName && email && !registed) {
      //     Kommunicate.init("34144efbc2238a6239923d4db0ab623f7", {
      //       automaticChatOpenOnNavigation: true,
      //       popupWidget: true,
      //       userId: isLoggedIn ? email : undefined,
      //       email: isLoggedIn ? email : undefined,
      //       userName: isLoggedIn ? fullName : undefined,
      //       displayName: isLoggedIn ? fullName : undefined,
      //     });
      //     setRegistered(true);
      //   }
      //    else {
      //     (function (d, m) {
      //       var kommunicateSettings = {
      //         appId: "34144efbc2238a6239923d4db0ab623f7",
      //         popupWidget: true,
      //         automaticChatOpenOnNavigation: true,
      //       };

      //       var s = document.createElement("script");
      //       s.type = "text/javascript";
      //       s.async = true;
      //       s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      //       var h = document.getElementsByTagName("head")[0];
      //       h.appendChild(s);
      //       window.kommunicate = m;
      //       m._globals = kommunicateSettings;
      //     })(document, window.kommunicate || {});
      //     setRegistered(true);
      //   }
      // };

      if (!registed) {
        const user = Cookies.get("user_data");
        let userData;
        if (user) {
          userData = JSON.parse(user);
        }

        if (userData) {
          Kommunicate.init("34144efbc2238a6239923d4db0ab623f7", {
            automaticChatOpenOnNavigation: true,
            popupWidget: true,
            userId: userData.email,
            email: userData.email,
            userName: userData.fullName,
            // displayName: userData.fullName,
          });
        } else {
          (function (d, m) {
            var kommunicateSettings = {
              appId: "34144efbc2238a6239923d4db0ab623f7",
              popupWidget: true,
              automaticChatOpenOnNavigation: true,
            };

            var s = document.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0];
            h.appendChild(s);
            window.kommunicate = m;
            m._globals = kommunicateSettings;
          })(document, window.kommunicate || {});
        }

        setRegistered(true);
      }
    };

    initializeChatbot();
  }, [registed]);

  return <App />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RootComponent />);
reportWebVitals();
