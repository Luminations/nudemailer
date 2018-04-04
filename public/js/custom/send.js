require(['../jquery.min', 'ajax', 'serialize', 'redirect'],
function(){
  $('form').on('submit', function(event){
    event.preventDefault();
    let serializer = new Serializer();
    let dataObj = serializer.serializeForm( $( this ) );
    if(dataObj.length === 3 && dataObj.name === 'send'){
      let ajaxData = {recipient: dataObj.values[0], about: dataObj.values[1], content: dataObj.values[2]};
      let ajax = new Ajax();
      ajax.sendPost('/send', ajaxData, function ( returnValue ) {
        console.log(returnValue);
      })
    } else {
      alert('please fill out all the fields.');
    }
    // if(serializedData[0].value.length > 0 && serializedData[1].value.length > 0){
    //   let ajaxData = {email: serializedData[0].value, password: serializedData[1].value};
    //   let ajax = new Ajax();
    //   ajax.sendPost('/auth', ajaxData, function(returnValue){
    //     if(returnValue){
    //       let redirect = new Redirect();
    //       redirect.to(returnValue);
    //     } else {
    //       alert('please fill out all the fields.');
    //     }
    //   });
    //
    // }
  });
});