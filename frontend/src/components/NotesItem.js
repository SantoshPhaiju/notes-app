import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NotesItem = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="itemContainer my-4">
        <div className="items rounded-md border-2 bg-gray-200 overflow-hidden">
          <div
            className="header mt-0 flex justify-between items-center bg-gray-200 text-gray-800 py-2 px-6 text-lg rounded-t-md z-10 cursor-pointer"
            onClick={() => {
              setShow(!show);
            }}
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

          <AnimatePresence>
            <>
              {show && (
                <motion.div
                  animate={{ opacity: 1, y: "0px" }}
                  transition={{ duration: 1 }}
                  className="body py-4 px-8 bg-slate-50 shadow-sm"
                >

                  <div className="description">
                  <span class="bg-orange-400 text-white text-sm font-semibold mr-2 px-4 py-1 rounded dark:bg-orange-400 dark:text-white">Category - Something</span>
                  <p className="mt-2 mb-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ab illo vel. Fugiat rem repudiandae ut ad dolores atque laborum architecto delectus sint eveniet, cupiditate nulla aut voluptas! Officiis, eligendi.
                  </p>
                  </div>
                  <blockquote className="text-gray-400 mt-3 font-sans italic">
                    - Created On -date
                  </blockquote>
                </motion.div>
              )}
            </>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default NotesItem;
