# Browser Cache Helper

The `browser-cache-helper` library simplifies interactions with the browser's storage mechanisms, including `localStorage`, `sessionStorage`, and `IndexedDB`, providing a unified API to perform common operations such as setting, getting, and removing items.

## Installation

To install the library, run the following command:

```
npm install browser-cache-helper
```

## Usage

First, import the `BrowserCacheHelper` into your project:

```javascript
import BrowserCacheHelper from 'browser-cache-helper';
```

### Setting Items

To set an item in storage, use the `set` method. You can specify the storage type (`localStorage`, `sessionStorage`, `IndexedDB`). If not specified, `localStorage` is used by default.

```javascript
BrowserCacheHelper.set('key', 'value', 'localStorage');
BrowserCacheHelper.set('key', { foo: 'bar' }, 'IndexedDB');
```

### Getting Items

To retrieve an item from storage, use the `get` method:

```javascript
async function getItem() {
const item = await BrowserCacheHelper.get('key', 'localStorage');
console.log(item);
}
getItem();
```

### Removing Items

To remove an item from storage, use the `remove` method:

```javascript
BrowserCacheHelper.remove('key', 'localStorage');
```

## Contributing

Contributions to improve `browser-cache-helper` are welcome. Please follow these steps to contribute:

1. Fork the repository.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
