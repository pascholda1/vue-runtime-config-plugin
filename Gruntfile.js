module.exports = function(grunt) {
  grunt.initConfig({
    vueify: {
      components: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: 'components/**/*.vue',
            dest: 'dist/',
            ext: '.vue.js',
          },
        ],
      },
    },
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

  grunt.loadNpmTasks('grunt-vueify');
  grunt.loadNpmTasks('grunt-babel');

  grunt.registerTask('default', ['vueify', 'babel']);
};
