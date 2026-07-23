export interface LightboxImageData {
  src: string;
  title: string;
  category: string;
  description?: string;
}

export interface ImageLightboxModalProps {
  selectedImage: LightboxImageData | null;
  onClose: () => void;
}
