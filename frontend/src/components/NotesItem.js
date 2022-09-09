import React, { useState } from "react";
import { motion } from "framer-motion";

const NotesItem = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="itemContainer my-4">
        <div
          className="items border-2 rounded-md bg-gray-200"
        >
          <div
            className="header mt-0 flex justify-between items-center bg-gray-200 text-gray-800 py-2 px-6 text-lg rounded-t-md"
            onClick={() => setShow(!show)}
          >
            <h2 className="text-lg">Title</h2>
            <div className="buttons flex space-x-5">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-6 rounded focus:outline-none focus:shadow-outline">
                Edit
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-6 rounded focus:outline-none focus:shadow-outline">
                Delete
              </button>
            </div>
          </div>

          {show && (
            <>
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.4 }}
                className="body py-4 px-8 bg-slate-50 shadow-sm"
              >
                <div className="description">body here</div>
                <blockquote className="text-gray-400 mt-3 font-sans italic">
                  - Someone famous
                </blockquote>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NotesItem;
