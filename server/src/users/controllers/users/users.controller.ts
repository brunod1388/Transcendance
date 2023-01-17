import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from "@nestjs/common";
import { CreateUserDto } from "../../dtos/CreateUser.dto";
import { UpdateUserDto } from "../../dtos/UpdateUser.dto";
import { UsersService } from "../../services/users/users.service";

// The controller is typically used for handling incoming requets and sending outbound responses
// The controller will usually do things such as extract query parameters, validate request body,
// use condition statements to check certain parameters
// Not good practice to call the database directly from the controller (done in the service class)
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

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        // The confirm password field can be removed from the object before passing it to createUser,
        // and all the other fields will be spread to into userDetails
        const { confirmPassword, ...userDetails } = createUserDto;

        // Here the password has not been hashed (TO DO !!!)
        return this.userService.createUser(userDetails);
    }

    // If you are modifying only a part of the record (i.e. only password or only username), the @Patch
    // route would be more suitable as @Put is usually used for modifying the entire record but it will
    // still work for partial modifications as well.
    // The id must be provided in order to know which user to update
    // The ParseIntPipe is used to ensure the route parameter is in fact a number
    @Put(":id")
    async updateUserById(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto
    ) {
        // Validation has not been perforemed (TO DO !!!)
        // Here the update result response does not have to be returned
        await this.userService.updateUser(id, updateUserDto);
    }

    @Delete(":id")
    async deleteUserById(@Param("id", ParseIntPipe) id: number) {
        await this.userService.deleteUser(id);
    }
}
