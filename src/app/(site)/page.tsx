import Header from "../components/header/page";
import MainPage from "../components/main/page";
import SignUp from "../components/signup/page";

export default function Home() {
    return (
      <div className="m-5">
        <Header/>
        <SignUp/>
        <MainPage/>
      </div>
    )
  }
  