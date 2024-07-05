import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { UseDeleteVideoGames } from "../../hooks/useDeleteVideogames";
import { FormVideogames } from "./FormVideogames";

const columns = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "genre",
    label: "Genre",
  },
  {
    key: "developer",
    label: "Developer",
  },
  {
    key: "platform",
    label: "Platform",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

export function TableVideogames({ data }) {

  const  { deleteVideoGame, error } = UseDeleteVideoGames();


  if (!data) {
    return <p>No data available</p>;
  }

  const handleEdit = (id) => {
    console.log(`Edit video game with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete video game with ID: ${id}`);
    deleteVideoGame(id);
    window.location.reload();
   
  };

  return (
    <>
    <FormVideogames type = 'post' />
    <Table aria-label="Videogames Table">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.genre}</TableCell>
            <TableCell>{item.developer.name}</TableCell>
            <TableCell>{item.platform.name}</TableCell>
            <TableCell>
            <FormVideogames  type = 'patch' id={item.id} />
              <Button color="danger" onClick={() => handleDelete(item.id)} >Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
            </>
  );
}

