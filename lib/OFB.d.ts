/// <reference types="node" />
import { Kuznec } from './kuznec';
export declare class OFB {
    kuz: Kuznec;
    initv: Buffer;
    constructor();
    GetKeys(): Buffer[];
    SetKeys(keys: Buffer[]): Buffer[];
    Encrypt(entstri: Buffer): Buffer;
    Decrypt(out: Buffer): Buffer;
}
//# sourceMappingURL=OFB.d.ts.map