import User from "../models/userModels.js";
export const userRegisterSchema={
    email:{
        exists:{
            errorMessage:"email field is required"
        },
        notEmpty:{
            errorMessage:"email cannot be emmpty"
        },
        isEmail:{
            errorMessage:"email should be valid format"
        },
        trim:true,
        normalizeEmail:true,
        custom:{
            options:async function (value) {
                try{
                    const user=await User.findOne({email:value})
                    if(user){
                        throw new Error("email already taken")
                    }
                }
                catch(err){
                    console.log(err.message);
                    throw new Error(err.message);
                }
                return true
            }
        }
    },

    password:{
        exists:{
            errorMessage:"paswd is required"
        },
        notEmpty:{
            errorMessage:"paswd cant be empty"
        },
        isStrongPassword:{
            options:{
                minLength:8,
                minLowerCase:1,
                minUpperCase:1,
                minNumber:1,
                minSymbol:1
            },
            errorMessage:"pasword must contain all"
        },
        trim:true
    }

}

export const userLoginSchema={
     email:{
        exists:{
            errorMessage:"email field is required"
        },
        notEmpty:{
            errorMessage:"email cannot be emmpty"
        },
        isEmail:{
            errorMessage:"email should be valid format"
        },
        trim:true,
        normalizeEmail:true,
    },

    password:{
        exists:{
            errorMessage:"paswd is required"
        },
        notEmpty:{
            errorMessage:"paswd cant be empty"
        },
        isStrongPassword:{
            options:{
                minLength:8,
                minLowerCase:1,
                minUpperCase:1,
                minNumber:1,
                minSymbol:1
            },
            errorMessage:"pasword must contain all"
        },
        trim:true
    }

}