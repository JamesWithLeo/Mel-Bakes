import { v2 as cloudinary } from 'cloudinary'


const cloudinaryConfigure = () => {
  cloudinary.config({
    cloud_name: 'dupzzryrz',
    api_key: '267777685656854',
    api_secret: 'Veky4CcT0jwKbpDLF2APg9EATRg'
  })
}
export default cloudinaryConfigure;

export const getAssetInfo = async (publicId) => {
  // Return colors in the response
  const options = {
    colors: true,
  };

  try {
    // Get details about the asset
    const result = await cloudinary.api.resource(publicId, options);

    return result.url;
  } catch (error) {
    console.error(error);
  }
};
