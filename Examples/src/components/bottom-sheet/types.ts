export interface BottomSheetProps {
  height: number;
}

export interface BottomSheetRef {
  open: () => void;
  close: () => void;
  isActive: () => boolean;
}
