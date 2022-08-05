import { Controller, Get, Post, Body, Param, UseGuards , NotFoundException,Request,Response} from "@nestjs/common";
import { PrincipalGuard } from "../../guards/principal.guard";
import { Payments } from "../dto/Payment";
import { Refunds } from "../dto/Refund";
import { PaymentsRepo } from "../repositories/payment.repo";
import { RefundsRepo } from "../repositories/refund.repo";

@Controller("payments")

     @UseGuards(PrincipalGuard)
export class PaymentsController {

    constructor(private payDB: PaymentsRepo , private refunDB: RefundsRepo) {

    }



    @Get()
    @UseGuards(PrincipalGuard)
    async getAllPayments(): Promise<Payments[]> {

        return this.payDB.findAll();
    }


  
    @Get(":id")
    @UseGuards(PrincipalGuard)
    async getUsersById(@Param("id") id:string) {

      

        const pyx = await this.payDB.findPayment(id);

        if (!pyx) {
            throw new NotFoundException(
                "Could not find payment id " + id);
        }

        return pyx;
    }



    @Post("/initiate")

 async createPay(@Body() pay: Payments , @Response() res:any  , @Request() req: any): Promise<Payments> {

        console.log("initiating Pay");

         

        console.log('usrid',req.user.id);

         pay[0].owner= req.user.id
     const pax = await this. payDB.payCreate(pay[0])

      
  return   res.json(pax);

    }


    @Post("/refund")

    async createRefund(@Body() refun: Refunds , @Response() res:any  , @Request() req: any): Promise<Refunds> {
   
           console.log("initiating Refund");
   
            
   
           
   
            refun.owner= req.user.id
        const pax = await this. refunDB.refundCreate(refun,refun.payment)
   
         
     return   res.json(pax);
   
       }
   



  
    @Get("/verify/:id")
    @UseGuards(PrincipalGuard)
    async verifyPayments(@Param("id") id:string  , @Response() res:any ) {

      

        const pay = await this.payDB.verifyPayments(id)

        if (!pay) {
          
          const refunds = await this.refunDB.verifyRefunds(id)
 return res.json(refunds)
        } else{

     return res.json(pay) 

        }

    }



}

