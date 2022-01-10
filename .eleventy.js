module.exports = function (config) {

    let env = process.env.ENV;
    let folderPrefix = env == 'development' ? "" : "/generative";

    // Global Variables
    config.addGlobalData("assetsFolder", `${folderPrefix}/assets`);
    config.addGlobalData("sketchesFolder", `${folderPrefix}/sketches`);

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
