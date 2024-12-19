import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        console.log('GWT strategy initialized ---- ')
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET,
        });
    }

    // This is where JWT payload gets validated
    async validate(payload: any) {
        return {
            userId: payload.sub,
            email: payload.email,
            role: payload.role,
            name: payload.name
        };
    }
}