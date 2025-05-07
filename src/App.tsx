
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import { TemplateEditor } from "./components/admin/templates/TemplateEditor";

const Admin = lazy(() => import("./pages/Admin"));
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/" element={<Index />} />
            <Route
              path="/admin"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Admin />
                </Suspense>
              }
            />
            <Route
              path="/admin/templates/:id"
              element={<TemplateEditor />}
            />
            {/* Redirect any other routes to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
