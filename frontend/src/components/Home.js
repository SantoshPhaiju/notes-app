import { useSelector } from "react-redux";
import Notes from "./Notes";
import NotesItem from "./NotesItem";

const Home = () => {
  const notes = useSelector(state => state.notes.notes)
  return (
    <div className="w-[75%] mx-auto">
      <h1 className="text-3xl my-4 font-sans text-purple-900 font-semibold text-center">
        Welcome Back...
      </h1>
      <hr className="mb-6" />
      <Notes />
      {notes.map((note) =>{
        return <NotesItem key={note._id} data={note} />
      })}
    </div>
  );
};

export default Home;
