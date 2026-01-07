import React from 'react';
import { Input as MTInput } from '@material-tailwind/react';

export const Input = React.memo(
  ({
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    error,
    helperText,
    icon: Icon,
    disabled = false,
    required = false,
    className = '',
    ...props
  }) => {
    return (
      <div className="w-full">
        <MTInput
          type={type}
          label={label}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          icon={Icon && <Icon className="h-5 w-5" />}
          disabled={disabled}
          error={error}
          required={required}
          className={className}
          {...props}
        />
        {helperText && (
          <p className={`text-xs mt-1 ${error ? 'text-red-600' : 'text-gray-600'}`}>{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
