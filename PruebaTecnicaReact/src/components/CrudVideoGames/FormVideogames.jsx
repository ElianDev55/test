import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";

import { useCreateVideoGame } from "../../hooks/useCreateVideogames.jsx";
import { useUpdateVideoGame } from "../../hooks/usePatchVideogames.jsx";


export function FormVideogames({ type, id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("opaque");
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    platformid: "",
    releasedate: "", // Usaremos una cadena para la fecha en formato yyyy-mm-dd
    developerid: "",
  });

  const { createVideoGame } = useCreateVideoGame();
  const { updateVideoGame } = useUpdateVideoGame();

  const backdrops = ["blur"];

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (type === "post") {
      console.log("Guardando datos...");
      createVideoGame(formData);
      window.location.reload();
    }
    if (type === "patch") {
      console.log("Actualizando datos...");
      updateVideoGame(id, formData);
      window.location.reload();
  }
};

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {backdrops.map((b) => (
          <Button
            key={b}
            variant="flat"
            color={type === "post" ? "success" : "warning"}
            onClick={() => handleOpen(b)}
            className="capitalize"
          >
            {type === "post" ? "Guardar" : "Actualizar"}
          </Button>
        ))}
      </div>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Formulario</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-3">
              <Input
                label="Título"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              <Input
                label="Género"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
              />
              <Input
                label="ID de Plataforma"
                name="platformid"
                value={formData.platformid}
                onChange={handleChange}
              />
              <Input
                type="date"
                label="Fecha de Lanzamiento"
                name="releasedate"
                value={formData.releasedate}
                onChange={handleChange}
              />
              <Input
                label="ID de Desarrollador"
                name="developerid"
                value={formData.developerid}
                onChange={handleChange}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onClick={onClose}>
              Cerrar
            </Button>
            <Button color="primary" onClick={handleSubmit}>
              {type === "post" ? "Guardar" : "Actualizar"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
