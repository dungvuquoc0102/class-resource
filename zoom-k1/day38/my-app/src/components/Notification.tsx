import { memo } from "react";

export const Notification = memo(
  ({ ref }: { ref: React.RefObject<number> }) => {
    return (
      <div>
        <button
          onClick={() => {
            console.log(ref);
          }}
        >
          Hello
        </button>
      </div>
    );
  },
);
