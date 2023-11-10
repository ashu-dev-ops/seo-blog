const ImageKit = require("imagekit");
const intitImagekit = () => {
  var imagekit = new ImageKit({
    publicKey: "public_EYu4ejA7jiqaFL4nnEIfG3JVI3o=",
    privateKey: "private_ej0KyKQJJDjBHMeKM4WfOfWY6GE=",
    urlEndpoint: "https://ik.imagekit.io/88u0e3wp7",
  });
  return imagekit;
};
export default intitImagekit