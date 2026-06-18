import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPostPage from './pages/BlogPost';
import Contact from './pages/Contact';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHero from './pages/admin/AdminHero';
import AdminServices from './pages/admin/AdminServices';
import AdminPortfolio from './pages/admin/AdminPortfolio';
import AdminPricing from './pages/admin/AdminPricing';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminFAQ from './pages/admin/AdminFAQ';
import AdminBlog from './pages/admin/AdminBlog';
import AdminAuthors from './pages/admin/AdminAuthors';
import { LanguageProvider } from './lib/LanguageContext';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();
  const location = useLocation();
  const loadingSpinner = (
    <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: "#FAFAF8" }}>
      <div className="w-7 h-7 border-2 border-[#B8972E]/20 border-t-[#B8972E] rounded-full animate-spin"></div>
    </div>
  );
  if (isLoadingPublicSettings) return loadingSpinner;
  const isAdminRoute = location.pathname.startsWith('/admin');
  if (isAdminRoute) {
    if (isLoadingAuth) return loadingSpinner;
    if (authError?.type === 'user_not_registered') return <UserNotRegisteredError />;
    if (authError?.type === 'auth_required') { navigateToLogin(); return null; }
  }
  return (
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
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/hero" element={<AdminDashboard><AdminHero /></AdminDashboard>} />
      <Route path="/admin/services" element={<AdminDashboard><AdminServices /></AdminDashboard>} />
      <Route path="/admin/portfolio" element={<AdminDashboard><AdminPortfolio /></AdminDashboard>} />
      <Route path="/admin/pricing" element={<AdminDashboard><AdminPricing /></AdminDashboard>} />
      <Route path="/admin/testimonials" element={<AdminDashboard><AdminTestimonials /></AdminDashboard>} />
      <Route path="/admin/faq" element={<AdminDashboard><AdminFAQ /></AdminDashboard>} />
      <Route path="/admin/blog" element={<AdminDashboard><AdminBlog /></AdminDashboard>} />
      <Route path="/admin/authors" element={<AdminDashboard><AdminAuthors /></AdminDashboard>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
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
  
