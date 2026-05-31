import bcryptjs from 'bcryptjs';

async function login() {
  // User input
  const inputPassword = "Seceret@123";
  
  // Stored hash from database
  const storedHash = "$2b$10$vglpIhaR7e9PkYcuz0Xp5eVzbp6.ppsYFH1QbPJsPt4M7R69jHJgO"

  
  // Method 1: Manual comparison (for understanding)
  const extractedSalt = bcryptjs.getSalt(storedHash); // or storedHash.slice(0, 29)
  const newHash = await bcryptjs.hash(inputPassword, extractedSalt);
  const manualResult = (newHash === storedHash);
  
  // Method 2: Using compare method (recommended)
  const isVerified = await bcryptjs.compare(inputPassword, storedHash);
  
  console.log({ manualResult, isVerified });
}

login();
