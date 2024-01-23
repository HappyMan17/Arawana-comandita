import { Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Home, PlateScreen, Tables } from "../pages/";
import { Sidebar } from "../components/Sidebar";
import { useUser } from "../hooks";
import { Summary } from "../pages/day_summary";

export const AppRouter = () => {
  const { startLogout } = useUser();
  const Layout = () => {
    return (
      <>
        <Sidebar logout={startLogout}>
          <Suspense fallback={<h2>Loading...</h2>}>
            <Outlet />
          </Suspense>
        </Sidebar>
      </>
    );
  };

  return (
    <Routes>
      <Route path='/' element={ <Layout /> } >
        <Route path="home" element={ <Home /> } />
        <Route path="tables" element={ <Tables /> } />
        <Route path="plates" element={ <PlateScreen /> } />
        <Route path="summaries" element={ <Summary /> } />
        <Route path="/*" element={
          <Navigate to="/summaries" replace={true} />
        } />
      </Route>
    </Routes>
  );
};
