import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './StartPage.css';

const StartPage = () => {

  const history = useHistory();

  const goSignUpPage = () => {
    history.push("/signUp")
  };

  return (
    <div className="start-container">
      <img src={require(`./Png/Picture1.png`)} alt="" />
      <div className="start">
        <img id="bird" src={require(`./Png/bluebird.png`)} alt="" />
        <h1>Happening now</h1>
        <h2>Join Twitter today</h2>
        <button className="button">
          <img id="button-img" src={require(`./Png/google.png`)} alt="" />Sign up with Google </button>
        <button className="button">
          <img id="button-img" src={require(`./Png/apple.png`)} alt="" />Sign up with Apple</button>
        <button onClick={goSignUpPage}>Sign up with phone or email </button>
        <div className="agree">
          <span>By singing up you agree to the </span>
          <a href="/login">Terms of Service</a>
          <span> and </span>
          <a href="/login">Privacy Policy</a>
          <span> including </span>
          <a href="/login">Cookie Use.</a>
        </div>
        <div id="gologin">
          <span>Already have an account?</span>
          <a href="/login"> Log in</a>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
