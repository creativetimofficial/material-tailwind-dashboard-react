import { Dialog, DialogBody, DialogHeader, DialogFooter, Button, Typography } from "@material-tailwind/react";

export default function PostLikeUserDialog({ open, onClose, postTitle, likeUsers }) {
  return (
    <Dialog open={open} handler={onClose} size="md">
      <DialogHeader>Danh sách user đã like - {postTitle}</DialogHeader>
      <DialogBody className="space-y-3 max-h-[400px] overflow-y-auto">
        {likeUsers.length === 0 ? (
          <Typography>Chưa có ai like bài viết này.</Typography>
        ) : (
          likeUsers.map((user) => (
            <div key={user._id} className="flex items-center gap-3">
              <img
                src={
                  user.avatar?.startsWith("http")
                    ? user.avatar
                    : `https://api-ndolv2.nongdanonline.cc${user.avatar}`
                }
                alt={user.fullName}
                className="w-10 h-10 rounded-full"
              />
              <Typography>{user.fullName}</Typography>
            </div>
          ))
        )}
      </DialogBody>
      <DialogFooter>
        <Button color="red" onClick={onClose}>Đóng</Button>
      </DialogFooter>
    </Dialog>
  );
}
