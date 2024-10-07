import React, { useState } from "react";
import NavBar from "../common/NavBar";

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
          <div className="flex flex-wrap -m-4">
            <div className="p-4">
              <div className="h-full bg-gray-100 p-8 rounded w-[100%]">
                <div className="mx-auto text-center sm:text-start">
                  <h1 className="text-3xl font-medium title-font mb-4 text-gray-900">
                    Privacy Policy
                  </h1>
                  <p className="leading-relaxed text-base w-1/2">
                    This Privacy Policy describes how your personal information
                    is collected, used, and shared when you visit or make a
                    purchase from www.saveconnects.com (the “Site”).
                  </p>
                </div>
                <h2 className="text-sm title-font text-gray-500 tracking-widest mt-24">
                  LAST UPDATED: 2021-09-01
                </h2>
                <h1 className="text-2xl font-medium text-gray-900 title-font mb-4">
                  What Information Do We Collect?
                </h1>
                <p className="leading-relaxed mb-6 w-1/2">
                  We collect information from you when you register on o ur site,
                  place an order, subscribe to our newsletter, respond to a
                  survey, fill out a form, Use Live Chat or enter information on
                  our site. We may also collect information about gift
                  recipients so that we can fulfill the gift purchase. The
                  information we collect may include your name, address, email
                  address, phone number, credit card information. You may,
                  however, visit our site anonymously.
                </p>
                <h1 className="text-2xl font-medium text-gray-900 title-font mb-4">
                  How Do We Use Your Information?
                </h1>
                <p className="leading-relaxed mb-6 w-1/2">
                  We may use the information we collect from you when you
                  register, make a purchase, sign up for our newsletter, respond
                  to a survey or marketing communication, surf the website, or
                  use certain other site features in the following ways:
                </p>
                <ul className="list-disc pl-5">
                  <li>
                    Personalize your experience and to allow us to deliver
                  </li>
                  <li>
                    the type of content and product offerings in which you are
                    most interested.
                  </li>
                  <li>Improve our website in order to better serve you.</li>
                  <li>
                    Allow us to better service you in responding to your
                    customer service requests.
                  </li>
                  <li>
                    Administer a contest, promotion, survey or other site
                    feature.
                  </li>
                  <li>Quickly process your transactions.</li>
                  <li>Ask for ratings and reviews of services or products</li>
                  <li>
                    Follow up with them after correspondence (live chat, email
                    or phone inquiries)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
