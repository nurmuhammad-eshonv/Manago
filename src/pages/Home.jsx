import React, { useState, useEffect } from "react";
import { PiUploadSimple } from "react-icons/pi";
import { GoFileDirectory } from "react-icons/go";
import { MdPublic, MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "../axios/interceptor";

function Home() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#000");
  const [description, setDescription] = useState("");
  const [boards, setBoards] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  console.log(token);

  useEffect(() => {
    const storedBoards = localStorage.getItem("boards");
    if (storedBoards) {
      setBoards(JSON.parse(storedBoards));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boards));
  }, [boards]);

  const handleCreateBoard = () => {
    const newBoard = { title, color, description };
    setBoards([...boards, newBoard]);

    setTitle("");
    setColor("#ffffff");
    setDescription("");

    setModalOpen(false);
  };

  axios
    .post("/boards/create", boards)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div className="ml-[90px]">
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
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className=" w-full cursor-pointer"
                        style={{ height: "40px", width: "100%" }}
                      />
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
            onClick={() => navigate("/detailes")}
            key={index}
            className="cursor-pointer hover:opacity-0.8 w-[270px] h-[140px] border-2 border-gray-300 rounded-lg shadow-lg p-4 flex flex-col items-start transition-transform duration-300 transform hover:scale-105"
            style={{ backgroundColor: board.color }}
          >
            <GoFileDirectory className="text-5xl text-white mb-2" />
            <h4 className="font-bold text-lg text-white">{board.title}</h4>
            <p className="text-white">{board.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
