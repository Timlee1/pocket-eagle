import { Provider } from "react-redux";
import { AppProvider } from "@/stores/app";
import { AppRoutes } from "@/routes";
import { store } from "@/stores/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </Provider>
    </>
  );
}

export default App;
