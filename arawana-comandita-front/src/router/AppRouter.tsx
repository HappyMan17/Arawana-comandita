import { Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Home } from "../pages/";
import { Sidebar } from "../components/Sidebar";
import { Tables } from "../pages/tables/Tables";
import { useUser } from "../hooks";

export const AppRouter = () => {
  const { logoutUser } = useUser();
  const Layout = () => {
    return (
      <>
        <Sidebar logout={logoutUser}>
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
        <Route path="/*" element={ <Navigate to="/home" replace={true} /> } />
      </Route>
    </Routes>
  );
};
