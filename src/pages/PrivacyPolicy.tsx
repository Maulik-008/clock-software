import React from "react";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy | StudyClock.com"
        description="Our privacy policy outlines how StudyClock.com collects, uses, and protects your information when you use our productivity timer application."
        keywords="privacy policy, studyclock privacy, data protection, user privacy, cookie policy, GDPR"
        canonicalUrl="https://studyclock.com/privacy-policy"
      />
      <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <ParticleBackground />

        <main className="relative z-10 min-h-screen flex flex-col items-center justify-start pt-12 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-4xl mx-auto bg-black/60 backdrop-blur-xl p-6 sm:p-8 rounded-xl border border-gray-800 shadow-xl">
            <div className="mb-6">
              <Link
                to="/"
                className="text-cyan-400 hover:text-cyan-300 flex items-center transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to StudyClock
              </Link>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-6">
              Privacy Policy
            </h1>

            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-gray-300 leading-relaxed">
                Last Updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <div className="mb-8 mt-6">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Introduction
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  At StudyClock.com, we respect your privacy and are committed
                  to protecting your personal data. This Privacy Policy explains
                  how we collect, use, disclose, and safeguard your information
                  when you visit our website and use our productivity timer
                  application.
                </p>
                <p className="text-gray-300 leading-relaxed mt-3">
                  Please read this Privacy Policy carefully. If you do not agree
                  with the terms of this Privacy Policy, please do not access
                  the site.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Information We Collect
                </h2>

                <h3 className="text-xl font-medium text-white mt-4 mb-2">
                  Information You Provide to Us
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  We may collect information that you provide directly to us
                  when you:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mt-2">
                  <li>Submit feedback or contact us via email</li>
                  <li>Respond to surveys or questionnaires</li>
                  <li>Use our feedback form</li>
                </ul>

                <h3 className="text-xl font-medium text-white mt-4 mb-2">
                  Information We Collect Automatically
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  When you access our website, we may automatically collect
                  certain information about your device and usage, including:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mt-2">
                  <li>
                    Device information (browser type, operating system, device
                    type)
                  </li>
                  <li>IP address</li>
                  <li>Pages visited and features used</li>
                  <li>Time spent on the site</li>
                  <li>Referring website or application</li>
                </ul>

                <h3 className="text-xl font-medium text-white mt-4 mb-2">
                  Cookies and Similar Technologies
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  We use cookies and similar tracking technologies to collect
                  information about your browsing activities. These technologies
                  help us analyze website traffic, customize content, and
                  improve your experience.
                </p>
                <p className="text-gray-300 leading-relaxed mt-2">
                  The types of cookies we use include:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mt-2">
                  <li>
                    <span className="font-medium">Essential cookies:</span>{" "}
                    Required for the website to function properly
                  </li>
                  <li>
                    <span className="font-medium">
                      Analytical/performance cookies:
                    </span>{" "}
                    Allow us to recognize and count visitors and analyze how
                    users navigate our site
                  </li>
                  <li>
                    <span className="font-medium">Functionality cookies:</span>{" "}
                    Enable us to personalize content for you
                  </li>
                  <li>
                    <span className="font-medium">Targeting cookies:</span>{" "}
                    Record your visit to our website, the pages you visit, and
                    the links you follow to deliver more relevant advertisements
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  How We Use Your Information
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  We use the information we collect for various purposes,
                  including to:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mt-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Understand how users interact with our website</li>
                  <li>Detect, prevent, and address technical issues</li>
                  <li>Monitor and analyze usage patterns and trends</li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Develop new features and services</li>
                  <li>Personalize your experience</li>
                  <li>Send you technical notices and updates</li>
                  <li>Display advertisements</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Advertising
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  We use Google AdSense to serve advertisements on our website.
                  Google AdSense may use cookies, web beacons, and similar
                  technologies to collect information about your activities on
                  our site and other websites to provide you with targeted
                  advertising based on your browsing activities and interests.
                </p>
                <p className="text-gray-300 leading-relaxed mt-3">
                  Google's use of advertising cookies enables it and its
                  partners to serve ads to our users based on their visit to our
                  site and/or other sites on the Internet. You may opt out of
                  personalized advertising by visiting{" "}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Google Ads Settings
                  </a>
                  .
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Data Sharing and Disclosure
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  We may share your information in the following situations:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mt-2">
                  <li>
                    <span className="font-medium">
                      Third-Party Service Providers:
                    </span>{" "}
                    We may share your information with third-party vendors,
                    service providers, and other partners who help us provide
                    our services (such as analytics providers, advertising
                    partners, and customer service support).
                  </li>
                  <li>
                    <span className="font-medium">Legal Requirements:</span> We
                    may disclose your information if required to do so by law or
                    in response to valid requests by public authorities.
                  </li>
                  <li>
                    <span className="font-medium">Business Transfers:</span> If
                    we are involved in a merger, acquisition, or sale of all or
                    a portion of our assets, your information may be transferred
                    as part of that transaction.
                  </li>
                  <li>
                    <span className="font-medium">With Your Consent:</span> We
                    may share your information with your consent or as otherwise
                    disclosed at the time of data collection or sharing.
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Data Security
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  We implement appropriate technical and organizational measures
                  to protect the security of your personal information. However,
                  please be aware that no method of transmission over the
                  Internet or electronic storage is 100% secure, and we cannot
                  guarantee the absolute security of your data.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Your Privacy Rights
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Depending on your location, you may have certain rights
                  regarding your personal information, including:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mt-2">
                  <li>
                    The right to access personal information we hold about you
                  </li>
                  <li>The right to request correction of inaccurate data</li>
                  <li>The right to request deletion of your data</li>
                  <li>
                    The right to restrict or object to our processing of your
                    data
                  </li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent</li>
                </ul>
                <p className="text-gray-300 leading-relaxed mt-3">
                  To exercise these rights, please contact us using the
                  information provided in the "Contact Us" section below.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Children's Privacy
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Our website is not intended for children under the age of 13.
                  We do not knowingly collect personal information from children
                  under 13. If you are a parent or guardian and believe that
                  your child has provided us with personal information, please
                  contact us so that we can delete such information.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Changes to This Privacy Policy
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  We may update our Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last Updated" date. You are
                  advised to review this Privacy Policy periodically for any
                  changes.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Contact Us
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  If you have any questions about this Privacy Policy, please
                  contact us at:
                </p>
                <p className="text-gray-300 leading-relaxed mt-3">
                  <a
                    href="mailto:mb.dev08@gmail.com"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    mb.dev08@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
