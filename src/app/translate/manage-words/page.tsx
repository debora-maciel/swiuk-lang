"use client";
import { useEffect, useState } from "react";
import {
    DndContext,
    closestCenter,
    useDraggable,
    useDroppable,
} from "@dnd-kit/core";

function DraggableItem({ id, label }: { id: string, label: string }) {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className="bg-white p-2 border rounded mb-1 cursor-move"
        >
            {id} + {label}
        </div>
    );
}

function DroppableZone({
    id,
    items
}: {
    id: string;
    items: string[];
    onDrop: (item: string, fromZone: string, toZone: string) => void;
}) {
    const { isOver, setNodeRef } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className={`p-4 min-h-[150px] w-full overflow-y-scroll border rounded ${isOver ? "bg-blue-100" : "bg-gray-100"
                }`}
        >
            <h2 className="text-sm font-bold mb-2">{id}</h2>
            {items.map((item) => (
                <DraggableItem key={item} label={id} id={item} />
            ))}
        </div>
    );
}

export default function WordDragManager() {
    const [knownWords, setKnownWords] = useState<string[]>([]);
    const [unknownWords, setUnknownWords] = useState<string[]>([]);

    useEffect(() => {
        const known = JSON.parse(localStorage.getItem("knownWords") || "[]");
        const notKnown = JSON.parse(localStorage.getItem("notKnownWords") || "[]");

        setKnownWords(known);
        setUnknownWords(notKnown);
    }, []);

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
            onDragEnd={(event) => {
                const { active, over } = event;
                if (over) {
                    const from = knownWords.includes(active.id.toString()) ? "Known" : "Unknown";
                    moveItem(active.id as string, from, over.id as string);
                }
            }}
        >
            <div className="flex gap-6 p-4 overflow-y-scroll max-h-5/6">
                <DroppableZone
                    id="Known"
                    items={knownWords}
                    onDrop={moveItem}
                />
                <DroppableZone
                    id="Unknown"
                    items={unknownWords}
                    onDrop={moveItem}
                />
            </div>
        </DndContext>
    );
}
