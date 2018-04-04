class Serializer{
  serializeForm(form){
    let raw = form.serializeArray();
    let returnValue = {name: form.attr('id'), values: [], length: 0};
    jQuery.each(raw, function ( index, value ) {
      if(jQuery.trim( value.value ) !== ''){
        returnValue.values.push(value.value);
      }
    });
    returnValue.length = returnValue.values.length;
    return returnValue;
  }
}