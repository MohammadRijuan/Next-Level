import bcrypt from "bcryptjs";
import config from "../../config";
import { prisma } from "../../lib/prisma";
const registerUserIntoDb = async (payload) => {
    const { name, email, password, profilePhoto } = payload;
    const isUserExist = await prisma.user.findUnique({
        where: { email }
    });
    if (isUserExist) {
        throw new Error("User with this email already exist");
    }
    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            profileId: {
                create: {
                    profilePhoto
                }
            }
        }
    });
    // we can do above profile logic instead of below logic....
    // await prisma.profile.create({
    //     data :{
    //         userId : createdUser.id,
    //         profilePhoto
    //     }
    // })
    const user = await prisma.user.findUnique({
        where: {
            id: createdUser.id,
            email: createdUser.email || email
        },
        // not showing password in response
        omit: {
            password: true
        },
        // showing profile as well
        include: {
            profileId: true
        }
    });
    return user;
    // console.log(payload)
};
const getMyProfileFromDB = async (userId) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        omit: {
            password: true
        },
        include: {
            profileId: true
        }
    });
    return user;
};
const updateMyProfileInDb = async (userId, payload) => {
    const { name, email, profilePhoto, bio } = payload;
    const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            name,
            email,
            profileId: {
                update: {
                    profilePhoto,
                    bio
                }
            }
        },
        omit: {
            password: true,
        },
        include: {
            profileId: true
        }
    });
    return updatedUser;
};
export const userService = {
    registerUserIntoDb,
    getMyProfileFromDB,
    updateMyProfileInDb
};
//# sourceMappingURL=user.service.js.map