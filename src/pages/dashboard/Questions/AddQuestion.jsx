import React from 'react'

export const AddQuestion = ({
  handleAddChange,
  handleAddSave,
  handleCloseAddDialog,
  handleOpenAddDialog,
  addDialog,
  addValue,
  setAddValue
}) => {
  return (
    <div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 shadow"
        onClick={handleOpenAddDialog}
      >
        Thêm câu hỏi
      </button>
      

      {addDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[350px] max-w-[90vw]">
            <div className="font-bold text-lg mb-4">Thêm câu hỏi mới</div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Nội dung câu hỏi</label>
              <input
                name="text"
                value={addValue.text}
                onChange={handleAddChange}
                className="border px-3 py-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Loại câu hỏi</label>
              <select
                name="type"
                value={addValue.type}
                onChange={handleAddChange}
                className="border px-3 py-2 rounded w-full mb-2"
              >
                <option value="single-choice">Chọn 1 đáp án</option>
                <option value="multi-choice">Chọn nhiều đáp án</option>
                <option value="text">Nhập thông tin</option>
                <option value="upload">Upload ảnh</option>
              </select>
            </div>
<div className="flex gap-4 mt-8">
</div>
            {[ "single-choice", "multiple-choice", "multi-choice"].includes(addValue.type) && Array.isArray(addValue.options) && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Tùy chọn đáp án</label>
                {addValue.options.length === 0 && (
                  <div className="text-gray-400 italic mb-2">Chưa có đáp án nào, hãy thêm đáp án mới.</div>
                )}
              
                {addValue.options.map((opt, idx) => (
                  <div key={idx} className="flex gap-2 mb-2 items-center">
                    <span className="w-6 text-gray-500 font-semibold">{String.fromCharCode(65 + idx)}.</span>
                    <input
                      value={opt}
                      onChange={e => handleAddChange(e, idx)}
                      className="border px-3 py-2 rounded w-full"
                      placeholder={`Đáp án ${String.fromCharCode(65 + idx)}`}
                    />
                    <button
                      type="button"
                      className="px-2 py-1 bg-red-400 text-white rounded hover:bg-red-600"
                      onClick={() => {
                        const newOptions = addValue.options.filter((_, i) => i !== idx);
                        setAddValue({ ...addValue, options: newOptions });
                      }}
                      disabled={addValue.options.length <= 1}
                      title={addValue.options.length <= 1 ? 'Phải có ít nhất 1 đáp án' : 'Xóa đáp án'}
                    >
                      Xóa
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 mt-2"
                  onClick={() => setAddValue({ ...addValue, options: [...addValue.options, ''] })}
                >
                  Thêm đáp án
                </button>
              </div>
            )}

          
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={handleCloseAddDialog}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleAddSave}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddQuestion