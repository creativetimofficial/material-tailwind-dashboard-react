import React from 'react';
import { Button } from '../ui';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
  Textarea,
  Typography,
} from '@material-tailwind/react';

const DEPARTMENT_OPTIONS = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'product', label: 'Product' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'hr', label: 'Human Resources' },
  { value: 'finance', label: 'Finance' },
];

const STATUS_OPTIONS = [
  { value: 'online', label: 'Online' },
  { value: 'offline', label: 'Offline' },
  { value: 'away', label: 'Away' },
  { value: 'busy', label: 'Busy' },
];

export const MemberDialog = React.memo(
  ({
    open,
    mode = 'add', // 'add' or 'edit'
    member = null,
    onClose,
    onSave,
  }) => {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      phone: '',
      role: '',
      department: 'engineering',
      status: 'offline',
      bio: '',
      location: '',
      joinDate: '',
    });

    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    // Initialize form data when dialog opens
    React.useEffect(() => {
      if (open) {
        if (mode === 'edit' && member) {
          setFormData({
            name: member.name || '',
            email: member.email || '',
            phone: member.phone || '',
            role: member.role || '',
            department: member.department || 'engineering',
            status: member.status || 'offline',
            bio: member.bio || '',
            location: member.location || '',
            joinDate: member.joinDate || '',
          });
        } else {
          // Reset for add mode
          setFormData({
            name: '',
            email: '',
            phone: '',
            role: '',
            department: 'engineering',
            status: 'offline',
            bio: '',
            location: '',
            joinDate: new Date().toISOString().split('T')[0],
          });
        }
        setErrors({});
      }
    }, [open, mode, member]);

    const handleChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Clear error for this field
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    };

    const validate = () => {
      const newErrors = {};

      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }

      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }

      if (!formData.role.trim()) {
        newErrors.role = 'Role is required';
      }

      if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
        newErrors.phone = 'Invalid phone format';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
      if (!validate()) return;

      setLoading(true);

      try {
        const memberData = { ...formData };

        if (mode === 'edit' && member) {
          memberData.id = member.id;
        }

        await onSave?.(memberData);
        handleClose();
      } catch (error) {
        console.error('Error saving member:', error);
        setErrors({ submit: error.message });
      } finally {
        setLoading(false);
      }
    };

    const handleClose = () => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: '',
        department: 'engineering',
        status: 'offline',
        bio: '',
        location: '',
        joinDate: '',
      });
      setErrors({});
      onClose?.();
    };

    return (
      <Dialog open={open} handler={handleClose} size="lg">
        {/* Header */}
        <DialogHeader className="flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            {mode === 'add' ? 'Add Team Member' : 'Edit Team Member'}
          </Typography>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </DialogHeader>

        {/* Body */}
        <DialogBody divider className="max-h-[60vh] overflow-y-auto">
          <div className="space-y-4">
            {/* Name */}
            <div>
              <Input
                label="Full Name *"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={!!errors.name}
              />
              {errors.name && (
                <Typography variant="small" color="red" className="mt-1">
                  {errors.name}
                </Typography>
              )}
            </div>

            {/* Email */}
            <div>
              <Input
                label="Email Address *"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                error={!!errors.email}
              />
              {errors.email && (
                <Typography variant="small" color="red" className="mt-1">
                  {errors.email}
                </Typography>
              )}
            </div>

            {/* Phone */}
            <div>
              <Input
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                error={!!errors.phone}
              />
              {errors.phone && (
                <Typography variant="small" color="red" className="mt-1">
                  {errors.phone}
                </Typography>
              )}
            </div>

            {/* Role and Department */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  label="Role *"
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  error={!!errors.role}
                />
                {errors.role && (
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.role}
                  </Typography>
                )}
              </div>

              <div>
                <Select
                  label="Department"
                  value={formData.department}
                  onChange={(value) => handleChange('department', value)}
                >
                  {DEPARTMENT_OPTIONS.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>

            {/* Status and Join Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Select
                  label="Status"
                  value={formData.status}
                  onChange={(value) => handleChange('status', value)}
                >
                  {STATUS_OPTIONS.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </div>

              <div>
                <Input
                  label="Join Date"
                  type="date"
                  value={formData.joinDate}
                  onChange={(e) => handleChange('joinDate', e.target.value)}
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <Input
                label="Location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
              />
            </div>

            {/* Bio */}
            <div>
              <Textarea
                label="Bio"
                value={formData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                rows={3}
              />
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <Typography variant="small" color="red">
                  {errors.submit}
                </Typography>
              </div>
            )}
          </div>
        </DialogBody>

        {/* Footer */}
        <DialogFooter className="gap-2">
          <Button variant="outlined" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button color="blue" onClick={handleSave} loading={loading} disabled={loading}>
            {mode === 'add' ? 'Add Member' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </Dialog>
    );
  }
);

MemberDialog.displayName = 'MemberDialog';
