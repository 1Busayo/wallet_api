import { Controller, Get, Post, Body, Param, UseGuards, Request, Response, NotFoundException, Put } from "@nestjs/common";
import { PrincipalGuard } from "src/guards/principal.guard";
import { FundWallet, Wallets } from "../dto/Wallet";

import { Payments } from "../dto/Payment";
import { WalletRepo } from "../repositories/wallet.repo";
import { PaymentsRepo } from "../repositories/payment.repo";


@Controller('wallets')
@UseGuards(PrincipalGuard)

export class WalletController {

    constructor(private walletDB: WalletRepo, private paymen: PaymentsRepo) {

    }

    @Post()
    async createWallet(@Body() wallet: Wallets, @Request() req: any)
        : Promise<Wallets> {

        console.log("creating new wallets");


        return this.walletDB.WalletCreate(wallet, req.user.id)

    }

    @Get()
    async getAllWallets(): Promise<Wallets[]> {

        return this.walletDB.findAll();
    }



    @Get(":id")
    @UseGuards(PrincipalGuard)
    async getUsersById(@Param("id") id: string) {



        const user = await this.walletDB.findWallet(id);

        if (!user) {
            throw new NotFoundException(
                "Could not find wallet id " + id);
        }

        return user;
    }

    @Put("/fund")
    @UseGuards(PrincipalGuard)
    async fund(@Body() fund: FundWallet, @Response() res: any) {



        try {


            const tran = await this.walletDB.fundWallet(fund);

            const payd = await this.paymen.WalletUpd(fund.amount);


            res.json({
                "status": "success",
                "message": "Wallet successfully funded",
                "data": {
                    "wallet": {
                        "id": payd, //ID of Payment
                        "amount": fund.amount
                    }
                }

            })






        } catch (error) {
            res.json({
                "status": "Failed",
                "message": "Wallet could not funded",

            })

        }

    }



}

