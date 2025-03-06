import { useState, useEffect } from "react";
import CrossIcon from "../icons/CrossIcon";
import Button from "./Button";
import Input from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import Copy from "../icons/Copy";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const ShareModal = ({ open, onClose }: ModalProps) => {
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {

      fetchShareLink();
    
  }, [open]);

  const fetchShareLink = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/brain/share`, {
         share:true
      },{
        headers: {
          Authorization: localStorage.getItem("Authorization")
        }
      });
      
      if (response.status === 200) {
        setShareLink(`http://localhost:5173/brain/${response.data.link}`);
      }
    } catch (error) {
      console.error("Error fetching share link:", error);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Share Content</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <CrossIcon />
          </button>
        </div>

        <div className="space-y-4">
          <div className="mb-4">
            <p className="text-gray-600 mb-2">Share this link with others:</p>
            <div className="flex gap-2">
              <Input
                placeholder="Link"
                value={shareLink}
                readOnly
                className="flex-grow"
              />
              <Button
              startIcon={<Copy />}
                variant="primary"
                text={copied ? "Copied!" : "Copy"}
                onClick={handleCopyLink}
              />
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-500">Anyone with this link will be able to view this content.</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            variant="secondary"
            text="Close"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default ShareModal;