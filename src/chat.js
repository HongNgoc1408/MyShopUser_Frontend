import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const KommunicateChat = () => {
  const [registed, setRegistered] = useState(false);

  useEffect(() => {
    const initializeChatbot = () => {
      if (!registed) {
        const user = Cookies.get("user_data");
        let userData;

        if (user) {
          userData = JSON.parse(user);
        }

        // console.log(userData);
        if (userData) {
          // Kommunicate.init("34144efbc2238a6239923d4db0ab623f7", {
          //   automaticChatOpenOnNavigation: true,
          //   popupWidget: true,
          //   userId: userData.email,
          //   email: userData.email,
          //   userName: userData.fullName,
          // });
          (function (d, m) {
            var kommunicateSettings = {
              appId: "34144efbc2238a6239923d4db0ab623f7",
              userId: userData.email,
              userName: userData.fullName,
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

  return <></>;
};

export default KommunicateChat;
