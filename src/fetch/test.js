import 'whatwg-fetch';

export function fetDate() {
  let result = fetch('/api/1',{
    headers: {
      'Accept': 'application/json, text/plain, */*' 
    }
  });

  result.then(res => {
    return res.text();
  }).then(text => {
    console.log(text);
  });

  let result2 = fetch('/api/2',{
    headers: {
      'Accept': 'application/json, text/plain, */*' 
    }
  });

  result2.then(res => {
    return res.json();
  }).then(json => {
    console.log(json);
  });


}