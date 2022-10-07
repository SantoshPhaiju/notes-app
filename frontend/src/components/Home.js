import Notes from "./Notes";

const Home = () => {
  

  return (
    <div className="w-[75%] mx-auto">
     
      <h1 className="text-3xl my-4 font-sans text-purple-900 font-semibold text-center">
        Welcome Back...
      </h1>
      <hr className="mb-6" />

      <Notes />
    </div>
  );
};

export default Home;
