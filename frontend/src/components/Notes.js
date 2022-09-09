import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Notes = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="addBtn">
        <button
          onClick={() => {
            setShow(!show);
            document.body.setAttribute("style", "overflow: hidden");
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-56"
        >
          Create Note
        </button>
      </div>

      <AnimatePresence>
        {show && (
          <div className="flex justify-center">
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 100, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, duration: 3 }}
              className="addNote mx-auto absolute border-none top-10 z-20 shadow-lg shadow-indigo-900/50 w-[600px] mt-10 text-purple-600 bg-white font-mono border-2 rounded-md left-auto right-auto"
            >
              <div className="modal ">
                <h1 className="text-2xl text-center my-2">Add Note</h1>
                <form className="w-[70%] mx-auto">
                  <div className="mb-6">
                    <label htmlFor="title">
                      <input
                        className="shadow focus:shadow py-2 text-purple-600 px-4 font-serif text-lg w-[100%] border-2 rounded-md focus:outline-none focus:border-2 focus:border-blue-900"
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        required
                        min={2}
                      />
                    </label>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="category">
                      <input
                        className="shadow focus:shadow py-2 text-purple-600 px-4 font-serif text-lg w-[100%] border-2 rounded-md focus:outline-none focus:border-2 focus:border-blue-900"
                        type="text"
                        id="category"
                        name="category"
                        placeholder="Category"
                        required
                      />
                    </label>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="category">
                      <textarea
                        className="shadow focus:shadow py-2 text-purple-600 px-4 font-serif text-lg w-[100%] border-2 rounded-md focus:outline-none focus:border-2 focus:border-blue-900"
                        type="desc"
                        id="desc"
                        name="desc"
                        placeholder="Description"
                        required
                      />
                    </label>
                  </div>

                  <div className="buttons mb-6 flex justify-center space-x-8">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-56"
                      type="submit"
                    >
                      Add Note
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-56"
                      onClick={() => {
                        setShow(!show);
                        document.body.removeAttribute(
                          "style"
                        );
                      }}
                      type="button"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {show && (
        <div className="overlay bg-black opacity-40 h-[100%] z-10 w-[100%] absolute inset-0"></div>
      )}
    </>
  );
};

export default Notes;
