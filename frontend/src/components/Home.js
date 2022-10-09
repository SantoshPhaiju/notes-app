import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchNotes } from "../features/notes/notesSlice";
import Notes from "./Notes";
import NotesItem from "./NotesItem";

const Home = () => {
  const notes = useSelector((state) => state.notes.notes);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      dispatch(fetchNotes());
      console.log(notes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="w-[75%] mx-auto">
      <h1 className="text-3xl my-4 font-sans text-purple-900 font-semibold text-center">
        Welcome Back&nbsp;
        {userData && capitalize(userData.data.username)}
      </h1>
      <hr className="mb-6" />
      <Notes />
      {notes.length !== 0 ? (
        notes.map((note) => {
          return <NotesItem key={note._id} data={note} />;
        })
      ) : (
        <p className="text-black text-center my-4">No Notes to Display here</p>
      )}
    </div>
  );
};

export default Home;
