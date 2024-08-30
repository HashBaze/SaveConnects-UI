import React, { useState } from "react";
import { sendInquiryEmail } from "../utils/ApiRequest";
import { toast } from "react-toastify";

interface EmailModalProps {
  isOpen: boolean;
  exhibitorName: string | undefined;
  exhibitorEmail: string | undefined;
  onClose: () => void;
}

const EmailModal: React.FC<EmailModalProps> = ({
  isOpen,
  exhibitorName,
  exhibitorEmail,
  onClose,
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSendEmail = async () => {
    if (!name || !email || !message) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (exhibitorEmail) {
      try {
        setLoading(true);
        await sendInquiryEmail(name, email, exhibitorEmail, message);
        toast.success("Email sent successfully");
        onClose();
      } catch (err) {
        setLoading(false);
        toast.error("Failed to send email");
        console.error("Failed to send email:", err);
      }
    }
  };

  return (
    <div className="fixed inset-0 absolute mx-auto md:ml-[-30px] flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-lg text-naviblue font-semibold mb-4">Send Email</h2>
        <p className="mb-4 text-sm text-gray-600">
          Share your contact details with {exhibitorName}
        </p>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Hi, I'm...
          </label>
          <div className="flex">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full h-[40px] border-naviblue rounded-md shadow-sm p-2"
              placeholder="Enter your name"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            My email is...
          </label>
          <div className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full h-[40px] border-naviblue rounded-md shadow-sm p-2"
              placeholder="Enter your email address"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            And, My inquiry is...
          </label>
          <div className="flex">
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full h-[80px] border-naviblue rounded-md shadow-sm p-2"
              placeholder="Enter your inquiry"
            />
          </div>
        </div>
        <div className="flex flex-row space-x-2">
          <button
            onClick={handleSendEmail}
            className="bg-naviblue text-white border-none text-sm font-medium rounded-md px-4 py-2 cursor-pointer flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Sending...
              </div>
            ) : (
              "Send"
            )}
          </button>
          <button
            onClick={onClose}
            className="ml-4 text-naviblue border-none text-sm font-medium rounded-md px-4 py-2 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
