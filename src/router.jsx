import {
  createHashRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from "./App.jsx";
import HomePage from "./components/HomePage.jsx";
import AddInvoice from "./components/invoice/AddInvoice.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import ViewAllInvoices from "./components/invoice/ViewAllInvoices.jsx";
import HooksWrapper from "./components/common/HooksWrapper.jsx";
import StoreInvoice from "./components/invoice/StoreInvoice.jsx";
import PreviewInvoice from "./components/invoice/PreviewInvoice.jsx";

// hash router is used for the static deployment purpose on github
const router = createHashRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<HooksWrapper IncomingComponent={App} />}
      errorElement={<ErrorPage />}
    >
      <Route index Component={HomePage} />

      <Route
        path="/add"
        element={<HooksWrapper IncomingComponent={AddInvoice} />}
      />

      <Route
        path="/store"
        element={<HooksWrapper IncomingComponent={StoreInvoice} />}
      />

      <Route
        path="/all"
        element={<HooksWrapper IncomingComponent={ViewAllInvoices} />}
      />

      <Route
        path="/preview"
        element={<HooksWrapper IncomingComponent={PreviewInvoice} />}
      />

      <Route path="*" Component={NotFoundPage} />
    </Route>
  )
);

export default router;
