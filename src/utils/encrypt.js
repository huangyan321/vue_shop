//对登陆密码进行加密
import CryptoJS from "crypto-js";
export default function encrypt(word) {
	var key = CryptoJS.enc.Utf8.parse("inap12345678inap");
	var srcs = CryptoJS.enc.Utf8.parse(word);
	var encrypted = CryptoJS.AES.encrypt(srcs, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7,
	});
	return encrypted.toString();
}