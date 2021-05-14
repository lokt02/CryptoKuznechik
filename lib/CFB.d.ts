/// <reference types="node" />
import { Kuznec } from './kuznec';
export declare class CFB {
    kuz: Kuznec;
    initv: Buffer;
    constructor();
    GetKeys(): Buffer[];
    SetKeys(keys: Buffer[]): Buffer[];
    Encrypt(entstri: Buffer): Buffer;
    Decrypt(out: Buffer): Buffer;
}
//# sourceMappingURL=CFB.d.ts.map