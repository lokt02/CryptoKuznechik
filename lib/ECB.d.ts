/// <reference types="node" />
import { Kuznec } from "./kuznec";
export declare class ECB {
    kuz: Kuznec;
    constructor();
    GetKeys(): Buffer[];
    SetKeys(keys: Buffer[]): Buffer[];
    Encrypt(input: Buffer): Buffer;
    Decrypt(encrypted: Buffer): Buffer;
}
//# sourceMappingURL=ECB.d.ts.map