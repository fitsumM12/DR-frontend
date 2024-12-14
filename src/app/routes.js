import { lazy } from "react";
import { Navigate } from "react-router-dom";
import AuthGuard from "./auth/AuthGuard";
import Loadable from "./components/Loadable";
import Layout from "./components/Layout/Layout";

// // SESSION PAGES
const NotFound = Loadable(lazy(() => import("app/views/sessions/NotFound")));
const JwtLogin = Loadable(lazy(() => import("app/views/sessions/JwtLogin")));
const JwtRegister = Loadable(lazy(() => import("app/views/sessions/JwtRegister")));
const ForgotPassword = Loadable(lazy(() => import("app/views/sessions/ForgotPassword")));

// DASHBOARD PAGE
const Analytics = Loadable(lazy(() => import("app/views/dashboard/Analytics")));
const PatientsRecord = Loadable(lazy(() => import("app/views/components/tables/PatientsRecord")));
const PatientForm = Loadable(lazy(() => import("app/views/components/forms/PatientForm")));
const ProfilePage = Loadable(lazy(() => import("app/views/components/profile_page")));

const routes = [
  {
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      { path: "/DR/dashboard/", element: <Analytics /> }, // Dashboard Route
      { path: "/DR/newcase/", element: <PatientForm /> }, // New Case Form
      { path: "/DR/records/", element: <PatientsRecord /> }, // Patients Records
      { path: "/DR/user_profile/", element: <ProfilePage /> }, // User Profile
      { path: "/DR/*", element: <NotFound /> }, // Catch-all for undefined routes under /DR
    ],
  },
  { path: "/DR/session/404", element: <NotFound /> },
  { path: "/DR/session/signin", element: <JwtLogin /> },
  { path: "/DR/session/signup", element: <JwtRegister /> },
  { path: "/DR/session/forgot-password", element: <ForgotPassword /> },
  { path: "/", element: <Navigate to="/DR/dashboard/" /> }, // Default Route, redirect to /DR/dashboard
  { path: "*", element: <Navigate to="/DR/session/404" /> }, // Catch-all for undefined routes
];

export default routes;
