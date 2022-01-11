const yaml = require("js-yaml");

module.exports = function (config) {

    let env = process.env.ENV;
    let folderPrefix = env == 'development' ? "" : "/generative";

    // Global Variables
    config.addGlobalData("assetsFolder", `${folderPrefix}/assets`);
    config.addGlobalData("sketchesFolder", `${folderPrefix}/sketches`);

    // Static assets to pass through
    config.addPassthroughCopy({ 'src/sketches': 'sketches' });
    config.addPassthroughCopy({ 'src/assets': 'assets' });

    // Custom data files
    config.addDataExtension("yaml", contents => yaml.load(contents));

    // Filters & Shortcodes
    config.addFilter("sortByDate", (values) => {
        return [...values].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    });

    config.addPairedShortcode('layoutblock', (content, name) => {
        if (!this.layoutblock) this.layoutblock = {};
        this.layoutblock[name] = content;
    });

    config.addShortcode('renderlayoutblock', (name) => {
        return (this.layoutblock || {})[name];
    });

    config.addShortcode('setVar', (name, value) => {
        if (!this.templateVars) this.templateVars = {};
        this.templateVars[name] = value;
    });

    config.addShortcode('getVar', (name) => {
        return (this.templateVars || {})[name];
    });


    return {
        dir: {
            input: 'src/pages',
            output: '_site',
        },
        passthroughFileCopy: true,
    };
};
