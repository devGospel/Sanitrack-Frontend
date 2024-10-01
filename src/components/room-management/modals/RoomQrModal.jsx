import Spinner from "@/components/loaders/Loader";
import React from "react";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
const RoomQrModal = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  allLocations,
  buttonLoader,
}) => {
  const id = useSelector((state) => state.id.storedId);
  return (
    <div className="bg-white flex justify-center items-center p-5">
      <QRCode value={id} height={10} className="w-12 h-12  md:h-64 md:w-64" />
    </div>
  );
};

export default RoomQrModal;
