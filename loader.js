require.config({
  baseUrl: 'public',
  paths: {
    jquery: 'js/jquery.min.js'
  }
});

require(['jquery'],
function(){
  console.log()
});
