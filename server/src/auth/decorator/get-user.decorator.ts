// see custom decorator documentation
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request: Express.Request = ctx.switchToHttp().getRequest();
        // if data is specified (data is optional), return that field from the user object
        // otherwise return the whole user object
        if (data) {
            return request.user[data];
        }
        return request.user;
    }
);
