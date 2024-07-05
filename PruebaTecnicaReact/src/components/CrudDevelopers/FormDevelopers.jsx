import React, { useState } from "react";
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
import { useCreateDeveloper } from "../../hooks/useCreateDevelopers";
import { useUpdateDeveloper } from "../../hooks/usePatchDevelopers";

export function FormDevelopers({ type, id  }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("opaque");
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    web: "",
  });
  const {createDeveloper} = useCreateDeveloper();
  const {updateDeveloper} = useUpdateDeveloper(); 

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
    // Aquí puedes manejar la lógica para guardar o actualizar los datos
    console.log("Form data:", formData);
    if (type === "post") {
      console.log("Guardando datos...");
      createDeveloper(formData);
      window.location.reload(); // Recarga la página después de enviar
    }
    if (type === "patch") {
      console.log("Actualizando datos...");
      updateDeveloper(id, formData);
      window.location.reload(); // Recarga la página después de enviar
    }
    onClose(); // Cierra el modal después de enviar el formulario
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {backdrops.map((b) => (
          <Button
            key={b}
            variant="flat"
            color={type === "post" ? "success" : "warning"}
            onPress={() => handleOpen(b)}
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
                label="Nombre"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <Input
                label="País"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
              <Input
                label="Sitio Web"
                name="web"
                value={formData.web}
                onChange={handleChange}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cerrar
            </Button>
            <Button color="primary" onPress={handleSubmit}>
              {type === "post" ? "Guardar" : "Actualizar"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
