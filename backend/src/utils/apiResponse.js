export function sendSuccess(res, data = null, message = 'Success', statusCode = 200, meta = null) {
  const response = {
    success: true,
    message,
    data,
  };

  if (meta) {
    response.meta = meta;
  }

  return res.status(statusCode).json(response);
}

export function sendCreated(res, data = null, message = 'Created successfully', meta = null) {
  return sendSuccess(res, data, message, 201, meta);
}

export function sendNoContent(res) {
  return res.status(204).send();
}

export default {
  sendSuccess,
  sendCreated,
  sendNoContent,
};
