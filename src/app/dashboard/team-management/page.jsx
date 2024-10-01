"use client";
import React, { useEffect } from "react";
import TeamManagement from "../../../components/team-management/teams";
import useTeam from "@/hooks/useTeam";
import { useSelector } from "react-redux";

export default function Teams() {
  const { getAllTeams, allTeams, loading } = useTeam();
  const selectedFacilityId = useSelector(
    (state) => state.facility.selectedFacilityId
  );
  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null ?? "";

  useEffect(() => {
    if (role?.toLowerCase() == "manager") {
      getAllTeams(selectedFacilityId);
    } else
    getAllTeams();
  }, [role, selectedFacilityId]);
  console.log(allTeams);
  return (
    <>
      <TeamManagement data={allTeams} loading={loading} />
    </>
  );
}
