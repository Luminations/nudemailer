require.config({
  paths: {
    path: ''
  }
});
require(['../jquery.min', 'ajax', 'serialize', 'redirect'],
function(){
  $('form').on('submit', function(event){
    event.preventDefault();
    let serializer = new Serializer();
    let dataObj = serializer.serializeForm( $( this ) );
    if(dataObj.length === 2 && dataObj.name === 'login'){
      let ajaxData = {email: dataObj.values[0], password: dataObj.values[1]};
      let ajax = new Ajax();
      ajax.sendPost('/auth', ajaxData, function(returnValue){
        if(returnValue){
          let redirect = new Redirect();
          redirect.to(returnValue);
        } else {
          alert('please fill out all the fields.');
        }
      });

    }
  });
});

