import {Kuznec, HexInput} from "./kuznec";

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
        expect(119 ^ 1).toBe(118);
    })

})

describe("NotLinear transformation test", ()=>{

    test("Does NLT work corresctly", ()=>{
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
        expect(Buffer.from([kuznec.GaloisMult(5, 7)])).toStrictEqual(Buffer.from([27]));
        expect(Buffer.from([kuznec.GaloisMult(5, 5)])).toStrictEqual(Buffer.from([17]));
        expect(Buffer.from([kuznec.GaloisMult(148, 148) ^ 32])).toStrictEqual(Buffer.from([132]));
        expect(Buffer.from([kuznec.GaloisMult(148, 1)])).toStrictEqual(Buffer.from([148]));
        expect(Buffer.from([kuznec.GaloisMult(1, 148)])).toStrictEqual(Buffer.from([148]));
    })

})

describe("Linear transformation test", ()=>{

    test("Does R work correctly", ()=>{
        expect(kuznec.GOSTR(HexInput("00000000000000000000000000000100")))
        .toStrictEqual(HexInput("94000000000000000000000000000001"));
        expect(kuznec.GOSTR(HexInput("94000000000000000000000000000001")))
        .toStrictEqual(HexInput("a5940000000000000000000000000000"));
        expect(kuznec.GOSTR(HexInput("a5940000000000000000000000000000")))
        .toStrictEqual(HexInput("64a59400000000000000000000000000"));
        expect(kuznec.GOSTR(HexInput("64a59400000000000000000000000000")))
        .toStrictEqual(HexInput("0d64a594000000000000000000000000"));
    })

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
    kuznec.KeyGen(HexInput("8899aabbccddeeff0011223344556677fedcba98765432100123456789abcdef"));
    
    test("Does XOR work correctly", ()=>{
        expect(kuznec.XOR(kuznec.iterKey[0], HexInput('6ea276726c487ab85d27bd10dd849401'))).toStrictEqual(HexInput("e63bdcc9a09594475d369f2399d1f276"));
    })

    test("Constants check", ()=>{
        expect(kuznec.C[0]).toStrictEqual(HexInput("6ea276726c487ab85d27bd10dd849401"));
        expect(kuznec.C[1]).toStrictEqual(HexInput("dc87ece4d890f4b3ba4eb92079cbeb02"));
        expect(kuznec.C[2]).toStrictEqual(HexInput("b2259a96b4d88e0be7690430a44f7f03"));
        expect(kuznec.C[3]).toStrictEqual(HexInput("7bcd1b0b73e32ba5b79cb140f2551504"));
        expect(kuznec.C[4]).toStrictEqual(HexInput("156f6d791fab511deabb0c502fd18105"));
        expect(kuznec.C[5]).toStrictEqual(HexInput("a74af7efab73df160dd208608b9efe06"));
        expect(kuznec.C[6]).toStrictEqual(HexInput("c9e8819dc73ba5ae50f5b570561a6a07"));
        expect(kuznec.C[7]).toStrictEqual(HexInput("f6593616e6055689adfba18027aa2a08"));
    })

    test("Does F work correctly", ()=>{
        expect(kuznec.GOSTF(HexInput('8899aabbccddeeff0011223344556677'),
        HexInput('fedcba98765432100123456789abcdef'),
        HexInput('6ea276726c487ab85d27bd10dd849401'))[0]).toStrictEqual(HexInput("c3d5fa01ebe36f7a9374427ad7ca8949"));
        
        expect(kuznec.GOSTF(HexInput('8899aabbccddeeff0011223344556677'),
        HexInput('fedcba98765432100123456789abcdef'),
        HexInput('6ea276726c487ab85d27bd10dd849401'))[1]).toStrictEqual(HexInput("8899aabbccddeeff0011223344556677"));
    })

    test("Does keygen work correctly", ()=>{
        expect(kuznec.iterKey[0]).toStrictEqual(HexInput("8899aabbccddeeff0011223344556677"));
        expect(kuznec.iterKey[1]).toStrictEqual(HexInput("fedcba98765432100123456789abcdef"));
        
        expect(kuznec.iterKey[2]).toStrictEqual(HexInput("db31485315694343228d6aef8cc78c44"));
        expect(kuznec.iterKey[3]).toStrictEqual(HexInput("3d4553d8e9cfec6815ebadc40a9ffd04"));

        expect(kuznec.iterKey[4]).toStrictEqual(HexInput("57646468c44a5e28d3e59246f429f1ac"));
        expect(kuznec.iterKey[5]).toStrictEqual(HexInput("bd079435165c6432b532e82834da581b"));

        expect(kuznec.iterKey[6]).toStrictEqual(HexInput("51e640757e8745de705727265a0098b1"));
        expect(kuznec.iterKey[7]).toStrictEqual(HexInput("5a7925017b9fdd3ed72a91a22286f984"));
        
        expect(kuznec.iterKey[8]).toStrictEqual(HexInput("bb44e25378c73123a5f32f73cdb6e517"));
        expect(kuznec.iterKey[9]).toStrictEqual(HexInput("72e9dd7416bcf45b755dbaa88e4a4043"));
    })

})

describe("Does reverse functions work correctly", ()=>{

    test("Reverse R check", ()=>{
        expect(kuznec.GOSTR_rev(HexInput("94000000000000000000000000000001")))
        .toStrictEqual(HexInput("00000000000000000000000000000100"));
    })

    test("Reverse linear transformation check", ()=>{
        expect(kuznec.L_rev(HexInput("e6a8094fee0aa204fd97bcb0b44b8580")))
        .toStrictEqual(HexInput("0e93691a0cfc60408b7b68f66b513c13"));
    })

})

describe("Does encryption function work correctly", ()=>{

    test("Encryption check", ()=>{
        expect(kuznec.Encryption(HexInput("1122334455667700ffeeddccbbaa9988")))
        .toStrictEqual(HexInput("7f679d90bebc24305a468d42b9d4edcd"));
    })

})

describe("Does decryption function work correctly", ()=>{

    test("Decryption check", ()=>{
        expect(kuznec.Decryption(HexInput("7f679d90bebc24305a468d42b9d4edcd")))
        .toStrictEqual(HexInput("1122334455667700ffeeddccbbaa9988"));
    })

})
