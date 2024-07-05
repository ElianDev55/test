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
import { useCreatePlatform } from "../../hooks/useCreatePlatforms";
import { useUpdatePlatform } from "../../hooks/usePatchPlatforms";

export function FormPlatform({ type, id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("opaque");
  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
  });
  const {createPlatform} = useCreatePlatform();
  const {updatePlatform} = useUpdatePlatform();

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
      createPlatform(formData);
      window.location.reload();
    }
    if (type === "patch") {
      console.log("Actualizando datos...");
      updatePlatform(id, formData);
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
                label="Fabricante"
                name="manufacturer"
                value={formData.manufacturer}
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
