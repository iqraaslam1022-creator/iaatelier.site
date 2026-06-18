const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  const loadingSpinner = (
    <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: "#FAFAF8" }}>
      <div className="w-7 h-7 border-2 border-[#B8972E]/20 border-t-[#B8972E] rounded-full animate-spin"></div>
    </div>
  );

  if (isLoadingPublicSettings) return loadingSpinner;

  // Admin routes ke liye auth check
  const isAdminRoute = window.location.pathname.startsWith('/admin');
  if (isAdminRoute) {
    if (isLoadingAuth) return loadingSpinner;
    if (authError?.type === 'user_not_registered') return <UserNotRegisteredError />;
    if (authError?.type === 'auth_required') { navigateToLogin(); return null; }
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Admin routes */}
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
