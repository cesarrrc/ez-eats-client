import LottieControl from "../../components/lottie/lottie";
import construction from "../../lib/lottie/construction.json";

type Props = {};

const About = (props: Props) => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Currently Under Construction</h1>
      <LottieControl lottie={construction}></LottieControl>
      <p style={{ textAlign: "center" }}>Please check back later.</p>
    </div>
  );
};

export default About;
