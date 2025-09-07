import { Route, Routes, Navigate } from "react-router-dom";
import Layout from '../layout/Layout';
import Auth from "../components/Auth";

const Register = () => {
    return (
        <Routes>
            {/* redirect /register → /register/login */}
            <Route index element={<Navigate to="login" replace />} />

            <Route
                path="login"
                element={
                    <Layout>
                        <Auth type="login" />
                    </Layout>
                }
            />
            <Route
                path="signup"
                element={
                    <Layout>
                        <Auth type="signup" />
                    </Layout>
                }
            />
        </Routes>
    );
};

export default Register;
