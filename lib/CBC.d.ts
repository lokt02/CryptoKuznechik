/// <reference types="node" />
import { Kuznec } from './kuznec';
export declare class CBC {
    kuz: Kuznec;
    initv: Buffer;
    constructor();
    GetKeys(): Buffer[];
    SetKeys(keys: Buffer[]): Buffer[];
    Encrypt(entstri: Buffer): Buffer;
    Decrypt(entstri: Buffer): Buffer;
}
//# sourceMappingURL=CBC.d.ts.map