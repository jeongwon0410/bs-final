contract AAA {
    uint public a=2;

    function aa(uint _a, uint _b) public pure returns(uint) {
        return _a+_b;
    }

    function bb(uint _a) public view returns(uint) {
        return _a+a;
    }

    function cc(uint _a) public returns(uint) {
        a = a+_a;
        return a;
    }
}