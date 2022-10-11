import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchNotes } from "../features/notes/notesSlice";
import Notes from "./Notes";
import NotesItem from "./NotesItem";

const Home = () => {
  const notes = useSelector((state) => state.notes.notes);
  const noteStatus = useSelector((state) => state.notes.status)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      dispatch(fetchNotes());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const orderedNotes = notes
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const userData = JSON.parse(localStorage.getItem("userData"));
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  let content = "";
  if(noteStatus === 'loading'){
    content = <h1 className="text-center text-3xl font-bold font-mono text-blue-700">Loading......</h1>;
  }else if(noteStatus === 'succeded'){
    if(orderedNotes.length !== 0){
      content = orderedNotes.map((note) => {
        return <NotesItem key={note._id} data={note} />;
      })
    }else{
      content = <p className="text-black text-3xl text-center my-4">No Notes to Display here</p>
    }
  }

  return (
    <div className="w-[75%] mx-auto">
      <h1 className="text-3xl my-4 font-sans text-purple-900 font-semibold text-center">
        Welcome Back&nbsp;
        {userData && capitalize(userData.data.username)}
      </h1>
      <hr className="mb-6" />
      <Notes />
      {content}
    </div>
  );
};

export default Home;
