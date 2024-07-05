import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { UseGetDevelopers } from "../../hooks/useGetDevelopers.jsx";
import { UseDeleteDeveloper } from "../../hooks/useDeleteDevelopers.jsx";
import { FormDevelopers } from "./FormDevelopers.jsx";

export function TableDevelopers() {
  const { developers, isLoading, error } = UseGetDevelopers();
  const { deleteDeveloper} = UseDeleteDeveloper();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;



  const handleDelete = (id) => {
    console.log(`Delete developer with ID: ${id}`);
    deleteDeveloper(id);
    window.location.reload();
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "country", label: "Country" },
    { key: "website", label: "Website" },
    { key: "actions", label: "Actions" }
  ];

  return (
    <>
    <FormDevelopers type = 'post' />
    <Table aria-label="Developers Table">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {developers.map((developer) => (
          <TableRow key={developer.id}>
            <TableCell>{developer.name}</TableCell>
            <TableCell>{developer.country}</TableCell>
            <TableCell>{developer.website}</TableCell>
            <TableCell>
              <FormDevelopers  type = 'patch' id = {developer.id} />
              <Button  color="danger" onClick={() => handleDelete(developer.id)} >Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
        </>
  );
}
