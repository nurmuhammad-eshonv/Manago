import React, { useState, useEffect } from "react";
import { PiUploadSimple } from "react-icons/pi";
import { GoFileDirectory } from "react-icons/go";
import { MdPublic, MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "../axios/interceptor";
import { useAppStore } from "../zustand";

function Home() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("red");
  const [description, setDescription] = useState("");
  const [boards, setBoards] = useState([]);


  const setUser = useAppStore((state) => state.setUser);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get("/boards/my-boards")
        console.log(response.data.boards)
        setBoards(response.data.boards)
      } catch (error) {
        console.error(
          error.response ? error.response.data : error.message
         
        )
        console.log(error.response.data.message);
        
        if (error.response.data.message === "Not authorized") {
          setUser(null); 
        }
      }
    };
    fetchBoards();
  }, []);

  const resetForm = () => {
    setTitle("");
    setColor("red");
    setDescription("");
    setModalOpen(false);
  };
  const handleCreateBoard = () => {
    const newBoard = { name: title, description, color }
    axios
      .post("/boards/create", newBoard)
      .then((res) => {
        console.log("Board successfully created:", res.data);
        setBoards([...boards, newBoard]);
        resetForm();
      })
      .catch((err) => {
        if (err.response && err.response.data.message === "Token topilmadi") {
          console.error("Token not found, logging out user.");
          setUser(null); 
          navigate("/login"); 
        } else {
          console.error(
            "Error creating board:",
            err.response ? err.response.data : err.message
          );
        }
      });
  }
    return (
    <div className="ml-[90px] animate-my-animate">
      <div className="flex items-center justify-between p-6">
        <h2 className="font-[700] text-[30px]">Files</h2>
        <div className="flex gap-[15px]">
          <dialog open={modalOpen} className="modal">
            <div className="modal-box">
              <form method="dialog" onSubmit={(e) => e.preventDefault()}>
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => setModalOpen(false)}
                >
                  ✕
                </button>
                <h3 className="font-bold text-lg">Create New Board</h3>
                <div className="py-4">
                  <label className="block">
                    Title:
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="input input-bordered w-full"
                      required
                    />
                  </label>
                  <label className="block mt-1">
                    Color:
                    <div className="relative">
                      <select
                        onChange={(e) => setColor(e.target.value)}
                        className="select w-full"
                      >
                        <option value="red" className="text-red-600 font-bold">
                          Red
                        </option>
                        <option
                          value="gray"
                          className="text-gray-500 font-bold"
                        >
                          Gray
                        </option>
                        <option
                          value="orange"
                          className="text-orange-600 font-bold"
                        >
                          Orange
                        </option>
                        <option
                          value="green"
                          className="text-green-600 font-bold"
                        >
                          Green
                        </option>
                      </select>
                    </div>
                  </label>
                  <label className="block mt-2">
                    Description:
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="input input-bordered w-full"
                      required
                    />
                  </label>
                </div>
                <button
                  type="button"
                  onClick={handleCreateBoard}
                  className="bg-[#5051F9] px-[28px] py-[14px] rounded-[23px] text-white"
                >
                  Create
                </button>
              </form>
            </div>
          </dialog>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#5051F9] px-[28px] py-[14px] rounded-[23px] text-white"
          >
            + Create New Folder
          </button>
          <button className="flex items-center gap-1 bg-transparent border px-[28px] py-[14px] rounded-[23px]">
            <PiUploadSimple />
            <p className="text-[#505050] font-[700] text-sm">Upload</p>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 p-6">
        {boards.map((board, index) => (
          <div
            onClick={() => navigate(`/detailes/${board.id}`)}
            key={index}
            className="cursor-pointer hover:opacity-0.8 w-[270px] h-[140px] border-2 border-gray-300 rounded-lg shadow-lg p-4 flex flex-col items-start transition-transform duration-300 transform hover:scale-105"
            style={{ backgroundColor: board.color }}
          >
            <GoFileDirectory className="text-5xl text-white mb-2" />
            <h4 className="font-bold text-lg text-white">{board.name}</h4>
            <p className="text-white">{board.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
