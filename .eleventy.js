module.exports = function (config) {
    config.setLiquidOptions({
        dynamicPartials: true,
    });

    // Static assets to pass through
    config.addPassthroughCopy({ 'src/sketches': 'sketches' });
    config.addPassthroughCopy({ 'src/assets': 'assets' });

    return {
        dir: {
            input: 'src/pages',
            output: 'docs',
        },
        passthroughFileCopy: true,
        templateFormats: ['html', 'md', 'liquid'],
        htmlTemplateEngine: 'liquid',
        dataTemplateEngine: 'liquid',
        markdownTemplateEngine: 'liquid',
    };
};
