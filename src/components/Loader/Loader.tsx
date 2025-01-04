import css from "./Loader.module.css";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loader: React.FC = () => {
  return (
    <div className={css.loaderContainer}>
      <div className={css.loader}>
        <DotLottieReact
          src="https://lottie.host/21608559-7178-45c9-84db-d1c0ad2b349b/PYvKQAnybP.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
};

export default Loader;
