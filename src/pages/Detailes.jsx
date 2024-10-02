import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import axios from "../axios/interceptor";

import {
  FaTimes,
  FaUser,
  FaTags,
  FaListAlt,
  FaCalendarAlt,
  FaPaperclip,
  FaImage,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { useAppStore } from "../zustand";

const Details = () => {
  const setUser = useAppStore((state) => state.setUser);
  const [inviteEmail, setInviteEmail] = useState("");

  const params = useParams();

  const [boards, setBoards] = useState([
    {
      id: 1,
      name: "Mening Ajoyib Doskam",
      color: "#8E24AA",
      lists: [
        {
          id: 1,
          title: "Bajarish kerak",
          status: "Pending",
          cards: [],
        },
        {
          id: 2,
          title: "Jarayonda",
          status: "Doing",
          cards: [],
        },
        {
          id: 3,
          title: "Testlash",
          status: "Testing",
          cards: [],
        },
        {
          id: 4,
          title: "Bajarildi",
          status: "Done",
          cards: [],
        },
      ],
    },
  ]);

  const [selectedCard, setSelectedCard] = useState(null);
  const [editingListId, setEditingListId] = useState(null);
  const [newTaskName, setNewTaskName] = useState("");
  const [currentListId, setCurrentListId] = useState(null);
  const [listData, setListData] = useState([]);

  useEffect(() => {
    if (selectedCard) {
      const modal = document.getElementById("cardModal");
      if (modal) {
        modal.showModal();
      }
    }
  }, [selectedCard]);

  const openCardModal = (card, listTitle) => {
    setSelectedCard({ ...card, listTitle });
  };

  useEffect(() => {
    axios
      .get(`tasks/${params.id}`)
      .then((res) => {
        const apiTask = res.data.tasks;
        let copied = JSON.parse(JSON.stringify(boards));

        if (copied[0]?.lists?.length) {
          const result = copied[0].lists.map(function (board) {
            let status = board.status;
            apiTask.length &&
              apiTask.forEach(function (task) {
                if (task.status == status) {
                  board.cards.push(task);
                }
              });

            return board;
          });
          setBoards([{ ...boards, lists: [...result] }]);
        }
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const inviteUser = async (e) => {
    e.preventDefault();

    if (!inviteEmail.trim()) {
      toast.error("Email manzili bo'sh bo'lishi mumkin emas");
      return;
    }

    const inviteData = {
      email: inviteEmail,
      boardId: ` ${params.id}`,
    };
    try {
      const response = await axios
        .post("/boards/invite", inviteData)
        .then((res) => console.log(res.data));
      if (response.status === 200) {
        toast.success("Taklif muvaffaqiyatli yuborildi!");
        setInviteEmail("");
        document.getElementById("inviteModal").close();
      }
    } catch (error) {
      console.log(`${params.id}`);
      console.log(inviteData);
      console.error("Error inviting user:", error);
      toast.success("Taklif muvaffaqiyatli yuborildi!");
      setInviteEmail("");
      document.getElementById("inviteModal").close();
    }
  };

  const addCard = async () => {
    if (!newTaskName.trim()) {
      toast.error("Vazifa nomi bo'sh bo'lishi mumkin emas");
      return;
    }

    let board = {
      title: newTaskName,
      boardId: params.id,
    };

    try {
      const response = await axios.post("/tasks/create", board);
    } catch (error) {
      console.error("Error creating task:", error);
    }

    setBoards((prevBoards) =>
      prevBoards.map((board) => ({
        ...board,
        lists: board.lists.map((list) => {
          if (list.id === currentListId) {
            return {
              ...list,
              cards: [
                ...list.cards,
                {
                  id: Date.now(),
                  title: newTaskName,
                  description: "",
                },
              ],
            };
          }
          return list;
        }),
      }))
    );
    setNewTaskName("");
    document.getElementById("my_modal_3").close();
    toast.success("Karta muvaffaqiyatli qo'shildi!");
  };

  const openAddCardModal = (listId) => {
    setCurrentListId(listId);
    setNewTaskName("");
    document.getElementById("my_modal_3").showModal();
  };

  const updateCardTitle = (boardId, listId, cardId, newTitle) => {
    setBoards(
      boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            lists: board.lists.map((list) => {
              if (list.id === listId) {
                return {
                  ...list,
                  cards: list.cards.map((card) => {
                    if (card.id === cardId) {
                      return { ...card, title: newTitle };
                    }
                    return card;
                  }),
                };
              }
              return list;
            }),
          };
        }
        return board;
      })
    );
  };

  const updateCardDescription = (boardId, listId, cardId, newDescription) => {
    setBoards(
      boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            lists: board.lists.map((list) => {
              if (list.id === listId) {
                return {
                  ...list,
                  cards: list.cards.map((card) => {
                    if (card.id === cardId) {
                      return { ...card, description: newDescription };
                    }
                    return card;
                  }),
                };
              }
              return list;
            }),
          };
        }
        return board;
      })
    );
    setSelectedCard({ ...selectedCard, description: newDescription });
    toast.success("Tavsif muvaffaqiyatli yangilandi!");
  };

  const deleteCard = (boardId, listId, cardId) => {
    setBoards(
      boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            lists: board.lists.map((list) => {
              if (list.id === listId) {
                return {
                  ...list,
                  cards: list.cards.filter((card) => card.id !== cardId),
                };
              }
              return list;
            }),
          };
        }
        return board;
      })
    );
    toast.success("Karta muvaffaqiyatli o'chirildi!");
  };

  const startEditingList = (listId) => {
    setEditingListId(listId);
  };

  const updateListTitle = (boardId, listId, newTitle) => {
    if (!newTitle.trim()) {
      toast.error("Ro'yxat sarlavhasi bo'sh bo'lishi mumkin emas");
      return;
    }
    setBoards(
      boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            lists: board.lists.map((list) => {
              if (list.id === listId) {
                return { ...list, title: newTitle };
              }
              return list;
            }),
          };
        }
        return board;
      })
    );
    setEditingListId(null);
    toast.success("Ro'yxat sarlavhasi yangilandi!");
  };

  return (
    <div className="animate-my-animate font-sans text-white bg-gradient-to-r from-blue-900 to-purple-900 min-h-screen p-6 ml-[80px]">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-4xl font-bold mb-4 text-center text-white">
        Mening Ajoyib Trello Doskam
      </h1>
      <button
        onClick={() => document.getElementById("inviteModal").showModal()}
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
      >
        Invite Friend
      </button>
      {boards.map((board) => (
        <div key={board.id} className="rounded-lg p-4 overflow-x-auto ">
          <div className="flex gap-6 flex-wrap">
            {board.lists.map((list) => (
              <div
                key={list.id}
                className="bg-gray-800 rounded-lg p-4 min-w-[300px] shadow-lg"
              >
                {editingListId === list.id ? (
                  <input
                    type="text"
                    className="w-full p-2 mb-2 bg-gray-700 rounded text-white"
                    defaultValue={list.title}
                    onBlur={(e) =>
                      updateListTitle(board.id, list.id, e.target.value)
                    }
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        updateListTitle(board.id, list.id, e.target.value);
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  <h3 className="mb-4 text-lg font-bold flex justify-between items-center">
                    {list.title}
                    <button
                      onClick={() => startEditingList(list.id)}
                      className="text-gray-400 hover:text-white"
                    >
                      <FaEdit />
                    </button>
                  </h3>
                )}
                <div className="space-y-3">
                  {list.cards.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => openCardModal(card, list.title)}
                      className="cursor-pointer bg-gray-700 rounded-lg p-3 hover:bg-gray-600 transition duration-200"
                    >
                      <h4 className="font-semibold mb-1">{card.title}</h4>
                      <p className="text-sm text-gray-400 truncate">
                        {card.description}
                      </p>
                    </div>
                  ))}
                  <button
                    onClick={() => openAddCardModal(list.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 transition duration-200"
                  >
                    + add task
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <dialog id="cardModal" className="modal">
        {selectedCard && (
          <div className="modal-box w-12/12 max-w-3xl bg-gray-800 text-white">
            <form method="dialog">
              <button className="mb-2 btn btn-sm btn-circle btn-primary text-white ml-[680px] -mt-[1100px]">
                <FaTimes className="" />
              </button>
            </form>

            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">{selectedCard.title}</h2>
                <div className="flex space-x-2">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => {
                      const newTitle = prompt(
                        "Yangi karta sarlavhasini kiriting:",
                        selectedCard.title
                      );
                      if (newTitle) {
                        updateCardTitle(
                          boards[0].id,
                          boards[0].lists.find(
                            (list) => list.title === selectedCard.listTitle
                          ).id,
                          selectedCard.id,
                          newTitle
                        );
                        setSelectedCard({ ...selectedCard, title: newTitle });
                        toast.success("Karta sarlavhasi yangilandi!");
                      }
                    }}
                  >
                    <FaEdit /> Tahrirlash
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => {
                      deleteCard(
                        boards[0].id,
                        boards[0].lists.find(
                          (list) => list.title === selectedCard.listTitle
                        ).id,
                        selectedCard.id
                      );
                      document.getElementById("cardModal").close();
                    }}
                  >
                    <FaTrash /> O'chirish
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                ro'yxatda{" "}
                <span className="font-bold">{selectedCard.listTitle}</span>
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Tavsif</h3>
              <textarea
                className="w-full h-32 p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCard.description}
                onChange={(e) =>
                  setSelectedCard({
                    ...selectedCard,
                    description: e.target.value,
                  })
                }
              ></textarea>
              <div className="flex mt-2 space-x-2">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() =>
                    updateCardDescription(
                      boards[0].id,
                      boards[0].lists.find(
                        (list) => list.title === selectedCard.listTitle
                      ).id,
                      selectedCard.id,
                      selectedCard.description
                    )
                  }
                >
                  Saqlash
                </button>
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={() =>
                    setSelectedCard({
                      ...selectedCard,
                      description: selectedCard.description,
                    })
                  }
                >
                  Bekor qilish
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Faoliyat</h3>
              <div className="text-gray-400">
                <div className="flex items-start space-x-2 mt-2">
                  <span className="font-semibold">John Doe</span>
                  <p>
                    ushbu kartani {selectedCard.listTitle} ro'yxatiga qo'shdi
                  </p>
                </div>
                <p className="text-xs text-gray-500">21 Sent 2024, 18:05</p>
              </div>
              <div className="mt-4">
                <textarea
                  className="w-full h-20 p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Izoh yozing..."
                ></textarea>
                <button className="btn btn-sm btn-primary mt-2">
                  Izoh qo'shish
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() =>
                  document.getElementById("memberModal").showModal()
                }
                className="btn btn-outline btn-info flex items-center justify-between px-4 py-2"
              >
                <span>A'zolar</span>
                <FaUser />
              </button>

              <dialog
                id="memberModal"
                className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <div className="modal-box relative w-304px h-128px bg-base-200 shadow-lg p-4">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg mt-4">Members</h3>
                  <input
                    type="text"
                    placeholder="Search members"
                    className="input input-bordered w-full mt-2"
                  />
                  <p className="mt-4 text-sm">Board members</p>
                  <div className="flex items-center mt-2">
                    <div className="bg-yellow-500 text-black rounded-full w-8 h-8 flex items-center justify-center">
                      AT
                    </div>
                    <p className="ml-2">Abdulloh Tursunov</p>
                  </div>
                </div>
              </dialog>

              <button
                onClick={() =>
                  document.getElementById("labels_modal").showModal()
                }
                className="btn btn-outline btn-info flex items-center gap-2 justify-between px-4 py-2"
              >
                <span>Yorliqlar</span>
                <FaTags />
              </button>

              <dialog
                id="labels_modal"
                className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <div className="modal-box relative w-22px h-32px bg-base-200 shadow-lg p-4">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg mt-2">Yorliqlar</h3>
                  <p className="mt-1">Rang tanlang:</p>
                  <div className="flex flex-col mt-2">
                    {/* Ranglar */}
                    {[
                      "bg-red-500",
                      "bg-green-500",
                      "bg-blue-500",
                      "bg-yellow-500",
                    ].map((color) => (
                      <label key={color} className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          className="w-4 h-4 mr-2  cursor-pointer"
                        />
                        <div
                          className={`h-[32px] w-[450px]   ${color} cursor-pointer`}
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </dialog>

              <button className="btn btn-outline btn-info flex items-center justify-between px-4 py-2">
                <span>Tekshirish ro'yxati</span>
                <FaListAlt />
              </button>

              <button className="btn btn-outline btn-info flex items-center justify-between px-4 py-2">
                <span>Muddat</span>
                <FaCalendarAlt />
              </button>

              <button className="btn btn-outline btn-info flex items-center justify-between px-4 py-2">
                <span>Biriktirma</span>
                <FaPaperclip />
              </button>

              <button className="btn btn-outline btn-info flex items-center justify-between px-4 py-2">
                <span>Muqova</span>
                <FaImage />
              </button>
            </div>
          </div>
        )}
      </dialog>

      <dialog id="my_modal_3" className="modal -mt-52">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Add task name</h3>

          <div className="flex gap-3 items-center mt-4">
            <input
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              type="text"
              className="input input-bordered w-full"
              placeholder="task name"
            />
            <button onClick={addCard} className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </dialog>
      {/* Invite Modal */}
      <dialog id="inviteModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Foydalanuvchini taklif qiling</h3>
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="Email manzilini kiriting"
            className="input input-bordered w-full mt-4"
          />
          <button onClick={inviteUser} className="btn btn-primary mt-4">
            Taklif yuborish
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default Details;
