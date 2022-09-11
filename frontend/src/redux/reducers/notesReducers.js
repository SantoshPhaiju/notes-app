export const getNotesReducer = (state = [], action) => {
  switch (action.type) {
    case "NOTES_REQUEST":
      return state;
    case "NOTES_SUCCESS":
      return action.payload.data;
    case "NOTES_FAIL":
      return { loading: false, data: action.payload };
    default:
      return state;
  }
};

export const addNoteReducer = (state = { notes: [] }, action) => {
  switch (action.type) {
    case "ADD_NOTE_REQUEST":
      return { loading: true };
    case "ADD_NOTE_SUCCESS":
      return {
        notes: [
          ...state.notes,
          {
            data: action.payload.data
          },
        ],
      };
    //   return [action.payload, ...state]
    case "ADD_NOTE_FAIL":
      return { loading: false, data: action.payload };
    default:
      return state;
  }
};
