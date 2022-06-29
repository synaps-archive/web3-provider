# Web3Provider

> Delegate your wallet interaction to another frame

[![NPM](https://img.shields.io/npm/v/@synaps-io/web3-provider.svg)](https://www.npmjs.com/package/@synaps-io/web3-provider) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install
### With npm

```bash
npm install @synaps-io/web3-provider
```

### With yarn

```bash
yarn add @synaps-io/web3-provider
```

## Import
### In your frame that have your Web3 provider
```js
import { installProviderProxyFor, BRAVE } from '@synaps-io/web3-provider'
```
### In the frame that you want to use the remote provider
```js
import { getRemoteProviderWhen, BRAVE } from '@synaps-io/web3-provider'
```

## Usage

### In your frame that have your Web3 provider
```js
const uninstallProviderProxy = installProviderProxyFor(wallets=[BRAVE], target=YOUR_WINDOW, targetUrl=YOUR_WINDOW_URL)
```
### In the frame that you want to use the remote provider
```js
const provider = new ethers.providers.Web3Provider(await getRemoteProviderWhen(wallets=[BRAVE]))
```
## Documentation
### installProviderProxyFor
Allows to set up the receiver of the interactions with the Wallet according to the criterion Wallet
```js
const uninstallProviderProxy = installProviderProxyFor(wallets=[BRAVE], target=YOUR_WINDOW, targetUrl=YOUR_WINDOW_URL)
```
### getRemoteProviderWhen
it allows to have the remoteProvider if the wallet criterion and the page criterion an iframe or not are respected or it returns the default provider `window.ethereum`
```js
const provider = new ethers.providers.Web3Provider(await getRemoteProviderWhen(wallets=[BRAVE]))
```
### RemoteProvider
Web3 Provider which allows to transfer the interactions to another frame
```js
const provider = new ethers.providers.Web3Provider(new RemoteProvider(target=WINDOW_FRAME, targetUrl=WINDOW_FRAME_URL))
```
### installProviderProxy
Allows to set up the receiver of the interactions with the Wallet
```js
const uninstallProviderProxy = installProviderProxy(target=YOUR_WINDOW, targetUrl=YOUR_WINDOW_URL)
```

## License
MIT © [Synaps](https://www.synaps.io/)

**Synaps is an all-in-one compliance platform**. It offers a simple, fast and secure way to meet compliance requirements at scale.

[Visit Synaps.io](https://synaps.io) | [Read the Synaps documentation](https://docs.synaps.io)

![enter image description here](https://storage.googleapis.com/synaps-docs-media/synaps-verify.png)