import type { FC } from "react";
import { useDrop } from "react-dnd";
import { useRef, useEffect } from "react";
import type { DragItem } from "../types/card";
import { RiPokerSpadesFill } from "react-icons/ri";

interface DropZoneProps {
  onDrop: (item: DragItem) => void;
  Icon: React.ComponentType<{ className?: string }>;
  color?: string;
}
const DropZone: FC<DropZoneProps> = ({ onDrop, Icon, color }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "CARD",
    drop: (item: DragItem) => {
      onDrop(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  useEffect(() => {
    if (ref.current) {
      drop(ref.current);
    }
  }, [drop]);

  const isActive = isOver && canDrop;

  return (
    <div
      ref={ref}
      className={`relative h-full w-[130px] border border-gray-600 rounded-lg shadow-inner shadow-black/30 flex items-center justify-center transition-all ${
        isActive
          ? "bg-green-400 border-green-700"
          : canDrop
          ? "bg-yellow-200 border-yellow-600"
          : "bg-gray-200 border-gray-400"
      }`}
    >
      <Icon className={`w-10 h-10 text-[${color}]`} />
    </div>
  );
};

export default DropZone;
