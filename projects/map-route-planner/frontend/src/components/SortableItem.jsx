import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function SortableItem({
  loc,
  idx,
  totalCount,
  onRemoveLocation,
  isFav,
  onToggleFavorite,
}) {
  const itemId = String(loc.id);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: itemId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 'auto',
  };

  let stopClass = 'stop-number';
  if (idx === 0) stopClass += ' start-stop';
  else if (idx === totalCount - 1) stopClass += ' end-stop';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`destination-card ${isDragging ? 'dragging' : ''}`}
    >
      {/* Visual 6-dots Drag Handle - attributes & listeners explicitly attached here */}
      <div
        className="drag-handle"
        title="Drag to reorder stop sequence"
        {...attributes}
        {...listeners}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="5" cy="3" r="1.5" />
          <circle cx="11" cy="3" r="1.5" />
          <circle cx="5" cy="8" r="1.5" />
          <circle cx="11" cy="8" r="1.5" />
          <circle cx="5" cy="13" r="1.5" />
          <circle cx="11" cy="13" r="1.5" />
        </svg>
      </div>

      <div className={stopClass}>{idx + 1}</div>

      <div className="destination-info">
        <div className="destination-name" title={loc.name}>
          {loc.shortName || loc.name}
        </div>
        <div className="destination-coords">
          {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}
        </div>
      </div>

      {onToggleFavorite && (
        <button
          className={`btn-star-inline ${isFav ? 'active' : ''}`}
          title={isFav ? 'Remove from favorites' : 'Add to favorites'}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(loc);
          }}
        >
          {isFav ? '★' : '☆'}
        </button>
      )}

      <button
        className="btn-icon"
        title="Remove stop"
        onClick={(e) => {
          e.stopPropagation();
          onRemoveLocation(loc.id);
        }}
      >
        ✕
      </button>
    </div>
  );
}
