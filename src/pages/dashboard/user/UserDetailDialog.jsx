import React from "react";
import {
  Dialog, DialogHeader, DialogBody, DialogFooter, Typography, Avatar, Button
} from "@material-tailwind/react";

export default function UserDetailDialog({ open, onClose, user, addresses, onAddFarm }) {
  return (
    <Dialog open={open} handler={onClose} size="sm">
      <DialogHeader>Chi tiết người dùng</DialogHeader>
      <DialogBody className="space-y-2">
        {user ? (
          <div className="flex flex-col items-center text-center space-y-2">
            <Avatar src={user.avatar ? `https://api-ndolv2.nongdanonline.cc${user.avatar}` : ""} size="xl" />
            <Typography variant="h6">{user.fullName}</Typography>
            <Typography variant="small">ID: {user.id}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Phone: {user.phone || "N/A"}</Typography>
            <Typography>Roles: {Array.isArray(user.role) ? user.role.join(", ") : user.role}</Typography>
            <Typography>
              
              Trạng thái: {user.isActive===true ? (
                <span className="text-green-600 font-semibold">ĐÃ CẤP QUYỀN</span>
              ) : (
                <span className="text-gray-500 font-semibold">CHƯA CẤP QUYỀN</span>
              )}
            </Typography>
            <Typography className="font-bold">Địa chỉ:</Typography>
            {addresses.length ? addresses.map((addr, i) => (
              <Typography key={`${user.id}-addr-${i}`} className="text-sm">
                {addr.address} - {addr.ward}, {addr.district}, {addr.province}
              </Typography>
            )) : <Typography className="text-gray-400 text-sm">Không có địa chỉ</Typography>}
            <Button
              color="green"
              size="sm"
              className="mt-2"
              onClick={() => onAddFarm(user.id)}
            >
              Thêm nông trại cho người dùng này
            </Button>
          </div>
        ) : <Typography>Đang tải...</Typography>}
      </DialogBody>
      <DialogFooter>
        <Button variant="gradient" onClick={onClose}>Đóng</Button>
      </DialogFooter>
    </Dialog>
  );
}
