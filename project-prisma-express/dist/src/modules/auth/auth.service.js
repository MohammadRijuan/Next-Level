import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";
const loginService = async (payload) => {
    const { email, password } = payload;
    const user = await prisma.user.findUniqueOrThrow({
        where: { email },
    });
    if (user.activeStatus === "BLOCKED") {
        throw new Error("Your account has been blocked.please contact support");
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
        throw new Error("password is incorrect");
    }
    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
    //   const accessToken = jwt.sign(
    //     jwtPayload,
    //     config.jwt_access_secret!,
    //     {
    //       expiresIn: config.jwt_access_expires_in,
    //     } as SignOptions, // for type assertion to remove error of jwt.sign
    //   );
    // better alternative
    const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in);
    //   const refreshToken = jwt.sign(
    //     jwtPayload,
    //     config.jwt_refresh_secret!,
    //     {
    //       expiresIn: config.jwt_refresh_expires_in,
    //     } as SignOptions, // for type assertion to remove error of jwt.sign
    //   );
    // better alternative
    const refreshToken = jwtUtils.createToken(jwtPayload, config.jwt_refresh_secret, config.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
};
// refresh token
const refreshToken = async (refreshToken) => {
    const verifiedRefreshToken = jwtUtils.verifyToken(refreshToken, config.jwt_refresh_secret);
    if (!verifiedRefreshToken.success) {
        throw new Error(verifiedRefreshToken.error);
    }
    const { id } = verifiedRefreshToken.data;
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id
        }
    });
    if (user.activeStatus === "BLOCKED") {
        throw new Error("user is blocked");
    }
    const jwtPayload = {
        id,
        name: user.name,
        email: user.email,
        role: user.role
    };
    const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in);
    return {
        accessToken
    };
};
export const authService = {
    loginService,
    refreshToken
};
//# sourceMappingURL=auth.service.js.map