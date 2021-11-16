const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  keyFilename: "./PATH/MY_GCP_KEY.json",
});

const bucket = storage.bucket(MY_BUCKET);

const uploadImage = async (file) => {
  const { filename, buffer } = file;
  const fileHandle = bucket.file(filename);
  const [fileExists] = await fileHandle.exists();
  if (fileExists === false) {
    return fileHandle.save(buffer);
  }
  return new Promise((resolve, reject) => resolve(filename));
};

module.exports = uploadImage;
