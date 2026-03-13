module.exports = function (eleventyConfig) {
   // Pass static assets through to _site without processing
   eleventyConfig.addPassthroughCopy("*.css");
   eleventyConfig.addPassthroughCopy("*.pdf");

   eleventyConfig.addPassthroughCopy("images");
   eleventyConfig.addPassthroughCopy("fonts");
   eleventyConfig.addPassthroughCopy("favicon");

   return {
      dir: {
         input: ".",
         output: "_site",
         includes: "_includes",
      },
   };
};
