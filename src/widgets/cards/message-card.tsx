import { Avatar, Typography } from "@material-tailwind/react";
import type { ReactNode } from 'react'; // Import ReactNode for typing

// Define the props interface based on PropTypes
interface MessageCardProps {
  img: string;
  name: string;
  message: ReactNode; // PropTypes.node translates to ReactNode
  action?: ReactNode;  // Optional due to defaultProps, ReactNode can be null
}

export function MessageCard({ img, name, message, action = null }: MessageCardProps) {
  // Default value for action is handled by default parameter syntax
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Avatar
          src={img}
          alt={name}
          variant="rounded"
          className="shadow-lg shadow-blue-gray-500/25"
        />
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-1 font-semibold"
          >
            {name}
          </Typography>
          <Typography className="text-xs font-normal text-blue-gray-400">
            {message}
          </Typography>
        </div>
      </div>
      {action}
    </div>
  );
}

// PropTypes and defaultProps are no longer needed in TypeScript when using interfaces and default parameters.
// MessageCard.defaultProps = {
//   action: null,
// };

// MessageCard.propTypes = {
//   img: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   message: PropTypes.node.isRequired,
//   action: PropTypes.node,
// };

MessageCard.displayName = "/src/widgets/cards/message-card.tsx"; // Updated displayName

export default MessageCard;
