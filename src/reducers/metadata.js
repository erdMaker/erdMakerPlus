const initialState = {
  title: "New Diagram"
};



const metaReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TITLE":
      return {
        ...state,
        title: action.payload.title,
      };
    case "SET_HELP_MODAL":
      return{
        ...state,
        modal: window.innerWidth <= 768 ? false : action.payload.modal
      }
    case "SET_META":
      return action.payload;
    case "RESET_META":
      return initialState;
    default:
      return state;
  }
};

export default metaReducer;
