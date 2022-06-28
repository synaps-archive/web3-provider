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
import { installProviderProxyFor, BRAVE } from '@synaps-io/web3-provider'
```
### In the frame that you want to use the remote provider
```js
const uninstallProviderProxy = installProviderProxyFor([BRAVE], YOUR_WINDOW, YOUR_WINDOW_URL)
```
## Functions


## License
MIT © [Synaps](https://www.synaps.io/)

**Synaps is an all-in-one compliance platform**. It offers a simple, fast and secure way to meet compliance requirements at scale.

[Visit Synaps.io](https://synaps.io) | [Read the Synaps documentation](https://docs.synaps.io)

![enter image description here](https://storage.googleapis.com/synaps-docs-media/synaps-verify.png)