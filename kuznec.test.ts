import {Kuznec, HexInput, HexOutput} from "./kuznec";

const kuznec = new Kuznec();

describe("Xor testing", () => {

    test(" XOR should be correct", ()=>{
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

    test("Does NLT work corresctly", ()=>{
        expect(kuznec.S([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])).toStrictEqual([
            238, 221, 17, 207, 110, 49, 22, 251, 196, 250, 218, 35, 197, 4, 77, 233
        ]);
        expect(kuznec.S([0])).toStrictEqual(HexInput("FC"));
        expect(kuznec.S([118])).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 138]);
        expect(kuznec.S(HexInput("ffeeddccbbaa99881122334455667700")))
        .toStrictEqual(HexInput("b66cd8887d38e8d77765aeea0c9a7efc"));
        expect(kuznec.S(HexInput("b66cd8887d38e8d77765aeea0c9a7efc")))
        .toStrictEqual(HexInput("559d8dd7bd06cbfe7e7b262523280d39"));
        expect(kuznec.S(HexInput("559d8dd7bd06cbfe7e7b262523280d39")))
        .toStrictEqual(HexInput("0c3322fed531e4630d80ef5c5a81c50b"));
        expect(kuznec.S(HexInput("0c3322fed531e4630d80ef5c5a81c50b")))
        .toStrictEqual(HexInput("23ae65633f842d29c5df529c13f5acda"));
    })

})

describe("Galois multiplication test", ()=>{

    test("Does GM work correctly", ()=>{
        expect(kuznec.GaloisMultTabl(5, 7)).toBe(27);
        expect(kuznec.GaloisMultTabl(5, 5)).toBe(17);
        expect(kuznec.GaloisMultTabl(148, 148) ^ 32).toBe(132);
        expect(kuznec.GaloisMultTabl(148, 1)).toBe(148);
        expect(kuznec.GaloisMultTabl(1, 148)).toBe(148);
    })

})

describe("Linear transformation test", ()=>{

    test("Does LT work correctly", ()=>{
        expect(kuznec.L(HexInput("64a59400000000000000000000000000")))
        .toStrictEqual(HexInput("d456584dd0e3e84cc3166e4b7fa2890d"));
        expect(kuznec.L(HexInput("d456584dd0e3e84cc3166e4b7fa2890d")))
        .toStrictEqual(HexInput("79d26221b87b584cd42fbc4ffea5de9a"));
        expect(kuznec.L(HexInput("79d26221b87b584cd42fbc4ffea5de9a")))
        .toStrictEqual(HexInput("0e93691a0cfc60408b7b68f66b513c13"));
        expect(kuznec.L(HexInput("0e93691a0cfc60408b7b68f66b513c13")))
        .toStrictEqual(HexInput("e6a8094fee0aa204fd97bcb0b44b8580"));
    })

})

describe("Key generation test", ()=>{
    kuznec.KeyGen(HexInput("8899aabbccddeeff0011223344556677"), HexInput("fedcba98765432100123456789abcdef"));
    
    test("Does XOR work correctly", ()=>{
        expect(kuznec.XOR(kuznec.iterKey[0], HexInput('6ea276726c487ab85d27bd10dd849401'))).toStrictEqual(HexInput("e63bdcc9a09594475d369f2399d1f276"));
    })

    test("Does keygen work correctly", ()=>{
        expect(kuznec.iterKey[0]).toStrictEqual(HexInput("8899aabbccddeeff0011223344556677"));
        expect(kuznec.iterKey[1]).toStrictEqual(HexInput("fedcba98765432100123456789abcdef"));
        
        expect(kuznec.iterKey[2]).toStrictEqual(HexInput("448cc78cef6a8d2243436915534831db"));
        expect(kuznec.iterKey[3]).toStrictEqual(HexInput("04FD9F0AC4ADEB1568ECCFE9D853453D"));

        expect(kuznec.iterKey[4]).toStrictEqual(HexInput("ACF129F44692E5D3285E4AC468646457"));
        expect(kuznec.iterKey[5]).toStrictEqual(HexInput("1B58DA3428E832B532645C16359407BD"));

        expect(kuznec.iterKey[6]).toStrictEqual(HexInput("B198005A26275770DE45877E7540E651"));
        expect(kuznec.iterKey[7]).toStrictEqual(HexInput("84F98622A2912AD73EDD9F7B0125795A"));
        
        expect(kuznec.iterKey[8]).toStrictEqual(HexInput("17E5B6CD732FF3A52331C77853E244BB"));
        expect(kuznec.iterKey[9]).toStrictEqual(HexInput("43404A8EA8BA5D755BF4BC1674DDE972"));
    })

})
