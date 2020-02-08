// https://www.nowcoder.com/questionTerminal/8c759758b2e746a18a31b4eee5d4000b
var line = readline();
line = line.split(' ');
var n = parseInt(line[0]);
var k = parseInt(line[1]);
var arr = [];
var charMap = {};
var strK = [];
var i, j, charLen = 0;
for (i = 0; i < n; i++) {
    line = readline();
    arr.push(line);
    charLen += line.length;
    for (j = 0; j < line.length; j++) {
        if (charMap[line[j]]) charMap[line[j]]++;
        else charMap[line[j]] = 1;
    }
}

n = 0;
function fn() {
    if (charLen % k !== 0) return;
    charLen /= k;
    for (var i in charMap) {
        if (charMap[i] % k !== 0) return;
        strK = strK.concat(new Array(charMap[i] / k).fill(i));
    }
    strK = strK.sort().join('');
    step('');
}
function step(str) {
    var len = arr.length, item;
    if (len === 0) {
        if (check(str)) n++;
        return;
    }
    for (var i = 0; i < len; i++) {
        item = arr[i];
        if (str.length < charLen && str.length + item.length >= charLen) {
            if (!checkPre(str + item)) continue;
        }
        arr.splice(i, 1);
        step(str + item);
        arr.splice(i, 0, item);
    }
}
function check(str) {
    var pre = str.substring(0, charLen);
    for (var i = 1; i < k; i++) {
        if (str.substr(charLen * i, charLen) !== pre) return false;
    }
    return true;
}
function checkPre(str) {
    var pre = str.substring(0, charLen);
    if (pre.split('').sort().join('') !== strK) return false;
    for (var i = 1; i < charLen; i++) {
        if (charLen % i === 0) {
            if (new Array(charLen / i).fill(pre.substring(0, i)).join('') === pre) {
                return false;
            }
        }
    }
    return true;
}
fn();
console.log(n);
