export const BRAVE = 'brave' 
export const UNKNOWN = 'unknown' 
export const NONE = 'none' 
export const ALL = null

export function isBrave(): boolean {
    return !!(window as any)?.ethereum?.isBraveWallet
}
export const is: {[key: string]: () => boolean} = {
    [BRAVE]: isBrave
}
export function getWallet(): string {
    for( const value of [BRAVE]) {
        if(is[value]()) {
            return value
        }
    }
    return UNKNOWN
}