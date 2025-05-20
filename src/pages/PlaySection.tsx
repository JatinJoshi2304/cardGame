// src/components/PlaySection.tsx
import { useMemo, useState, type FC } from "react";
import {
  RiPokerHeartsFill,
  RiPokerSpadesFill,
  RiPokerDiamondsFill,
  RiPokerClubsFill,
} from "react-icons/ri";
import DraggableCard from "./DraggableCard";
import DropZone from "./DropZone";
import type { Card } from "../types/card";

// Reusable drop zone for a suit
const SuitDropZone: FC<{
  cards: Card[];
  onDrop: (item: { card: Card }) => void;
  Icon: FC;
  color?: string;
}> = ({ cards, onDrop, Icon, color }) => (
  <div className="h-full border border-gray-600 rounded-lg shadow-inner shadow-black/30 flex flex-col items-center justify-center">
    <DropZone onDrop={onDrop} Icon={Icon} color={color} />
    {cards.map((card, i) => (
      <div
        key={i}
        className="w-[130px] h-full bg-red-600 text-white border-2 border-white rounded-md shadow-md flex flex-col items-center justify-center"
      >
        <span>{card.suit}</span>
        <span>{card.rank}</span>
        <span>{card.value}</span>
      </div>
    ))}
  </div>
);

const PlaySection: FC = () => {
  const [heartCards, setHeartCards] = useState<Card[]>([]);
  const [diamondCards, setDiamondCards] = useState<Card[]>([]);
  const [clubCards, setClubCards] = useState<Card[]>([]);
  const [spadeCards, setSpadeCards] = useState<Card[]>([]);

  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const ranks = [
    { rank: "A", value: 1 },
    { rank: "2", value: 2 },
    { rank: "3", value: 3 },
    { rank: "4", value: 4 },
    { rank: "5", value: 5 },
    { rank: "6", value: 6 },
    { rank: "7", value: 7 },
    { rank: "8", value: 8 },
    { rank: "9", value: 9 },
    { rank: "10", value: 10 },
    { rank: "J", value: 11 },
    { rank: "Q", value: 12 },
    { rank: "K", value: 13 },
  ];

  const hand: Card[] = useMemo(() => {
    const deck: Card[] = [];

    for (const suit of suits) {
      for (const { rank, value } of ranks) {
        deck.push({
          suit,
          rank,
          value,
          code: `${rank}${suit[0].toUpperCase()}`,
          img: ``,
        });
      }
    }

    return [...deck].sort(() => Math.random() - 0.5).slice(0, 7);
  }, []);

  const handleDrop = (suit: string) => (item: { card: Card }) => {
    const { card } = item;

    switch (suit) {
      case "hearts":
        setHeartCards((prev) => [...prev, card]);
        break;
      case "diamonds":
        setDiamondCards((prev) => [...prev, card]);
        break;
      case "clubs":
        setClubCards((prev) => [...prev, card]);
        break;
      case "spades":
        setSpadeCards((prev) => [...prev, card]);
        break;
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* Game Controls */}
      <div className="px-[10%] flex gap-2 my-2">
        {["New Game", "Restart Game", "Pause Game", "About", "Options"].map(
          (text, idx) => (
            <button key={idx} className="text-[#ca0639] text-lg font-bold">
              {text}
              {idx < 4 && " | "}
            </button>
          )
        )}
      </div>

      {/* Play Area */}
      <div className="bg-[#00a000] w-full h-screen border-2 border-black rounded-lg flex flex-col items-center pb-5">
        {/* Timer and Moves */}
        <div className="flex w-full justify-between items-center text-white p-2">
          <span>hh:mm:ss</span>
          <span>0 Moves</span>
        </div>

        {/* Card Display Area */}
        <div className="flex flex-row-reverse justify-center w-full h-full">
          {/* Drop Zones for Suits */}
          <div className="flex justify-between items-center mx-5 py-2 w-[70%] h-[45%]">
            <SuitDropZone
              cards={heartCards}
              onDrop={handleDrop("hearts")}
              Icon={RiPokerHeartsFill}
              color="#ca0639"
            />
            <SuitDropZone
              cards={spadeCards}
              onDrop={handleDrop("spades")}
              Icon={RiPokerSpadesFill}
            />
            <SuitDropZone
              cards={diamondCards}
              onDrop={handleDrop("diamonds")}
              Icon={RiPokerDiamondsFill}
              color="#ca0639"
            />
            <SuitDropZone
              cards={clubCards}
              onDrop={handleDrop("clubs")}
              Icon={RiPokerClubsFill}
            />
          </div>

          {/* Hand Display */}
          <div className="flex py-2 w-[20%] h-[45%] m-auto">
            <div className="flex justify-center h-full">
              {hand.map((card, i) => (
                <DraggableCard key={i} card={card} index={i} vertical={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaySection;
