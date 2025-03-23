import { DriveLayout } from "@/components/drive-layout";
import { FileGrid } from "@/components/file-grid";
import { FileActions } from "@/components/file-actions";

export default function Home() {
  return (
    <DriveLayout>
      <FileActions parentFolderId=""/>
      <FileGrid parentFolderId=""/>
    </DriveLayout>
  );
}
