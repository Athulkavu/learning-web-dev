// this is just to understand hash &salt
import bcryptjs from 'bcryptjs';
const password = 'secret@123';
async function register() {
    try {
        // Generate salt
        const salt = await bcryptjs.genSalt();
        console.log('Salt:', salt);
        console.log('Salt Length:', salt.length);

        // Hash the password with the salt
        const hash = await bcryptjs.hash(password, salt);
        console.log('Hash:', hash);
        console.log('Hash Length:', hash.length);
    } catch (error) {
        console.log('Error:', error);
    }
}

register();