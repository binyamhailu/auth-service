import { registerAs } from '@nestjs/config'

export default registerAs('jwt',()=>{
    return {
        secret: process.env.JWT_SECRET,
        audiance: process.env.JWT_tOKEN_AUDEIENCE,
        issuer: process.env.JWT_TOKEN_ISSUER,
        accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOEKN_TTL??'3600',10)
    }
})