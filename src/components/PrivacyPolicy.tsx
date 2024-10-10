import { useState } from "react";
import NavBar from "../common/NavBar";
import { Footer } from "./Footer";

export default function PrivacyPolicy() {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  return (
    <div
      className=""
      onClick={() => {
        if (isOpenMenu) {
          setIsOpenMenu(false);
        }
      }}
    >
      <NavBar isShowMenu={isOpenMenu} setIsShowMenu={setIsOpenMenu} />
      <section className="text-gray-600 body-font py-24">
        <div className="container mx-auto">
          <div className="flex flex-wrap-m-4">
            <div className="p-4">
              <div className="h-full bg-gray-100 p-8 rounded w-[100%]">
                <div className="mx-auto text-center sm:text-start">
                  <h1 className="text-3xl font-medium title-font mb-4 text-gray-900">
                    Privacy Policy Agreement
                  </h1>
                  <p className="leading-relaxed text-base w-1/2">
                    At SaveConnects, we value your privacy and are committed to
                    protecting your personal information. This Privacy Policy
                    outlines how we collect, use, and safeguard your data when
                    you interact with our platform.
                  </p>
                </div>
                <h1 className="text-2xl font-medium text-gray-900 title-font mb-4 mt-5">
                  What Information Do We Collect?
                </h1>
                <p className="leading-relaxed mb-6 w-1/2">
                  <strong>1. Personal Information:</strong> When you create an
                  account or make a purchase, we may collect your name, email
                  address, shipping address, and payment details to provide you
                  with our services.
                </p>
                <p className="leading-relaxed mb-6 w-1/2">
                  <strong>2. Browsing Data:</strong> We may collect information
                  about your browsing behavior on our website to improve our
                  product recommendations and enhance your shopping experience.
                </p>
                <p className="leading-relaxed mb-6 w-1/2">
                  <strong>3. Cookies and Tracking:</strong> We use cookies and
                  tracking technologies to gather data about your interactions
                  with our website, such as pages visited and products viewed.
                  This information helps us tailor our offerings to your
                  preferences and interests.
                </p>
                <p className="leading-relaxed mb-6 w-1/2">
                  <strong>4. Third-Party Services:</strong> Some popular
                  third-party services may require us to post Privacy Policy
                  agreements on our website to comply with their policies and
                  regulations.
                </p>
                <h1 className="text-2xl font-medium text-gray-900 title-font mb-4">
                  Questions, comments, or report of incidents
                </h1>
                <p className="leading-relaxed mb-6 w-1/2">
                  You may direct questions, comments or reports to:
                  <a
                    href="mailto:LYRAadmin@gmail.com"
                    className="text-naviblue ms-5"
                  >
                    saveconnectsadmin@gmail.com
                  </a>
                </p>
                <h1 className="text-2xl font-medium text-gray-900 title-font mb-4">
                  Revisions to this privacy policy without notice
                </h1>
                <p>
                  This Privacy Policy is dynamic. It will continually change.
                  You may not assume that it remains the same and you agree to
                  check the policy each time you visit the site for changes.
                  Unless, in the sole opinion of the website, this policy
                  changes so drastically as to suggest a posted notification on
                  the site or via email, you will receive no notification of
                  changes to this Privacy Policy nor, under any circumstances,
                  does this site promise notification. Your continued use of
                  this site always evidences your acceptance of the terms this
                  Privacy Policy or any modifications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
