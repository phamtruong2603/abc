import React from "react";
import './App.css'
import Provider from "./component/contextAPI/Provider";
import ProviderPost from "./component/contextAPI/ProviderPost";
import ProviderRoom from "./component/contextAPI/ProviderRoom";
import ProviderSwitchMode from "./component/contextAPI/ProviderSwitchMode";
import ProviderSocket from "./component/contextAPI/ProviderSocket";
import SwitchMode from "./SwitchMode/SwitchMode";

function App() {
  return (
    <Provider>
      <ProviderPost>
        <ProviderRoom>
          <ProviderSwitchMode>
            <ProviderSocket>

              {/* Thay đổi giao diện sáng tối */}
              <SwitchMode />

            </ProviderSocket>
          </ProviderSwitchMode>
        </ProviderRoom>
      </ProviderPost>
    </Provider>

  );
}

export default App;
