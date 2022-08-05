import { Controller, Get, Post, Body, Param, UseGuards, NotFoundException } from "@nestjs/common";
import { PrincipalGuard } from "src/guards/principal.guard";
import { Users } from "../dto/Users";
import { UsersRepo } from "../repositories/users.repo";

@Controller("users")


export class UsersController {

    constructor(private usersDB: UsersRepo) {

    }


    @Post()
    async createUser(@Body() users: Users)

        : Promise<Users> {

        console.log("creating new users");


        return this.usersDB.UserCreate(users)

    }



    @Get()
    @UseGuards(PrincipalGuard)
    async getAllUsers(): Promise<Users[]> {

        return this.usersDB.findAll();
    }



    @Get(":id")
    @UseGuards(PrincipalGuard)
    async getUsersById(@Param("id") userid: string) {



        const user = await this.usersDB.findUser(userid);

        if (!user) {
            throw new NotFoundException(
                "Could not find user id " + userid);
        }

        return user;
    }



}

