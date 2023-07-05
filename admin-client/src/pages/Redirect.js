import useAuthRedirect from "../hooks/useAuthRedirect";

const Redirect = (props) => {
  useAuthRedirect();

  return <div className="Redirect">Redirect page</div>;
};

export default Redirect;
