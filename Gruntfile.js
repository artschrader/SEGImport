module.exports = function(grunt){
    grunt.initConfig({
        jshint : {
            files : ['bin/*','lib/*js', 'routes/*js', './*js' ]
        },
        watch : {
            files : ['bin/*','lib/*js', 'routes/*js', './*js' ],
            tasks : ['jshint']
        }
    });
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
};