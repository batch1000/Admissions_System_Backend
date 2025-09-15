const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'djgwb5qgp',
    api_key: '699228672583447',
    api_secret: 'Ptn-QHrc3iDzYtzA6q5_mpcPrts'
});

async function uploadToCloudinary(buffer) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'image', folder: 'images' },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        stream.end(buffer);
    });
}

async function deleteImageFromCloudinary(publicId) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, { resource_type: 'image' }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
}
module.exports = {
    uploadToCloudinary,
    deleteImageFromCloudinary,
};
