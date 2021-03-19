import {Kuznec, HexInput, HexOutput} from "./kuznec";

const kuznec = new Kuznec();

describe("Xor testing", () => {

    test("XOR should be correct", ()=>{
        expect(kuznec.XOR(1, 1)).toBe(0);
        expect(kuznec.XOR(1, 2)).toBe(3);
        expect(kuznec.XOR(0, 0)).toBe(0);
        expect(kuznec.XOR(10, 8)).toBe(2);
        expect(kuznec.XOR(32, 16)).toBe(48);
        expect(kuznec.XOR(136, 119)).toBe(255);
        expect(kuznec.XOR(153, 102)).toBe(255);
        expect(kuznec.XOR(170, 85)).toBe(255);
        expect(kuznec.XOR(187, 68)).toBe(255);
    })

    test("native js XOR should be correct (maybe not)", ()=>{
        expect(1 ^ 1).toBe(0);
        expect(1 ^ 2).toBe(3);
        expect(0 ^ 0).toBe(0);
        expect(10 ^ 8).toBe(2);
        expect(32 ^ 16).toBe(48);
        expect(136 ^ 119).toBe(255);
        expect(153 ^ 102).toBe(255);
        expect(170 ^ 85).toBe(255);
        expect(187 ^ 68).toBe(255);
    })

})

describe("NotLinear transformation test", ()=>{

    test("Is NLT works corresctly", ()=>{
        expect(kuznec.S([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])).toStrictEqual([
            238, 221, 17, 207, 110, 49, 22, 251, 196, 250, 218, 35, 197, 4, 77, 233
        ]);
        expect(kuznec.S([0])).toStrictEqual(HexInput("FC"));
        expect(kuznec.S([118])).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 138]);
    })

})

describe("Galois multiplication test", ()=>{

    test("Is GM works correctly", ()=>{
        expect(kuznec.GaloisMultTabl(5, 7)).toBe(27);
        expect(kuznec.GaloisMultTabl(5, 5)).toBe(17);
        expect(kuznec.GaloisMultTabl(148, 148) ^ 32).toBe(132);
    })

})