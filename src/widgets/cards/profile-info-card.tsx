import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import type { ReactNode } from 'react';

// Define the props interface
interface ProfileInfoCardProps {
  title: string;
  description?: ReactNode; // Optional, defaults to null
  details?: {
    [key: string]: ReactNode; // Object with string keys and ReactNode values
  };                         // Optional, defaults to {}
  action?: ReactNode;      // Optional, defaults to null
}

export function ProfileInfoCard({
  title,
  description = null,
  details = {},
  action = null,
}: ProfileInfoCardProps) {
  return (
    <Card color="transparent" shadow={false}>
      <CardHeader
        color="transparent"
        shadow={false}
        floated={false}
        className="mx-0 mt-0 mb-4 flex items-center justify-between gap-4"
      >
        <Typography variant="h6" color="blue-gray">
          {title}
        </Typography>
        {action}
      </CardHeader>
      <CardBody className="p-0">
        {description && ( // description can be null, so this check is fine
          <Typography
            variant="small"
            className="font-normal text-blue-gray-500"
          >
            {description}
          </Typography>
        )}
        {description && details && Object.keys(details).length > 0 ? ( // Check if details is not empty
          <hr className="my-8 border-blue-gray-50" />
        ) : null}
        {details && Object.keys(details).length > 0 && ( // Check if details is not empty
          <ul className="flex flex-col gap-4 p-0">
            {Object.keys(details).map((el, key) => ( // el is string, key is number (index)
              <li key={key} className="flex items-center gap-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  {el}:
                </Typography>
                {/* details[el] is ReactNode */}
                {typeof details[el] === "string" ? (
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-500"
                  >
                    {details[el]}
                  </Typography>
                ) : (
                  details[el]
                )}
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}

// PropTypes and defaultProps are removed as they are handled by TypeScript interface and default parameters.

ProfileInfoCard.displayName = "/src/widgets/cards/profile-info-card.tsx"; // Updated displayName

export default ProfileInfoCard;
