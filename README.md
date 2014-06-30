# ngHelperBusy

This angularjs extension offers a full screen activity indicator based on CSS3 animations. To install the component in your existing angular app follow these steps:

### Install ng-helper-busy 
```
bower install ng-helper-busy --save
```

### Include the angular module
```javascript
angular.module('appApp', [
    'ngHelperBusy'
]);
```

### Add the indicator directive somewhere in your markup
```html
<div ng-helper-busy></div>
```

### Use the $busy service to make the indicator visible

The following sample demonstrates using the busy indicator with a simple timeout of 5 seconds. It's possible to use every promise with the busy service:
```javascript
console.log("Starting busy sequences for 5 seconds");

// Generate a promise which will be observed
var timeoutPromise = $timeout(function() {
  console.log("The timeout expired...");
}, 5000);

// Start the busy layer for the time the promise is not resolved
$busy.during(timeoutPromise).then(function() {
  console.log("The busy sequences of 5 seconds is over");
})
```

The second example shows using the busy service together with a network request through $http service:
```javascript
$busy.during($http.get('<<URL to a RESTful API or data>>'))
```

The during method acts as promise proxy so every promise can be used in the same way it was used without the during method:
```javascript
$busy.during($http.get('<<URL to a RESTful API or data>>')).then(function(data) {
  alert("Request finished");
})
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :)

## Contributors

* [CSS3 activity indicators](https://github.com/lukehaas/css-loaders)

## License

[MIT License](https://github.com/lukehaas/css-loaders/blob/step2/LICENSE)
