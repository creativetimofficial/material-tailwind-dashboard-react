import React from 'react';
import { Card as MTCard, CardHeader, CardBody, CardFooter } from '@material-tailwind/react';

export const Card = React.memo(
  ({
    children,
    header,
    footer,
    className = '',
    bodyClassName = '',
    variant = 'filled',
    ...props
  }) => {
    return (
      <MTCard className={`border border-gray-200 ${className}`} variant={variant} {...props}>
        {header && (
          <CardHeader floated={false} shadow={false} className="rounded-none bg-gray-50 p-6">
            {header}
          </CardHeader>
        )}
        <CardBody className={bodyClassName}>{children}</CardBody>
        {footer && <CardFooter className="pt-0">{footer}</CardFooter>}
      </MTCard>
    );
  }
);

Card.displayName = 'Card';
