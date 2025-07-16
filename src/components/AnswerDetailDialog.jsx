// src/components/AnswerDetailDialog.jsx
import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const AnswerDetailDialog = ({ open, onClose, data }) => {
  if (!data) return null;
  return (
    <Dialog open={open} handler={onClose} size="md">
      <DialogHeader>Chi tiết câu trả lời</DialogHeader>
      <DialogBody className="space-y-4">
        <Typography variant="small"><strong>Farm ID:</strong> {data.farmId}</Typography>
        <Typography variant="small"><strong>Question ID:</strong> {data.questionId}</Typography>
        <Typography variant="small">
          <strong>Selected Options:</strong> {data.selectedOptions?.join(", ") || "—"}
        </Typography>
        <Typography variant="small"><strong>Other Text:</strong> {data.otherText || "—"}</Typography>
        <Typography variant="small"><strong>User ID:</strong> {data.userId || "—"}</Typography>
        <div>
          <strong>Tệp đính kèm:</strong>
          <div className="mt-1">
            {data.uploadedFiles?.length > 0 ? (
              data.uploadedFiles.map((file, idx) => (
                <a
                  key={idx}
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 underline"
                >
                  File {idx + 1}
                </a>
              ))
            ) : (
              <Typography variant="small">Không có</Typography>
            )}
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="outlined" onClick={onClose}>
          Đóng
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AnswerDetailDialog;
