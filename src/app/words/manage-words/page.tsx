"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

function DraggableItem({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="bg-white p-2 border rounded mb-1 cursor-move"
    >
      {id}
    </div>
  );
}

function DroppableZone({ id, items }: any) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 min-h-[150px] w-full border rounded ${
        isOver ? "bg-green-100" : "bg-gray-100"
      }`}
    >
      <h2 className="text-lg font-bold mb-2">{id}</h2>
      {items.map((item: string) => (
        <DraggableItem key={item} id={item} />
      ))}
    </div>
  );
}

export default function WordDragManager() {
  const [knownWords, setKnownWords] = useState(["Apple", "Banana"]);
  const [unknownWords, setUnknownWords] = useState(["Cactus", "Dragonfruit"]);
  const [activeId, setActiveId] = useState<string | null>(null);

  function moveItem(item: string, from: string, to: string) {
    if (from === to) return;
    if (from === "Known") {
      setKnownWords((prev) => prev.filter((w) => w !== item));
      setUnknownWords((prev) => [...prev, item]);
    } else {
      setUnknownWords((prev) => prev.filter((w) => w !== item));
      setKnownWords((prev) => [...prev, item]);
    }
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={(event) => {
        setActiveId(event.active.id as string);
      }}
      onDragEnd={(event) => {
        const { active, over } = event;
        setActiveId(null);

        if (over && active.id !== over.id) {
          const from = knownWords.includes(active.id as string) ? "Known" : "Unknown";
          moveItem(active.id as string, from, over.id as string);
        }
      }}
    >
      <div className="flex gap-6 p-4">
        <DroppableZone id="Known" items={knownWords} />
        <DroppableZone id="Unknown" items={unknownWords} />
      </div>

      <DragOverlay>
        {activeId ? (
          <div className="bg-white p-2 border rounded shadow-lg">{activeId}</div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
