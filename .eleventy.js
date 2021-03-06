const yaml = require("js-yaml");

module.exports = function (config) {

    let env = process.env.ENV;
    let folderPrefix = env == 'development' ? "" : "/generative";

    // Global Variables
    config.addGlobalData("rootFolder", `${folderPrefix}`);
    config.addGlobalData("assetsFolder", `${folderPrefix}/assets`);
    config.addGlobalData("sketchesFolder", `${folderPrefix}/sketches`);
    config.addGlobalData("libFolder", `${folderPrefix}/lib`);

    // Static assets to pass through
    config.addPassthroughCopy({ 'src/sketches': 'sketches' });
    config.addPassthroughCopy({ 'src/assets': 'assets' });
    config.addPassthroughCopy({ 'src/lib': 'lib' });

    // watch targets
    config.addWatchTarget("src/lib");

    // Custom data files
    config.addDataExtension("yaml", contents => yaml.load(contents));

    // Filters & Shortcodes
    config.addFilter("sortByDate", (values) => {
        return [...values].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    });

    config.addShortcode("getTitle", () => {
        return this.title;
    });

    config.addShortcode("setTitle", (title) => {
        this.title = `${title} - generative`;
        return '';
    });

    return {
        dir: {
            input: 'src/pages',
            output: '_site',
        },
        passthroughFileCopy: true,
    };
};
