import type { FC } from "react";
import { useRef } from "react";
import { useDrag } from "react-dnd";
import type { Card, DragItem } from "../types/card";

interface Props {
  card: Card;
  index: number;
  vertical: boolean;
}

const DraggableCard: FC<Props> = ({ card, index, vertical }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: { card, index } as DragItem,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // Attach the drag behavior to the DOM ref
  drag(ref);

  const style = vertical
    ? { marginTop: index === 0 ? 0 : "-2rem", zIndex: index }
    : { marginLeft: index === 0 ? 0 : "-7.5rem", zIndex: index };

  return (
    <div
      ref={ref}
      className="w-[130px] h-full bg-red-600 text-white border-2 border-white rounded-md shadow-md flex flex-col items-center justify-center"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        ...style,
      }}
    >
      <span>{card.suit}</span>
      <span>{card.rank}</span>
      <span>{card.value}</span>
    </div>
  );
};

export default DraggableCard;
