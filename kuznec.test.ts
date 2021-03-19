import {Kuznec, HexInput, HexOutput} from "./kuznec";

const kuznec = new Kuznec();

describe("Xor testing", () => {
    
    test("XOR should be correct", ()=>{
        expect(kuznec.XOR(1, 1)).toBe(0);
        expect(kuznec.XOR(1, 2)).toBe(3);
        expect(kuznec.XOR(0, 0)).toBe(0);
        expect(kuznec.XOR(10, 8)).toBe(2);
        expect(kuznec.XOR(32, 16)).toBe(48);
    })

    test("native js XOR should be correct (maybe not)", ()=>{
        expect(1 ^ 1).toBe(0);
        expect(1 ^ 2).toBe(3);
        expect(0 ^ 0).toBe(0);
        expect(10 ^ 8).toBe(2);
        expect(32 ^ 16).toBe(48);
    })

})