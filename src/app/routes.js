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
      { path: "/dashboard/", element: <Analytics /> }, // Dashboard Route
      { path: "newcase/", element: <PatientForm /> }, // New Case Form
      { path: "records/", element: <PatientsRecord /> }, // Patients Records
      { path: "user_profile/", element: <ProfilePage /> }, // User Profile
      { path: "*", element: <NotFound /> }, // Catch-all for undefined routes under /DR
    ],
  },
  { path: "session/404", element: <NotFound /> },
  { path: "session/signin", element: <JwtLogin /> },
  { path: "session/signup", element: <JwtRegister /> },
  { path: "session/forgot-password", element: <ForgotPassword /> },
  { path: "/", element: <Navigate to="dashboard/" /> }, // Default Route, redirect to dashboard
  { path: "*", element: <Navigate to="session/404" /> }, // Catch-all for undefined routes
];

export default routes;
