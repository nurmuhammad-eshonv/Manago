import React, { useState } from 'react';

const TrelloLikeBoard = () => {
  const [boards, setBoards] = useState([
    {
      id: 1,
      name: 'My Board',
      color: '#8E24AA',
      lists: [
        { id: 1, title: 'todo', cards: [{ id: 1, title: 'DSA' }] },
        { id: 2, title: 'in progress', cards: [{ id:2, title: 'DSA' }] },
        { id: 3, title: 'testing', cards: [{ id: 3, title: 'DSA' }] },
        { id: 4, title: 'done', cards: [{ id: 4, title: 'DSA' }] },
      ]
    },
    
  ]);

  const addList = (boardId) => {
    setBoards(boards.map(board => {
      if (board.id === boardId) {
        const newList = { id: Date.now(), title: '', isEditing: true, cards: [] };
        return { ...board, lists: [...board.lists, newList] };
      }
      return board;
    }));
  };

  const updateListTitle = (boardId, listId, newTitle) => {
    setBoards(boards.map(board => {
      if (board.id === boardId) {
        return {
          ...board,
          lists: board.lists.map(list => {
            if (list.id === listId) {
              return { ...list, title: newTitle, isEditing: false };
            }
            return list;
          })
        };
      }
      return board;
    }));
  };

  const addCard = (boardId, listId) => {
    setBoards(boards.map(board => {
      if (board.id === boardId) {
        return {
          ...board,
          lists: board.lists.map(list => {
            if (list.id === listId) {
              
              const newCard = { id: Date.now(), title: '', isEditing: true };
              return { ...list, cards: [...list.cards, newCard] };
            }
            return list;
          })
        };
      }
      return board;
    }));
  };

  const updateCardTitle = (boardId, listId, cardId, newTitle) => {
    setBoards(boards.map(board => {
      if (board.id === boardId) {
        return {
          ...board,
          lists: board.lists.map(list => {
            if (list.id === listId) {
              return {
                ...list,
                cards: list.cards.map(card => {
                  if (card.id === cardId) {
                    return { ...card, title: newTitle, isEditing: false };
                  }
                  return card;
                })
              };
            }
            return list;
          })
        };
      }
      return board;
    }));
  };

  const handleListSubmit = (boardId, listId, title) => {
    if (!title.trim()) {
      alert('List title cannot be empty.');
      return;
    }
    updateListTitle(boardId, listId, title);
  };

  const handleCardSubmit = (boardId, listId, cardId, title) => {
    if (!title.trim()) {
      alert('Card title cannot be empty.');
      return;
    }
    updateCardTitle(boardId, listId, cardId, title);
  };

  return (
    <div className="font-sans  text-white">
      {boards.map(board => (
        <div key={board.id} className="rounded p-2 overflow-x-auto">
          <div className=" flex gap-5 flex-wrap">
            {board.lists.map(list => (
              <div key={list.id} className=" bg-gray-800 rounded p-2">
                {list.isEditing ? (
                  <div className="flex">
                    <input
                      type="text"
                      value={list.title}
                      onChange={(e) => {
                        const updatedBoards = boards.map(b => {
                          if (b.id === board.id) {
                            return {
                              ...b,
                              lists: b.lists.map(l => {
                                if (l.id === list.id) {
                                  return { ...l, title: e.target.value };
                                }
                                return l;
                              })
                            };
                          }
                          return b;
                        });
                        setBoards(updatedBoards);
                      }}
                      className="w-full p-1 bg-transparent text-white border-none mb-2"
                      placeholder="Enter list title"
                    />
                    <button
                      onClick={() => handleListSubmit(board.id, list.id, list.title)}
                      className="bg-blue-500 text-white rounded px-1 py-0.5 ml-2 text-xs"
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <h3 className="mb-2 text-sm font-bold">{list.title}</h3>
                )}
                <div className="flex flex-col gap-2">
                  {list.cards.map(card => (
                    <div key={card.id} className=" w-[300px] bg-gray-700 rounded p-2">
                      {card.isEditing ? (
                        <div className="flex">
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => {
                              const updatedBoards = boards.map(b => {
                                if (b.id === board.id) {
                                  return {
                                    ...b,
                                    lists: b.lists.map(l => {
                                      if (l.id === list.id) {
                                        return {
                                          ...l,
                                          cards: l.cards.map(c => {
                                            if (c.id === card.id) {
                                              return { ...c, title: e.target.value };
                                            }
                                            return c;
                                          })
                                        };
                                      }
                                      return l;
                                    })
                                  };
                                }
                                return b;
                              });
                              setBoards(updatedBoards);
                            }}
                            className="w-full p-1 bg-transparent text-white border-none"
                            placeholder="Enter card title"
                          />
                          <button
                            onClick={() => handleCardSubmit(board.id, list.id, card.id, card.title)}
                            className="bg-blue-500 text-white rounded px-1 py-0.5 ml-2 text-xs"
                          >
                            Submit
                          </button>
                        </div>
                      ) : (
                        <span>{card.title}</span>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addCard(board.id, list.id)}
                    className="bg-transparent border-none text-gray-400 cursor-pointer text-left p-1 text-sm"
                  >
                    + Add a card
                  </button>
                </div>
              </div>
            ))}
            <div className="min-w-[272px]">
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrelloLikeBoard;
