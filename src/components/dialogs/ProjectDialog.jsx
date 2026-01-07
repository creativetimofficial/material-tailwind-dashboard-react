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

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low', color: 'green' },
  { value: 'medium', label: 'Medium', color: 'blue' },
  { value: 'high', label: 'High', color: 'orange' },
  { value: 'critical', label: 'Critical', color: 'red' },
];

const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

export const ProjectDialog = React.memo(
  ({
    open,
    mode = 'add', // 'add' or 'edit'
    project = null,
    onClose,
    onSave,
  }) => {
    const [formData, setFormData] = React.useState({
      name: '',
      description: '',
      budget: '',
      deadline: '',
      priority: 'medium',
      status: 'active',
      client: '',
      completion: 0,
    });

    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    // Initialize form data when dialog opens
    React.useEffect(() => {
      if (open) {
        if (mode === 'edit' && project) {
          setFormData({
            name: project.name || '',
            description: project.description || '',
            budget: project.budget || '',
            deadline: project.deadline || '',
            priority: project.priority || 'medium',
            status: project.status || 'active',
            client: project.client || '',
            completion: project.completion || 0,
          });
        } else {
          // Reset for add mode
          setFormData({
            name: '',
            description: '',
            budget: '',
            deadline: '',
            priority: 'medium',
            status: 'active',
            client: '',
            completion: 0,
          });
        }
        setErrors({});
      }
    }, [open, mode, project]);

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
        newErrors.name = 'Project name is required';
      }

      if (!formData.budget || parseFloat(formData.budget) <= 0) {
        newErrors.budget = 'Valid budget is required';
      }

      if (!formData.deadline) {
        newErrors.deadline = 'Deadline is required';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
      if (!validate()) return;

      setLoading(true);

      try {
        const projectData = {
          ...formData,
          budget: parseFloat(formData.budget),
          completion: parseInt(formData.completion, 10),
        };

        if (mode === 'edit' && project) {
          projectData.id = project.id;
        }

        await onSave?.(projectData);
        handleClose();
      } catch (error) {
        console.error('Error saving project:', error);
        setErrors({ submit: error.message });
      } finally {
        setLoading(false);
      }
    };

    const handleClose = () => {
      setFormData({
        name: '',
        description: '',
        budget: '',
        deadline: '',
        priority: 'medium',
        status: 'active',
        client: '',
        completion: 0,
      });
      setErrors({});
      onClose?.();
    };

    return (
      <Dialog open={open} handler={handleClose} size="lg">
        {/* Header */}
        <DialogHeader className="flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            {mode === 'add' ? 'Add New Project' : 'Edit Project'}
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
            {/* Project Name */}
            <div>
              <Input
                label="Project Name *"
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

            {/* Description */}
            <div>
              <Textarea
                label="Description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
              />
            </div>

            {/* Client */}
            <div>
              <Input
                label="Client"
                value={formData.client}
                onChange={(e) => handleChange('client', e.target.value)}
              />
            </div>

            {/* Budget and Deadline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  label="Budget *"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => handleChange('budget', e.target.value)}
                  error={!!errors.budget}
                />
                {errors.budget && (
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.budget}
                  </Typography>
                )}
              </div>

              <div>
                <Input
                  label="Deadline *"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleChange('deadline', e.target.value)}
                  error={!!errors.deadline}
                />
                {errors.deadline && (
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.deadline}
                  </Typography>
                )}
              </div>
            </div>

            {/* Priority and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Select
                  label="Priority"
                  value={formData.priority}
                  onChange={(value) => handleChange('priority', value)}
                >
                  {PRIORITY_OPTIONS.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </div>

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
            </div>

            {/* Completion (only for edit mode) */}
            {mode === 'edit' && (
              <div>
                <Typography variant="small" className="font-semibold mb-2">
                  Completion: {formData.completion}%
                </Typography>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.completion}
                  onChange={(e) => handleChange('completion', e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            )}

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
            {mode === 'add' ? 'Add Project' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </Dialog>
    );
  }
);

ProjectDialog.displayName = 'ProjectDialog';
