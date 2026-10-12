import Address from '../models/Address.js';
import { NotFoundError, ForbiddenError } from '../utils/errors.js';

export class AddressService {
  async getUserAddresses(userId) {
    return Address.find({ user: userId }).sort({ isDefault: -1, createdAt: -1 });
  }

  async createAddress(userId, addressData) {
    // If this is the user's first address, mark it as default
    const count = await Address.countDocuments({ user: userId });
    const isDefault = count === 0 || addressData.isDefault;

    const address = await Address.create({
      ...addressData,
      user: userId,
      isDefault,
    });

    return address;
  }

  async updateAddress(userId, addressId, updates) {
    const address = await Address.findOne({ _id: addressId, user: userId });
    if (!address) {
      throw new NotFoundError('Address not found or does not belong to you');
    }

    Object.assign(address, updates);
    await address.save();
    return address;
  }

  async deleteAddress(userId, addressId) {
    const address = await Address.findOneAndDelete({ _id: addressId, user: userId });
    if (!address) {
      throw new NotFoundError('Address not found or does not belong to you');
    }
    return address;
  }
}

export const addressService = new AddressService();
export default addressService;
