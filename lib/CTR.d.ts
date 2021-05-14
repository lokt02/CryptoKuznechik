/// <reference types="node" />
import { Kuznec } from './kuznec';
export declare class CTR {
    kuz: Kuznec;
    initv: Buffer;
    constructor();
    GetKeys(): Buffer[];
    SetKeys(keys: Buffer[]): Buffer[];
    NewCTR(ctr: Buffer, x: number): Buffer;
    Encrypt(entstri: Buffer): Buffer;
    Decrypt(entstri: Buffer): Buffer;
}
//# sourceMappingURL=CTR.d.ts.map