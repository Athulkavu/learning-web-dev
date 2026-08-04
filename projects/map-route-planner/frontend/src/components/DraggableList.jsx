import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';

export default function DraggableList({
  destinations,
  onReorderDestinations,
  onRemoveLocation,
  favorites = [],
  onToggleFavorite,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Requires 5px move to prevent accidental clicks from triggering drag
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = destinations.findIndex(
        (item) => String(item.id) === String(active.id)
      );
      const newIndex = destinations.findIndex(
        (item) => String(item.id) === String(over.id)
      );

      if (oldIndex !== -1 && newIndex !== -1) {
        const reordered = arrayMove(destinations, oldIndex, newIndex);
        onReorderDestinations(reordered);
      }
    }
  };

  const itemIds = destinations.map((d) => String(d.id));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        <div className="destinations-list">
          {destinations.map((loc, idx) => {
            const isFav = favorites.some(
              (f) =>
                String(f.name).trim() === String(loc.name).trim() ||
                String(f.id) === String(loc.id) ||
                (Math.abs(f.lat - loc.lat) < 0.0001 && Math.abs(f.lng - loc.lng) < 0.0001)
            );
            return (
              <SortableItem
                key={loc.id || idx}
                loc={loc}
                idx={idx}
                totalCount={destinations.length}
                onRemoveLocation={onRemoveLocation}
                isFav={isFav}
                onToggleFavorite={onToggleFavorite}
              />
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}
