class Ajax{
  sendPost(url, data, callback){
    let requestString = {method: 'POST', url: url};
    if (typeof data !== 'undefined' && data !== '') {
      requestString.data = data;
    }
    $.ajax(requestString).done(function( response ) {
      callback(response);
    });
  }

  sendGet(url, data, callback){
    let requestString = {method: 'GET', url: url};
    if (typeof data !== 'undefined' && data !== '') {
      requestString.data = data;
    }
    $.ajax(requestString).done(function( response ) {
      callback(response);
    });
  }
}

// $.ajax({
//   method: 'POST',
//   url: '/auth',
//   data: { email: mail, password: pw }
// })
//   .done(function( response ) {
//     if(response === true){
//       window.location.replace('/mail');
//     } else {
//       alert('please fill out all the fields');
//     }
//   });