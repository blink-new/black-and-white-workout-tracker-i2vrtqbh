import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import DashboardPage from "@/pages/DashboardPage";

// Placeholder pages for now
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="container mx-auto py-10 px-4 md:px-6">
    <h1 className="text-3xl font-display font-bold text-primary">{title}</h1>
    <p className="text-muted-foreground mt-2">Coming soon...</p>
  </div>
);

function App() {
  // Apply dark theme to HTML element
  document.documentElement.classList.add("dark");

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/history" element={<PlaceholderPage title="Workout History" />} />
          <Route path="/exercises" element={<PlaceholderPage title="Manage Exercises" />} />
          {/* Add a catch-all for any other routes to redirect to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
