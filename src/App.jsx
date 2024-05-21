import "./App.css";
import { Home } from "./pages/Home/Home";
import { Navbar } from "./pages/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import { ProjectDetails } from "./pages/ProjectDetails/ProjectDetails";
import { IssueDetails } from "./pages/IssueDetails/IssueDetails";
import Subscription from "./pages/Susbcription/Subscription";
import Auth from "./pages/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./Redux/Auth/Action";
import { store } from "./Redux/Store";
import { fetchProjects } from "./Redux/Project/Action";
import UpgradeSuccess from "./pages/Susbcription/UpgradeSuccess";
import AcceptInviation from "./pages/Project/AcceptInviation";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchProjects({}));
  }, [auth.jwt]);
  console.log(auth);
  return (
    <>
      {auth.user === null ? (
        <Auth></Auth>
      ) : (
        <div>
          <Navbar></Navbar>

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/project/:id" element={<ProjectDetails />}></Route>
            <Route
              path="/project/:projectId/issue/:issueId"
              element={<IssueDetails />}
            ></Route>
            <Route path="/upgrade_plan" element={<Subscription />}></Route>
            <Route
              path="/upgrade_plan/success"
              element={<UpgradeSuccess />}
            ></Route>
            <Route
              path="/accept_invitation"
              element={<AcceptInviation />}
            ></Route>
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
