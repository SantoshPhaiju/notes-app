import React, {  useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch,  } from "react-redux";
import { deleteNote, editNote } from "../features/notes/notesSlice";
import { useFormik } from "formik";
import { addNoteSchema } from "../schemas";
const NotesItem = (props) => {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const dbDate = props.data.createdAt;
  const date = new Date(dbDate);
  const createdAtDate = date.toLocaleDateString();
  const createdAtTime = date.toLocaleTimeString();

  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure want to delete this note") === true) {
      dispatch(deleteNote(props.data._id));
      setShow(false);
    } else {
      setShow(false);
    }
  };

  

  const updatedNoteData = {
    title: props.data.title,
    description: props.data.description,
    category: props.data.category,
  };

  const { handleBlur, handleSubmit, handleChange, errors, values, touched } =
    useFormik({
      initialValues: updatedNoteData,
      validationSchema: addNoteSchema,
      onSubmit: (values, action) => {
        setShowModal(false);
        console.log(values);
        document.body.removeAttribute("style");
        dispatch(editNote({
          id: props.data._id,
          title: values.title,
          category: values.category,
          description: values.description
        })).unwrap();
        action.resetForm();
      },
    });

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <div className="flex justify-center">
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 100, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, duration: 3 }}
              className="addNote mx-auto absolute border-none top-10 z-20 shadow-lg shadow-indigo-900/50 w-[600px] mt-10 text-purple-600 bg-white font-mono border-2 rounded-md left-auto right-auto"
            >
              <div className="modal ">
                <h1 className="text-2xl text-center my-2">Edit Note</h1>
                <form className="w-[70%] mx-auto" onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="title">
                      <input
                        className="shadow focus:shadow py-2 text-purple-600 px-4 font-serif text-lg w-[100%] border-2 rounded-md focus:outline-none focus:border-2 focus:border-blue-900"
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        min={3}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.title}
                        required
                      />
                    </label>
                    {errors.title && touched.title ? (
                      <p className="text-red-500 text-xs italic">
                        {errors.title}
                      </p>
                    ) : null}
                  </div>
                  <div className="mb-6">
                    <label htmlFor="category">
                      <input
                        className="shadow focus:shadow py-2 text-purple-600 px-4 font-serif text-lg w-[100%] border-2 rounded-md focus:outline-none focus:border-2 focus:border-blue-900"
                        type="text"
                        id="category"
                        name="category"
                        placeholder="Category"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.category}
                        required
                      />
                    </label>
                    {errors.category && touched.category ? (
                      <p className="text-red-500 text-xs italic">
                        {errors.category}
                      </p>
                    ) : null}
                  </div>
                  <div className="mb-6">
                    <label htmlFor="description">
                      <textarea
                        className="shadow focus:shadow py-2 text-purple-600 px-4 font-serif text-lg w-[100%] border-2 rounded-md focus:outline-none focus:border-2 focus:border-blue-900"
                        id="description"
                        name="description"
                        placeholder="Description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.description}
                        required
                      />
                    </label>
                    {errors.description && touched.description ? (
                      <p className="text-red-500 text-xs italic">
                        {errors.description}
                      </p>
                    ) : null}
                  </div>

                  <div className="buttons mb-6 flex justify-center space-x-8">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-56"
                      type="submit"
                    >
                      Edit Note
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-56"
                      onClick={() => {
                        setShowModal(false);
                        document.body.removeAttribute("style");
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

      <div className="itemContainer my-4">
        <div className="items rounded-md border-2 bg-gray-200 overflow-hidden">
          <div
            className="header mt-0 flex justify-between items-center bg-gray-200 text-gray-800 py-2 px-6 text-lg rounded-t-md z-10 cursor-pointer"
            onClick={() => {
              setShow(!show);
            }}
          >
            <h2 className="text-lg">{props.data.title}</h2>
            <div
              className="buttons flex space-x-5"
              onClick={(e) => setShow(false)}
            >
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-6 rounded focus:outline-none focus:shadow-outline"
                onClick={(e) => {
                  setShowModal(true);
                  document.body.setAttribute("style", "overflow: hidden");
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-6 rounded focus:outline-none focus:shadow-outline"
                onClick={handleDelete}
              >
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
                    <span className="bg-orange-400 text-white text-sm font-semibold mr-2 px-4 py-1 rounded dark:bg-orange-400 dark:text-white">
                      Category - {props.data.category}
                    </span>
                    <p className="mt-2 mb-5">{props.data.description}</p>
                  </div>
                  <blockquote className="text-gray-400 mt-3 font-sans italic">
                    - Created On {createdAtDate} {createdAtTime}
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
