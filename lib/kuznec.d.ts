/// <reference types="node" />
export declare class Kuznec {
    C: Buffer[];
    iterKey: Buffer[];
    constructor();
    GaloisMult(value1: number, value2: number): number;
    XSL(plaintext: Buffer, j: number): Buffer;
    LrSrX(cipherText: Buffer, j: number): Buffer;
    Decryption(cipherText: Buffer): Buffer;
    XOR(a: Buffer, b: Buffer): Buffer;
    Encryption(plaintext: Buffer): Buffer;
    ConstGen(): Buffer[];
    GOSTF(key1: Buffer, key2: Buffer, iter_const: Buffer): Buffer[];
    KeyGen(): void;
    GetKeys(masterkey: Buffer): Buffer[];
    GOSTR(bytes: Buffer): Buffer;
    L(bytes: Buffer): Buffer;
    S(bytes: Buffer): Buffer;
    GOSTR_rev(a: Buffer): Buffer;
    L_rev(bytes: Buffer): Buffer;
    S_rev(bytes: Buffer): Buffer;
}
export declare function HexInput(byte: string): Buffer;
//# sourceMappingURL=kuznec.d.ts.map