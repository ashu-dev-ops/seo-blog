import { UploadBeforeHandler } from "suneditor-react/dist/types/upload";

export interface ImageUploadBeforeHandler {
  (files: File[], info: object, uploadHandler: UploadBeforeHandler): void;
}
interface SunEditorProps {
    // Other props...
  
    onImageUploadBefore: ImageUploadBeforeHandler;
  }