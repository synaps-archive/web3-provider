
import { getWallet, NONE } from "./wallet"

/**
 * 
 * @param target 
 * @param tragetUrl 
 * @returns 
 */
export function installProviderProxy(target: Window, tragetUrl='*'): () => void {
    const provider = (window as any).ethereum
    async function listner({ data: {functionName , request, uuid} }: MessageEvent<any>){
        switch(functionName) {
        case 'isProviderInstalled': {
            if(provider) {
                target?.postMessage({ functionName, wallet: getWallet(), uuid}, tragetUrl)
            } else {
                target?.postMessage({ functionName, wallet: NONE, uuid}, tragetUrl)
            }
            break
        }
        case 'sendAsync': {
            provider.sendAsync(request, (error: any, response: any) => {
                target?.postMessage({functionName, results: [error, response], uuid}, tragetUrl)
            } )
            break
        }
        case 'send': {
            provider.send(request, (error: any, response: any) => {
                target?.postMessage({functionName, results: [error, response], uuid}, tragetUrl)
            } )
            break
        }
        case 'request': {
            try {
                const response = await provider.request(request)
                target?.postMessage({functionName, results: [null, response], uuid}, tragetUrl)
            } catch(e) {
                target?.postMessage({functionName,  results: [e, null], uuid}, tragetUrl)
            }
            break
        }
        }
    }
    window.addEventListener('message', listner)
    return () => {
        window.removeEventListener('message', listner)
    }
}

export function installProviderProxyFor( wallets: Array<string>, target: Window, tragetUrl='*'): (() => void) | undefined {
    if(wallets.indexOf(getWallet()) === -1) {
        window.addEventListener('message', async ({ data: {functionName, uuid} }: MessageEvent<any>) => {
            if(functionName === 'isProviderInstalled') {
                target?.postMessage({ functionName, installed: false, uuid}, tragetUrl)
            } 
        })
    }  else {
        return installProviderProxy(target, tragetUrl)
    }
    return
}