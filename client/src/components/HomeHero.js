import { Link } from "react-router-dom";
const HomeHero = (params) => {
  //get bgColor from parent component
  const bgColor = params.bgColor;
  return (
    <>
      <section
        className="bg-blue"
        ref={(el) => {
          if (el) {
            el.style.setProperty("background-color", bgColor, "important");
          }
        }}
        style={{ overflow: "hidden" }}
      >
        <div
          className="swiper-container text-white"
          data-top-top="transform: translateY(0px);"
          data-top-bottom="transform: translateY(250px);"
        >
          <div className="mt-10">
            <div className="container">
              <div className="row">
                <div className="col-md-12 align-self-center text-center">
                  <h1 className="display-2">
                    <b>Smart Cube</b> a revolution in irrigation control
                  </h1>
                  <span className="p-1">
                    <Link
                      to="/signup"
                      className="btn btn-white btn-lg btn-rounded px-5"
                    >
                      Sign Up
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeHero;
