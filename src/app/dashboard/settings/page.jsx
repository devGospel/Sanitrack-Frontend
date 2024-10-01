"use client";
import Spinner from "@/components/loaders/Loader";

import SettingsMain from "@/components/settings/SettingsMain";

import React, { Suspense, useState } from "react";

const Settings = () => {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <SettingsMain />
      </Suspense>
    </>
  );
};

export default Settings;
