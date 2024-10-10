import React, { useState } from "react";
import NavBar from "../common/NavBar";
import BannerArea from "./BannerArea";
import CreateAccount from "./CreateAccount";
import TopFeature from "./TopFeature";
import { FeedBacks } from "./FeedBacks";
import { RegisterdUsers } from "./RegisterdUsers";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { HowItsWorks } from "./HowItsWorks";

const Landing: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  return (
    <div
      className="scroll-smooth"
      onClick={() => {
        if (isOpenMenu) {
          setIsOpenMenu(false);
        }
      }}
    >
      <NavBar isShowMenu={isOpenMenu} setIsShowMenu={setIsOpenMenu} />
      <BannerArea />
      <CreateAccount />
      <HowItsWorks />
      <TopFeature />
      <FeedBacks />
      <RegisterdUsers />
      <Contact />
      <Footer />
    </div>
  );
};

export default Landing;
