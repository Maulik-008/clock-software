import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEO from "../components/SEO";
import PageLayout from "../components/PageLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="Page Not Found | Study Timer App"
        description="The page you're looking for could not be found. Return to our Study Timer app to boost your productivity with beautiful dark mode timers."
        keywords="404, page not found, error page, study timer, pomodoro"
        canonicalUrl="https://studyclock.com/404"
        noIndex={true}
      />
      <PageLayout className="flex items-center justify-center text-white">
        <div className="text-center max-w-md px-4">
          <h1 className="text-6xl font-bold mb-6 text-cyan-400">404</h1>
          <p className="text-xl text-gray-300 mb-6">
            Oops! The page you're looking for couldn't be found.
          </p>
          <p className="text-gray-400 mb-8">
            Return to our Study Timer app to track your productivity with
            beautiful dark mode timers.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
          >
            Back to Study Timer
          </a>
          <div className="mt-8 text-gray-500 text-sm">
            <p>
              Looking for a productivity timer? Our clock timer and countdown
              timer app helps you stay focused and productive.
            </p>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default NotFound;
