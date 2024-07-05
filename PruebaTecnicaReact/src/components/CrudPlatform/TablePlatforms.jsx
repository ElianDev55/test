import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { UseGetPlatforms } from "../../hooks/useGetPlatforms";
import { UseDeletePlatforms } from "../../hooks/useDeletePlatforms.jsx";
import { FormPlatform } from "./FormPlatform.jsx";


export function TablePlatforms() {
  const { platforms, isLoading, error } = UseGetPlatforms();
  const { deletePlatform } = UseDeletePlatforms();


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
  if (!platforms ) return <p>No platforms data available</p>;

  const columns = [
    { key: "name", label: "Name" },
    { key: "manufacturer", label: "Manufacturer" },
    { key: "actions", label: "Actions" } // Nueva columna para acciones
  ];


  const handleDelete = (id) => {
    deletePlatform(id);
    window.location.reload();
  };

  return (
    <>
    <FormPlatform  type = 'post'/>
    <Table aria-label="Platforms Table">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {platforms.map((platform) => (
          <TableRow key={platform.id}>
            <TableCell>{platform.name}</TableCell>
            <TableCell>{platform.manufacturer}</TableCell>
            <TableCell>
              <FormPlatform  type = 'patch' id = {platform.id} />
              <Button color="danger" onClick={() => handleDelete(platform.id)}  >Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
        </>
  );
}
