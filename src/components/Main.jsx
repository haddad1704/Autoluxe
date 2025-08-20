import React, { useEffect } from "react"; // Composant layout principal
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Route, Routes, Navigate } from "react-router-dom"; // Routage côté client
import Auth from "./Auth/Auth";
import Logout from "./Auth/Logout";
import { connect, useDispatch, useSelector } from "react-redux"; // Accès store redux
import Home from "./Home/Home";
import { authCheck, remove_auth_message } from "../redux/authActionCreators"; // Actions auth
import "react-toastify/dist/ReactToastify.css";
import Categories from "./Category/Categories";
import Vehicles from "./Vehicle/Vehicles";
import CarDetail from "./Store/CarDetail";
import AllBooked from "./Book/AllBooked";
import SeeBookedVehicle from "./Vehicle/SeeBookedVehicle";
import Payment from "./Payment/Payment";
// import toast, { Toaster } from "react-hot-toast";
// import { notificationTime } from "../redux/baseUrls";
import { ToastContainer, toast } from "react-toastify"; // Notifications
import "react-toastify/dist/ReactToastify.css";
  
const mapStateToProps = (state) => ({ // Mappe l'état global vers les props
  token: state.token,
  successMsg: state.successMsg,
  authCheckResponse: state.authCheckResponse,
});

const mapDispatchToProps = (dispatch) => ({ // Mappe les actions vers les props
  authCheck: () => dispatch(authCheck()),
});

const Main = ({ token, authCheck, successMsg }) => {
    const authFailedMsg = useSelector((state) => state.authFailedMsg);
    const authSuccessMsg = useSelector((state) => state.authSuccessMsg);
    const dispatch = useDispatch();

  useEffect(() => { // Vérifie la session au montage
    authCheck()
  }, [authCheck]);


  let routes = null;
  const notify = (message, type) => { // Aide à appeler les toasts
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "warning":
        toast.warning(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "info":
        toast.info(message);
        break;
      default:
        break;
    }
  };
  useEffect(() => { // Affiche et réinitialise les messages d'auth
    if (authSuccessMsg) {
      notify(authSuccessMsg, "info");
      dispatch(remove_auth_message());
    }
    if (authFailedMsg) {
      notify(authFailedMsg, "error");
      dispatch(remove_auth_message());
    }
  }, [authSuccessMsg, authFailedMsg, dispatch]);
  if (token) { // Utilisateur authentifié
    routes = (
      <Routes>
        <Route path="/" element={<Home notify={notify} />} />
        <Route path="/category" element={<Categories notify={notify} />} />
        <Route path="/vehicle" element={<Vehicles notify={notify} />} />
        <Route path="/car/:id" element={<CarDetail />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/all-booked" element={<AllBooked notify={notify} />} />
        <Route
          path="/see-all-booked"
          element={<SeeBookedVehicle notify={notify} />}
        />
        <Route path="/logout" element={<Logout notify={notify} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    // Utilisateur non authentifié
    routes = (
      <Routes>
        <Route path="/" element={<Home notify={notify} />} />
        <Route path="/car/:id" element={<CarDetail />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/signin" element={<Auth notify={notify} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <div>
      <Header notify={notify} /> {/* En-tête */}
      <ToastContainer /> {/* Container toasts */}
      
      {routes}
      <Footer /> {/* Pied de page */}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
