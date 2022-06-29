import {v4 as uuid4} from 'uuid'

/**
 *  Provider that permit to forward wallet interaction to another frame
 */
export class RemoteProvider {
    target: Window
    targetUrl: string
    constructor(target: Window, targetUrl= '*') {
        this.target = target
        this.targetUrl = targetUrl
    }
    listen( uuid: string,  callback?: any){
        const listner = ({data: {uuid: receivedUuid, results}, origin}: MessageEvent) => {
            if ((this.targetUrl === '*' || this.targetUrl === origin) && uuid == receivedUuid) {
                if(callback) {
                    callback(results[0],results[1])
                }
                window.removeEventListener('message', listner)
            }
        }
        window.addEventListener('message', listner)
    }
    // eslint-disable-next-line class-methods-use-this
    postMessage(functionName: string, uuid: string, request: { method: string, params?: Array<any> }) {
        this.target.postMessage({functionName, request, uuid}, this.targetUrl)
    }
    sendAsync (request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void): void {
        const uuid = uuid4()
        this.listen(uuid, callback)
        this.postMessage('sendAsync', uuid, request)
    }
    send(request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void): void {
        const uuid = uuid4()
        this.listen(uuid, callback)
        this.postMessage('send', uuid, request)
    }
    request(request: { method: string, params?: Array<any> }): Promise<any>{
        const uuid = uuid4()
        const def = new Promise((resolve, reject) => {
            this.listen(uuid, (error: any, response: any) => {
                if(error) {
                    reject(error)
                } else {
                    resolve(response)
                }
            })
        })
        this.postMessage('request', uuid, request)
        return def
    }
}

function timeout(callback: (resolve: (value: any) => void, reject: (reason?: any) => void) => void, time: number){
    let timer: NodeJS.Timeout;
    return Promise.race([
        new Promise(callback),
        new Promise((_r, rej) => timer = setTimeout(rej, time))
    ]).finally(() => clearTimeout(timer));
}

/**
 * 
 * @param wallets 
 * @param isInIframe 
 * @returns Remote Provider when criteria is valid or return the default provider `window.ethereum`
 */
export async function getRemoteProviderWhen(wallets: Array<string>, isInIframe= true) {
    const targetIsIframe = window.top !== window
    const uuid = uuid4()
    let returnRemoteProvider = false
    let targetUrl = '*'
    if((isInIframe && targetIsIframe) || (!isInIframe && !targetIsIframe)) {
        try {
            returnRemoteProvider = await timeout((resolve)=> {
                function listner({data: {uuid: receivedUuid, wallet}, origin}: MessageEvent) {
                    if (uuid === receivedUuid) {
                        targetUrl = origin
                        resolve(wallets.indexOf(wallet) !== -1)
                        window.removeEventListener('message', listner)
                        returnRemoteProvider = true
                    }
                }
                window.addEventListener('message', listner)
                window.parent.postMessage({ functionName: 'isProviderInstalled', uuid}, '*')
            }, 1000)
    
        } catch (error) {
            console.error("Proxy Provider seems not installed in your main frame", error)
        }
    }
    return returnRemoteProvider ? new RemoteProvider(window.parent, targetUrl) : (window as any).ethereum

}