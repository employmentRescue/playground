import { AppContext } from "./App";

const ContextSample = () => {
  return (
    <AppContext.Consumer>
      {(user) => (
        <>
          <h3>Appcontext에 존재하는 name : {user.name}</h3>
          <h3>Appcontext에 존재하는 job : {user.job}</h3>
        </>
      )}
    </AppContext.Consumer>
  )
};

export default ContextSample;