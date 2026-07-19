import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Home from "../pages/frontend/Home";
import TemplateShowcase from "../pages/frontend/TemplateShowcase";
import TemplateDemo from "../pages/frontend/TemplateDemo";
import EnquiryForm from "../pages/frontend/EnquiryForm";
import About from "../pages/frontend/About";
import Contact from "../pages/frontend/Contact";
import Login from "../pages/frontend/auth/Login";
import Register from "../pages/frontend/auth/Register";

// Super Admin Panels
import SuperAdminDashboard from "../pages/backend/superadmin/SuperAdminDashboard";
import CategoryManager from "../pages/backend/superadmin/CategoryManager";
import TemplateManager from "../pages/backend/superadmin/TemplateManager";
import AdminManager from "../pages/backend/superadmin/AdminManager";
import EnquiryManager from "../pages/backend/superadmin/EnquiryManager";
import ExperienceManager from "../pages/backend/superadmin/ExperienceManager";

// Creator Panels
import CreatorDashboard from "../pages/backend/creator/CreatorDashboard";
import ExperienceCreator from "../pages/backend/creator/ExperienceCreator";

// Experience Viewer
import ExperienceViewer from "../pages/experience/ExperienceViewer";

// Layout & Route Wrappers
import DefaultLayout from "../layout/DefaultLayout";
import ProtectedRoute from "../layout/ProtectedRoute";
import PublicRoute from "../layout/PublicRoute";
import { Sparkles, Shield } from "lucide-react";
import Button from "../components/common/Button";

import ThemeToggle from "../components/common/ThemeToggle";

// Simple Public Header
const PublicHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-250 dark:border-white/5 px-6 py-4 flex justify-between items-center text-slate-900 dark:text-white transition-colors duration-300">
      <Link to="/" className="flex items-center gap-2">
        <Sparkles className="text-brand-500 animate-pulse" size={18} />
        <span className="font-extrabold tracking-wider text-base">Momenta</span>
      </Link>
      <nav className="flex items-center gap-6 text-xs font-semibold text-gray-600 dark:text-gray-300">
        <Link to="/" className="hover:text-brand-500 dark:hover:text-white transition-colors">Home</Link>
        <Link to="/templates" className="hover:text-brand-500 dark:hover:text-white transition-colors">Themes</Link>
        <Link to="/about" className="hover:text-brand-500 dark:hover:text-white transition-colors">About</Link>
        <Link to="/contact" className="hover:text-brand-500 dark:hover:text-white transition-colors">Contact</Link>
      </nav>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Link to="/login" className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-brand-600 hover:border-brand-500 hover:text-white rounded-full text-xs font-bold transition-all cursor-pointer">
          <Shield size={13} />
          <span>Console</span>
        </Link>
      </div>
    </header>
  );
};

const DefaultRoutes = () => {
  return (
    <Routes>
      {/* 1. Public Marketing Website */}
      <Route
        path="/"
        element={
          <>
            <PublicHeader />
            <Home />
          </>
        }
      />
      <Route
        path="/templates"
        element={
          <>
            <PublicHeader />
            <TemplateShowcase />
          </>
        }
      />
      <Route
        path="/templates/:category/:slug"
        element={<TemplateDemo />}
      />
      <Route
        path="/enquiry"
        element={
          <>
            <PublicHeader />
            <EnquiryForm />
          </>
        }
      />
      <Route
        path="/about"
        element={
          <>
            <PublicHeader />
            <About />
          </>
        }
      />
      <Route
        path="/contact"
        element={
          <>
            <PublicHeader />
            <Contact />
          </>
        }
      />

      {/* 2. Public Auth Routes (Redirects if already logged in) */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* 3. Protected Super Admin Dashboard Panel */}
      <Route element={<ProtectedRoute allowedRoles={["super_admin"]} />}>
        <Route
          path="/superadmin"
          element={
            <DefaultLayout>
              <SuperAdminDashboard />
            </DefaultLayout>
          }
        />
        <Route
          path="/superadmin/categories"
          element={
            <DefaultLayout>
              <CategoryManager />
            </DefaultLayout>
          }
        />
        <Route
          path="/superadmin/templates"
          element={
            <DefaultLayout>
              <TemplateManager />
            </DefaultLayout>
          }
        />
        <Route
          path="/superadmin/admins"
          element={
            <DefaultLayout>
              <AdminManager />
            </DefaultLayout>
          }
        />
        <Route
          path="/superadmin/enquiries"
          element={
            <DefaultLayout>
              <EnquiryManager />
            </DefaultLayout>
          }
        />
        <Route
          path="/superadmin/experiences"
          element={
            <DefaultLayout>
              <ExperienceManager />
            </DefaultLayout>
          }
        />
      </Route>

      {/* 4. Protected Creator Dashboard Panel */}
      <Route element={<ProtectedRoute allowedRoles={["creator"]} />}>
        <Route
          path="/creator"
          element={
            <DefaultLayout>
              <CreatorDashboard />
            </DefaultLayout>
          }
        />
        <Route
          path="/creator/experience/create/:enquiryId"
          element={<ExperienceCreator />}
        />
      </Route>

      {/* 5. Public Experience Viewer Page */}
      <Route path="/e/:slug" element={<ExperienceViewer />} />

      {/* 6. Fallback Catch-all Route */}
      <Route
        path="*"
        element={
          <div className="bg-slate-950 text-white min-h-screen flex flex-col items-center justify-center text-center p-6 select-none">
            <h2 className="text-3xl font-extrabold mb-2">404 - Page Not Found</h2>
            <p className="text-gray-400 text-sm mb-6">The page location you are trying to visit does not exist.</p>
            <Link to="/">
              <Button variant="primary" className="cursor-pointer">Back to Home</Button>
            </Link>
          </div>
        }
      />
    </Routes>
  );
};

export default DefaultRoutes;