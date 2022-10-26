
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const saltRounds = 10


// const hashMyPassword = (password) => {

//     // const salt = crypto.randomBytes(16).toString('hex')
//     // const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`)

//     return new Promise((resolve, reject) => {
//         bcrypt.genSalt(saltRounds, (err, salt) => {
//             if (err) reject(err)
// 			bcrypt.hash(password, salt, (err2, hash) => {
//                 if (err2) {
//                     console.log("seems i want to rejecty", err2)
// 					reject(err2)
//                 }
//                 console.log("i was resolved")
// 				resolve([salt, hash])
// 			})
// 		})
// 	})
    
// }


const hashMyPassword = (mypassword) => {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(saltRounds, (err, salt) => {
			bcrypt.hash(mypassword, salt, (err, hash) => {
				if (err) {
					reject(err);
				}
				resolve([hash, salt]);
			})
		})
	})
}

module.exports = { hashMyPassword }