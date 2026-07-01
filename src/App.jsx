import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import { LanguageProvider } from './lib/LanguageContext';
import { usePageTracking } from '@/hooks/usePageTracking';

// Lazy load all pages
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPostPage = lazy(() => import('./pages/BlogPost'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminHero = lazy(() => import('./pages/admin/AdminHero'));
const AdminServices = lazy(() => import('./pages/admin/AdminServices'));
const AdminPortfolio = lazy(() => import('./pages/admin/AdminPortfolio'));
const AdminPricing = lazy(() => import('./pages/admin/AdminPricing'));
const AdminTestimonials = lazy(() => import('./pages/admin/AdminTestimonials'));
const AdminFAQ = lazy(() => import('./pages/admin/AdminFAQ'));
const AdminBlog = lazy(() => import('./pages/admin/AdminBlog'));
const AdminAuthors = lazy(() => import('./pages/admin/AdminAuthors'));

const loadingSpinner = (
  <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: "#FAFAF8" }}>
    <div className="w-7 h-7 border-2 border-[#B8972E]/20 border-t-[#B8972E] rounded-full animate-spin"></div>
  </div>
);

const AuthenticatedApp = () => {
  usePageTracking();
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();
  const location = useLocation();

  if (isLoadingPublicSettings) return loadingSpinner;

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoginRoute = location.pathname === '/admin/login';

  if (isAdminRoute && !isLoginRoute) {
    if (isLoadingAuth) return loadingSpinner;
    if (authError?.type === 'user_not_registered') return <UserNotRegisteredError />;
    if (authError?.type === 'auth_required') { navigateToLogin(); return null; }
  }

  return (
    <Suspense fallback={loadingSpinner}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/hero" element={<AdminDashboard><AdminHero /></AdminDashboard>} />
        <Route path="/admin/services" element={<AdminDashboard><AdminServices /></AdminDashboard>} />
        <Route path="/admin/portfolio" element={<AdminDashboard><AdminPortfolio /></AdminDashboard>} />
        <Route path="/admin/pricing" element={<AdminDashboard><AdminPricing /></AdminDashboard>} />
        <Route path="/admin/testimonials" catch={<AdminDashboard><AdminTestimonials /></AdminDashboard>} element={<AdminDashboard><AdminTestimonials /></AdminDashboard>} />
        <Route path="/admin/faq" element={<AdminDashboard><AdminFAQ /></AdminDashboard>} />
        <Route path="/admin/blog" element={<AdminDashboard><AdminBlog /></AdminDashboard>} />
        <Route path="/admin/authors" element={<AdminDashboard><AdminAuthors /></AdminDashboard>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <ScrollToTop />
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
