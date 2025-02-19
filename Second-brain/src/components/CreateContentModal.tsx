import { useState } from "react";
import CrossIcon from "../icons/CrossIcon"
import Button from "./Button"
import Input from "./Input"

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: { title: string; link: string }) => void;
}

const CreateContentModal = ({ open, onClose, onSubmit }: ModalProps) => {
  const [formData, setFormData] = useState({ title: "", link: "" });
  const [errors, setErrors] = useState({ title: "", link: "" });

  const handleSubmit = () => {
    // Basic validation
    const newErrors = {
      title: !formData.title ? "Title is required" : "",
      link: !formData.link ? "Link is required" : "",
    };
    setErrors(newErrors);

    if (!newErrors.title && !newErrors.link) {
      onSubmit?.(formData);
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Add Content</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <CrossIcon />
          </button>
        </div>

        <div className="space-y-4">
          <Input
            label="Title"
            placeholder="Enter title"
            value={formData.title}
            error={errors.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <Input
            label="Link"
            placeholder="Enter link"
            value={formData.link}
            error={errors.link}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, link: e.target.value }))
            }
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="secondary"
            text="Cancel"
            onClick={onClose}
          />
          <Button
            variant="primary"
            text="Submit"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}

export default CreateContentModal