import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  IconButton,
  TableContainer,
  Input,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons"; // Import the delete icon

function TodoLists({
  title,
  description,
  isCompleted,
  dueDate,
  updateHandler,
  deleteHandler,
  id,
}) {
  return (
    <Tbody>
      <Tr>
        <Td textDecoration={isCompleted ? "line-through" : "none"}>{title}</Td>
        <Td textDecoration={isCompleted ? "line-through" : "none"}>
          {description}
        </Td>
        <Td textDecoration={isCompleted ? "line-through" : "none"}>{dueDate}</Td>
        <Td>
          {" "}
          <input
            padding="1rem"
            type="checkbox"
            checked={isCompleted}
            onChange={() => updateHandler(id,!isCompleted)}
          />
        </Td>
        <Td>
          {" "}
          <IconButton
            variant="ghost"
            colorScheme="red"
            aria-label="Delete"
            icon={<DeleteIcon />}
            onClick={() => deleteHandler(id)}
          />
        </Td>
      </Tr>
    </Tbody>
  );
}

export default TodoLists;
