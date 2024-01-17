import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/";
import { AppRouter } from "./AppRouter";
import { useUser } from "../hooks";

interface NavigatorProps {
    isSignUp: boolean
}

const AuthRouter = () => {
    return (
        <Routes>
            <Route
                path="/login"
                element={ <Login /> }
            />
            <Route
                path="/*"
                element={ <Navigate to="/login" replace={true} /> }
            />
        </Routes>
    );
};

export const MainRouter = () => {
    const { status } = useUser();

    const Navigator = ({ isSignUp }: NavigatorProps) => {
        return isSignUp ? <AppRouter /> : <AuthRouter />;
    };

    return (
        <Routes>

            <Route
                path="/*"
                element={ <Navigator isSignUp={ status === 'authorized' } /> }
            />

        </Routes>
    );
};
