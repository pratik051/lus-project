import addressService from '../services/addressService.js';
import { sendSuccess, sendCreated, sendNoContent } from '../utils/apiResponse.js';

export const getAddresses = async (req, res, next) => {
  try {
    const addresses = await addressService.getUserAddresses(req.user._id);
    return sendSuccess(res, addresses, 'User saved addresses');
  } catch (err) {
    next(err);
  }
};

export const createAddress = async (req, res, next) => {
  try {
    const address = await addressService.createAddress(req.user._id, req.body);
    return sendCreated(res, address, 'Address added successfully');
  } catch (err) {
    next(err);
  }
};

export const updateAddress = async (req, res, next) => {
  try {
    const address = await addressService.updateAddress(req.user._id, req.params.id, req.body);
    return sendSuccess(res, address, 'Address updated successfully');
  } catch (err) {
    next(err);
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
    await addressService.deleteAddress(req.user._id, req.params.id);
    return sendNoContent(res);
  } catch (err) {
    next(err);
  }
};

export default {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
};
