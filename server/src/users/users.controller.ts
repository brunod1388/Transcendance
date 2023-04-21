import {
    Controller,
    Delete,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    ParseIntPipe,
    Post,
    Request,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dtos/UserValidation.dto";
import { UsersService } from "./users.service";
import { JwtGuard } from "../auth/guard";
import { GetUser } from "../auth/decorator";
import { User } from "./entities/User.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import path = require("path");
import { v4 as uuidv4 } from "uuid";

// The controller is typically used for handling incoming requets and sending outbound responses
// The controller will usually do things such as extract query parameters, validate request body,
// use condition statements to check certain parameters
// Not good practice to call the database directly from the controller (done in the service class)
// The guard class used here will determine whether to authorize the given route based on the
// authentication strategy jwt (route [/user] and its subroutes are protected by the jwt strategy)
// The AuthGuard("jwt") is included in a custom guard (JwtGuard for reasons explained in the
// file jwt.guard.ts)
@UseGuards(JwtGuard)
@Controller("users")
export class UsersController {
    // The users service needs to be injected into the controller in order to use it to call methods
    constructor(private userService: UsersService) {}

    // routes / endpoints

    // getUsers recieves return from asynchronous method (see findUsers in service) and must await
    @Get()
    async getUsers() {
        const users = await this.userService.findAllUsers();
        return users;
    }

    // this endpoint will be called with GET request on /users/me
    // @GetUser is a custom decorator which is a cleaner way of getting the user request object than Req
    // This custom decorator can be used throughout the application to recover the user request object
    // and can be used to get the whole user or a field (e.g for email: @GetUser('email') email: string)
    @Get("me")
    getMe(@GetUser() user: User) {
        return user;
    }

    // @Post()
    // createUser(@Body() createUserDto: CreateUserDto) {
    //     // The confirm password field can be removed from the object before passing it to createUser,
    //     // and all the other fields will be spread to into userDetails
    //     const { confirmPassword, ...userDetails } = createUserDto;
    //     console.log(confirmPassword);
    //     // Here the password has not been hashed (TO DO !!!)
    //     return this.userService.createUser(userDetails);
    // }

    // If you are modifying only a part of the record (i.e. only password or only username), the @Patch
    // route would be more suitable as @Put is usually used for modifying the entire record but it will
    // still work for partial modifications as well.
    // The id must be provided in order to know which user to update
    // The ParseIntPipe is used to ensure the route parameter is in fact a number
    // @Put(":id")
    // async updateUserById(
    //     @Param("id", ParseIntPipe) id: number,
    //     @Body() updateUserDto: UpdateUserDto
    // ) {
    //     // Validation has not been perforemed (TO DO !!!)
    //     // Here the update result response does not have to be returned
    //     await this.userService.updateUser(id, updateUserDto);
    // }

    // Validation performed on file type and file size (max size 10Mb)
    @Post("avatar")
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                // path within the parent directory (server) where the file will be saved
                destination: "./uploads",

                // originalname is from multer, with regex we filter out
                // whitespace characters (/\s/g) and add a uuid to ensure uniqueness
                filename: (req, file, cb) => {
                    const filename: string =
                        path.parse(file.originalname).name.replace(/\s/g, "") +
                        uuidv4();
                    const extension: string = path.parse(file.originalname).ext;

                    cb(null, `${filename}${extension}`);
                },
            }),
        })
    )
    uploadAvatar(
        @Request() req,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({ fileType: "jpeg" }),
                    new MaxFileSizeValidator({ maxSize: 10485760 }),
                ],
            })
        )
        file
    ) {
        //console.log("IN SERVER uploadAvatar");
        try {
            //console.log(file);
            const dto: UpdateUserDto = {
                //avatar: "http://localhost:3000/users/avatar/" + file.filename,
                avatar:
                    process.env.REACT_APP_BACKEND_URL +
                    "/users/avatar/" +
                    file.filename,
            };
            return this.userService.uploadAvatar(req.user.id, dto);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    @Get("avatar/:filename")
    async getAvatar(@Param("filename") filename, @Res() res) {
        res.sendFile(filename, { root: "uploads" });
    }

    @Delete(":id")
    async deleteUserById(@Param("id", ParseIntPipe) id: number) {
        await this.userService.deleteUser(id);
    }
}
