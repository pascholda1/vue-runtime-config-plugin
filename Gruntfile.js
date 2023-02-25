module.exports = function(grunt) {
  grunt.initConfig({
    babel: {
      options: {
        sourceMap: false,
        presets: ['@babel/preset-env'],
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: [
              '**/*.js',
            ],
            dest: './dist/',
            ext: '.js',
          }],
      },
    },
  });

  grunt.loadNpmTasks('grunt-babel');

  grunt.registerTask('default', ['vueify', 'babel']);
};
