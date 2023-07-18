module.exports = {
   images: {
      domains: ["drive.google.com", "res.cloudinary.com", "images.unsplash.com"]
   },
   webpack(config) {
      config.module.rules.push({
         test: /\.stories\.tsx$/,
         use: "null-loader"
      });

      return config;
   }
   //swcMinify: true
};
