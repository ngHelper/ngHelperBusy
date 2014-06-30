# ngHelperBusy

This angularjs extension offers a full screen activity indicator based on CSS3 animations. To install the component in your existing angular app follow these steps:

1. Install ng-helper-busy 
```
bower install ng-helper-busy --save
```

2. Add the indicator directive somewhere in your markup
```html
<div ng-helper-busy></div>
```

3. Use the $busy service to make the indicator visible
```javascript
console.log("Starting busy sequences for 2 seconds");

// Generate a promise which will be observed
var timeoutPromise = $timeout(function() {
  console.log("The timeout expired...");
}, 5000);

// Start the busy layer for the time the promise is not resolved
$busy.during(timeoutPromise).then(function() {
  console.log("The busy sequences of 2 seconds is over");
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
