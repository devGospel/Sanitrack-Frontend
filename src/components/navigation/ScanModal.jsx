"use client";
import Spinner from "@/components/loaders/Loader";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { Scanner, stopScanning } from "@yudiel/react-qr-scanner";
import { Roles } from "@/constant/roles";
import { useRouter } from "next/navigation";

const ScanModal = ({ role, close }) => {
  const router = useRouter();
  const [result, setResult] = useState(null);
  const [viewScanner, setViewScanner] = useState(false);
  useEffect(() => {
    if (result) {
      setTimeout(() => {
        close();
        if (role.toLowerCase() === Roles.INSPECTOR.toLowerCase()) {
          router.push(`/dashboard/inspector/work-order/${result}`);
        } else if (role.toLowerCase() === Roles.CLEANER.toLowerCase()) {
          router.push(`/dashboard/cleaner/work-order/${result}`);
        }
      }, 1500);
    }
  }, [result]);
  return (
    <div className="bg-white flex justify-center items-center p-5 ">
      {viewScanner ? (
        <div className="pulse flex justify-center items-center lg:w-60 lg:h-60 w-44 h-44">
          <p className="text-sm text-center">Navigating to Room</p>
        </div>
      ) : (
        <div className="w-60 lg:w-full mx-auto">
          <Scanner
            onScan={(text, result) => {
              if (text) {
                setResult(text[0]?.rawValue);
                setViewScanner(true);

                console.log("scanned", text);
              }
              // console.log("scanned", text);
            }}
            onError={(error) => console.log(error?.message)}
            audio={false}
          />
        </div>
      )}
    </div>
  );
};

export default ScanModal;
