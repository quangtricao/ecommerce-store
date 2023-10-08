import Logo from "../assets/img/logo.png";

const Intro = () => {
  return (
    <div>
      <h2>Introduction</h2>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quia, voluptate animi
          eligendi, praesentium suscipit cumque eius consectetur consequatur nulla fugit. Nemo ad
          sequi perferendis fuga dolor unde, vel repudiandae.0
        </div>
        <img src={Logo} alt="FIN-FS16" style={{ height: "300px" }} />
      </div>
    </div>
  );
};

export default Intro;
