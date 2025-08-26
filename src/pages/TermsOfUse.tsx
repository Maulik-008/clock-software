import React from "react";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground";
import Footer from "../components/Footer";

const TermsOfUse = () => {
  return (
    <>
      <SEO
        title="Terms of Use | StudyClock.com"
        description="Our terms of use outline the rules, guidelines, and legal terms that govern your use of StudyClock.com's productivity timer application."
        keywords="terms of use, terms of service, user agreement, legal terms, studyclock terms, usage policy"
        canonicalUrl="https://studyclock.com/terms-of-use"
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
              Terms of Use
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
                  Agreement to Terms
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  These Terms of Use constitute a legally binding agreement made
                  between you, whether personally or on behalf of an entity
                  ("you") and StudyClock.com ("we," "us," or "our"), concerning
                  your access to and use of the StudyClock.com website and
                  productivity timer application.
                </p>
                <p className="text-gray-300 leading-relaxed mt-3">
                  By accessing or using StudyClock.com, you agree to be bound by
                  these Terms of Use. If you disagree with any part of these
                  Terms of Use, you may not access the website or use our
                  services.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Intellectual Property Rights
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Unless otherwise indicated, the StudyClock.com website and all
                  its content, features, and functionality (including but not
                  limited to all information, software, text, displays, images,
                  video, and audio, and the design, selection, and arrangement
                  thereof) are owned by us, our licensors, or other providers of
                  such material and are protected by copyright, trademark,
                  patent, trade secret, and other intellectual property or
                  proprietary rights laws.
                </p>
                <p className="text-gray-300 leading-relaxed mt-3">
                  You may not reproduce, distribute, modify, create derivative
                  works of, publicly display, publicly perform, republish,
                  download, store, or transmit any of the material on our
                  website, except as follows:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mt-2">
                  <li>
                    Your computer may temporarily store copies of such materials
                    in RAM incidental to your accessing and viewing those
                    materials.
                  </li>
                  <li>
                    You may store files that are automatically cached by your
                    Web browser for display enhancement purposes.
                  </li>
                  <li>
                    You may print or download one copy of a reasonable number of
                    pages of the website for your own personal, non-commercial
                    use and not for further reproduction, publication, or
                    distribution.
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Prohibited Uses
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  You may use StudyClock.com only for lawful purposes and in
                  accordance with these Terms of Use. You agree not to use
                  StudyClock.com:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mt-2">
                  <li>
                    In any way that violates any applicable federal, state,
                    local, or international law or regulation.
                  </li>
                  <li>
                    To transmit, or procure the sending of, any advertising or
                    promotional material, including any "junk mail," "chain
                    letter," "spam," or any other similar solicitation.
                  </li>
                  <li>
                    To impersonate or attempt to impersonate us, our employees,
                    another user, or any other person or entity.
                  </li>
                  <li>
                    To engage in any other conduct that restricts or inhibits
                    anyone's use or enjoyment of the website, or which may harm
                    us or users of the website or expose them to liability.
                  </li>
                </ul>

                <p className="text-gray-300 leading-relaxed mt-4">
                  Additionally, you agree not to:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mt-2">
                  <li>
                    Use any robot, spider, or other automatic device, process,
                    or means to access StudyClock.com for any purpose, including
                    monitoring or copying any of the material on the website.
                  </li>
                  <li>
                    Use any manual process to monitor or copy any of the
                    material on StudyClock.com or for any other unauthorized
                    purpose without our prior written consent.
                  </li>
                  <li>
                    Use any device, software, or routine that interferes with
                    the proper working of StudyClock.com.
                  </li>
                  <li>
                    Introduce any viruses, Trojan horses, worms, logic bombs, or
                    other material that is malicious or technologically harmful.
                  </li>
                  <li>
                    Attempt to gain unauthorized access to, interfere with,
                    damage, or disrupt any parts of StudyClock.com, the server
                    on which it is stored, or any server, computer, or database
                    connected to it.
                  </li>
                  <li>
                    Attack StudyClock.com via a denial-of-service attack or a
                    distributed denial-of-service attack.
                  </li>
                  <li>
                    Otherwise attempt to interfere with the proper working of
                    StudyClock.com.
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  User Contributions
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  StudyClock.com may contain feedback forms, email functions, or
                  other interactive features (collectively, "Interactive
                  Services") that allow users to post, submit, publish, display,
                  or transmit content or materials (collectively, "User
                  Contributions") on or through the website.
                </p>
                <p className="text-gray-300 leading-relaxed mt-3">
                  All User Contributions must comply with the Content Standards
                  set out in these Terms of Use. Any User Contribution you post
                  to the site will be considered non-confidential and
                  non-proprietary. By providing any User Contribution on
                  StudyClock.com, you grant us and our affiliates and service
                  providers, and each of their and our respective licensees,
                  successors, and assigns the right to use, reproduce, modify,
                  perform, display, distribute, and otherwise disclose to third
                  parties any such material.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Content Standards
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  These content standards apply to any and all User
                  Contributions. User Contributions must in their entirety
                  comply with all applicable federal, state, local, and
                  international laws and regulations.
                </p>
                <p className="text-gray-300 leading-relaxed mt-3">
                  Without limiting the foregoing, User Contributions must not:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mt-2">
                  <li>
                    Contain any material that is defamatory, obscene, indecent,
                    abusive, offensive, harassing, violent, hateful,
                    inflammatory, or otherwise objectionable.
                  </li>
                  <li>
                    Promote sexually explicit or pornographic material,
                    violence, or discrimination based on race, sex, religion,
                    nationality, disability, sexual orientation, or age.
                  </li>
                  <li>
                    Infringe any patent, trademark, trade secret, copyright, or
                    other intellectual property or other rights of any other
                    person.
                  </li>
                  <li>
                    Violate the legal rights (including the rights of publicity
                    and privacy) of others or contain any material that could
                    give rise to any civil or criminal liability under
                    applicable laws or regulations.
                  </li>
                  <li>Be likely to deceive any person.</li>
                  <li>
                    Promote any illegal activity, or advocate, promote, or
                    assist any unlawful act.
                  </li>
                  <li>
                    Cause annoyance, inconvenience, or needless anxiety or be
                    likely to upset, embarrass, alarm, or annoy any other
                    person.
                  </li>
                  <li>
                    Impersonate any person, or misrepresent your identity or
                    affiliation with any person or organization.
                  </li>
                  <li>
                    Involve commercial activities or sales, such as contests,
                    sweepstakes, and other sales promotions, barter, or
                    advertising.
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Reliance on Information Posted
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  The information presented on or through StudyClock.com is made
                  available solely for general information purposes. We do not
                  warrant the accuracy, completeness, or usefulness of this
                  information. Any reliance you place on such information is
                  strictly at your own risk. We disclaim all liability and
                  responsibility arising from any reliance placed on such
                  materials by you or any other visitor to StudyClock.com, or by
                  anyone who may be informed of any of its contents.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Changes to the Terms of Use
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  We may revise and update these Terms of Use from time to time
                  at our sole discretion. All changes are effective immediately
                  when we post them, and apply to all access to and use of the
                  website thereafter.
                </p>
                <p className="text-gray-300 leading-relaxed mt-3">
                  Your continued use of StudyClock.com following the posting of
                  revised Terms of Use means that you accept and agree to the
                  changes. You are expected to check this page frequently so you
                  are aware of any changes, as they are binding on you.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Disclaimer of Warranties
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  You understand that we cannot and do not guarantee or warrant
                  that files available for downloading from the internet or the
                  website will be free of viruses or other destructive code. You
                  are responsible for implementing sufficient procedures and
                  checkpoints to satisfy your particular requirements for
                  anti-virus protection and accuracy of data input and output,
                  and for maintaining a means external to our site for any
                  reconstruction of any lost data.
                </p>
                <p className="text-gray-300 leading-relaxed mt-3">
                  TO THE FULLEST EXTENT PROVIDED BY LAW, WE WILL NOT BE LIABLE
                  FOR ANY LOSS OR DAMAGE CAUSED BY A DISTRIBUTED
                  DENIAL-OF-SERVICE ATTACK, VIRUSES, OR OTHER TECHNOLOGICALLY
                  HARMFUL MATERIAL THAT MAY INFECT YOUR COMPUTER EQUIPMENT,
                  COMPUTER PROGRAMS, DATA, OR OTHER PROPRIETARY MATERIAL DUE TO
                  YOUR USE OF THE WEBSITE OR ANY SERVICES OR ITEMS OBTAINED
                  THROUGH THE WEBSITE OR TO YOUR DOWNLOADING OF ANY MATERIAL
                  POSTED ON IT, OR ON ANY WEBSITE LINKED TO IT.
                </p>
                <p className="text-gray-300 leading-relaxed mt-3">
                  YOUR USE OF THE WEBSITE, ITS CONTENT, AND ANY SERVICES OR
                  ITEMS OBTAINED THROUGH THE WEBSITE IS AT YOUR OWN RISK. THE
                  WEBSITE, ITS CONTENT, AND ANY SERVICES OR ITEMS OBTAINED
                  THROUGH THE WEBSITE ARE PROVIDED ON AN "AS IS" AND "AS
                  AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER
                  EXPRESS OR IMPLIED.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Limitation on Liability
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL WE,
                  OUR AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS,
                  EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR
                  DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR
                  IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE WEBSITE,
                  ANY WEBSITES LINKED TO IT, ANY CONTENT ON THE WEBSITE OR SUCH
                  OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL,
                  INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Contact Information
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  If you have any questions about these Terms of Use, please
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

export default TermsOfUse;
