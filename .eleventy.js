module.exports = function (config) {

    // Global Variables
    config.addGlobalData("assetsFolder", "/generative/assets");
    config.addGlobalData("sketchesFolder", "/generative/sketches");

    // Static assets to pass through
    config.addPassthroughCopy({ 'src/sketches': 'sketches' });
    config.addPassthroughCopy({ 'src/assets': 'assets' });

    return {
        dir: {
            input: 'src/pages',
            output: '_site',
        },
        passthroughFileCopy: true,
        templateFormats: ['html', 'md', 'liquid'],
        htmlTemplateEngine: 'liquid',
        dataTemplateEngine: 'liquid',
        markdownTemplateEngine: 'liquid',
    };
};
