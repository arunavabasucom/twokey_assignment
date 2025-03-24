"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Home from "../Home";
import { FileActions } from "@/components/file-actions";
import { FileGrid } from "@/components/file-grid";
import { DriveLayout } from "@/components/drive-layout";

export default function Slug() {
  const searchParams = useSearchParams();
  const query = searchParams.get("id");

  console.log(query);
  return (
    <DriveLayout>
      <FileActions parentId={query} />
      <FileGrid parentId={query} />
    </DriveLayout>
  );
}
