/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";

/**
 * wrapper serves for providing hooks data to class based components
 * mainly used for routing purpose
 * It is a functional component
 */

export default function HooksWrapper({ IncomingComponent }) {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  return (
    <IncomingComponent
      location={location}
      navigate={navigate}
      params={params}
      dispatch={dispatch}
    />
  );
}
