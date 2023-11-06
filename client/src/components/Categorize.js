import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme } from '@mui/material/styles';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import Item from './Item';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const CategoryInput = () => {
  // ... Existing code for state and functions ...

  return (
    <div className="h-fit w-4/6 p-4 rounded-lg mb-7 border-b-2 border-l-2" style={{ backgroundColor: 'lightblue' }}>
      <p className="font-semibold mb-2">Categorize Test</p>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="min-w-[150px] p-1 border border-gray-300 rounded mb-1"
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <p className="font-semibold mb-1">Categories</p>
        <Droppable droppableId="Category">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {categories.map((category, index) => (
                <div key={index} className="flex items-center">
                  <Draggable draggableId={index.toString()} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="p-2"
                      >
                        <DragIndicatorIcon />
                        <input
                          type="text"
                          placeholder={`Category ${index + 1}`}
                          value={category}
                          onChange={(e) => handleInputChange(index, e.target.value)}
                          className="outline-none min-w-[150px] p-1 border border-gray-300 rounded"
                        />
                      </div>
                    )}
                  </Draggable>
                  {index + 1 < categories.length ? (
                    <DeleteIcon
                      theme={theme}
                      onClick={() => removeCategory(index)}
                      className="cursor-pointer text-gray-500 hover:text-red-500"
                    />
                  ) : null}
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Item options={categories} description={description} />
      </DragDropContext>
    </div>
  );
};

export default CategoryInput;
