"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Home from "../Home";
import { FileActions } from "@/components/file-actions";
import { FileGrid } from "@/components/file-grid";

export default function Slug() {
  const searchParams = useSearchParams();
  const query = searchParams.get("id");

  console.log(query);
  return (
    <div>
      <FileActions parentId={query} />
      <FileGrid parentId={query} />
    </div>
  );
}
