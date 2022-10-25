import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { ClientSession } from "mongoose";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { IPayloadJournalBalance } from "src/interface-adapter/interfaces/journal/journal.interface";
import { AccountRepositoryPort } from "src/modules/account/database/account.repository.port";
import { InjectAccountRepository } from "src/modules/account/database/account.repository.provider";
import { ClosePeriodRequestDTO } from "src/modules/close-periode/controller/dtos/close-period.request.dto";
import { CreateJournalRequestDTO } from "src/modules/journal/controller/dtos/create-journal.request.dto";
import { IJournalDetailProps } from "src/modules/journal/domain/journal.entity";
import { InjectBalanceCardRepository } from "../database/balance-card.repository.provider";
import { BalanceCardRepository } from "../database/balance-card.repository.service";
import {
  BalanceCardEntity,
  IBalanceDetailCardProps,
} from "../domain/balance-card.entity";

@Injectable()
export class CreateBalanceCard
  extends BaseUseCase
  implements
    IUseCase<
      CreateJournalRequestDTO | ClosePeriodRequestDTO,
      MessageResponseDTO
    > {
  constructor(
    @InjectBalanceCardRepository
    private readonly balanceCardRepository: BalanceCardRepository,
    @InjectAccountRepository
    private readonly accountRepository: AccountRepositoryPort,
  ) {
    super();
  }

  public async execute(
    request?: CreateJournalRequestDTO | ClosePeriodRequestDTO,
    session?: ClientSession,
  ): Promise<MessageResponseDTO> {
    try {
      for (const item of request.journal_detail) {
        // const balance = await this.balanceCardRepository.findOneLatest({
        //   balance_acc: item.acc_number,
        //   balance_date: request.journal_date,
        // });

        const beginingBalance = await this.balanceCardRepository.findOneLatest(
          {
            balance_acc: item.acc_number,
            balance_date: { $eq: request.journal_date },
          },
          session,
        );

        // console.log("beginningBalance: ", beginingBalance);

        const yesterdayBalance = await this.balanceCardRepository.findOneLatest(
          {
            balance_acc: item.acc_number,
            balance_date: { $lt: request.journal_date },
          },
          session,
        );

        // console.log("yesterdayBalance: ", yesterdayBalance);

        const beginningAmount =
          beginingBalance?.ending_amount ||
          yesterdayBalance?.ending_amount ||
          0;

        // console.log("beginningAmount: ", beginningAmount);

        let endingAmount = 0;

        const payload = await this._preparePayload(item, request.journal_date);

        switch (payload.status) {
          case "IN":
            endingAmount =
              beginningAmount + (payload.credit_amount + payload.debit_amount);

            await this.balanceCardRepository.updateWithoutThrow(
              {
                balance_acc: item.acc_number,
                balance_date: { $gt: request.journal_date },
              },
              {
                $inc: {
                  beginning_amount:
                    payload.credit_amount + payload.debit_amount,
                  ending_amount: payload.credit_amount + payload.debit_amount,
                },
              },
              session,
            );
            break;
          case "OUT":
            endingAmount =
              beginningAmount - (payload.credit_amount + payload.debit_amount);

            await this.balanceCardRepository.updateWithoutThrow(
              {
                balance_acc: item.acc_number,
                balance_date: { $gt: request.journal_date },
              },
              {
                $inc: {
                  beginning_amount:
                    item.credit_amount * -1 + item.debit_amount * -1,
                  ending_amount:
                    item.credit_amount * -1 + item.debit_amount * -1,
                },
              },
              session,
            );
            break;
          default:
            throw new InternalServerErrorException(
              "Status payload tidak valid!",
            );
        }

        // console.log("endingAmount: ", endingAmount);

        // if (!balance) {
        const balanceCardEntity = BalanceCardEntity.create({
          balance_acc: item.acc_number,
          balance_date: request.journal_date,
          beginning_amount: beginningAmount,
          mutation_amount:
            payload.status !== "OUT"
              ? item.credit_amount + item.debit_amount
              : item.credit_amount * -1 + item.debit_amount * -1,
          ending_amount: endingAmount,
          // beginning_balance: {
          //   credit_amount: beginingBalance?.ending_balance.credit_amount || 0,
          //   debit_amount: beginingBalance?.ending_balance.debit_amount || 0,
          // },
          // balance_mutation: {
          //   credit_amount: item.credit_amount,
          //   debit_amount: item.debit_amount,
          // },
          // ending_balance: {
          //   credit_amount: +(
          //     (beginingBalance?.ending_balance.credit_amount || 0) +
          //     item.credit_amount
          //   ).toFixed(3),
          //   debit_amount: +(
          //     (beginingBalance?.ending_balance.debit_amount || 0) +
          //     item.debit_amount
          //   ).toFixed(3),
          // },
          journal_number: request.journal_number,
          description: item.journal_info,
          created_by: this.user?.username,
        });

        await this.balanceCardRepository.save(balanceCardEntity, session);
        // }

        // else {
        //   const payload = await this._preparePayload(
        //     item,
        //     request.journal_date,
        //   );
        //   const amountValue: IBalanceDetailCardProps = {
        //     credit_amount: balance.balance_mutation.credit_amount,
        //     debit_amount: balance.balance_mutation.debit_amount,
        //   };

        //   switch (payload.status) {
        //     case "IN":
        //       amountValue.credit_amount += payload.credit_amount;
        //       amountValue.debit_amount += payload.debit_amount;
        //       break;
        //     case "OUT":
        //       amountValue.credit_amount += payload.credit_amount
        //         ? payload.credit_amount
        //         : payload.credit_amount * -1;
        //       amountValue.debit_amount += payload.debit_amount
        //         ? payload.debit_amount
        //         : payload.debit_amount * -1;
        //       break;

        //     default:
        //       throw new UnprocessableEntityException(
        //         "Status payload tidak valid!",
        //       );
        //   }

        //   const endingValue = {
        //     credit_amount: +(
        //       balance.ending_balance.credit_amount + payload.credit_amount
        //     ).toFixed(3),
        //     debit_amount: +(
        //       balance.ending_balance.debit_amount + payload.debit_amount
        //     ).toFixed(3),
        //   };

        //   await this.balanceCardRepository.update(
        //     {
        //       balance_acc: item.acc_number,
        //       balance_date: { $gte: request.journal_date },
        //     },
        //     {
        //       balance_mutation: {
        //         credit_amount: amountValue.credit_amount,
        //         debit_amount: amountValue.debit_amount,
        //       },
        //       ending_balance: {
        //         credit_amount: endingValue.credit_amount,
        //         debit_amount: endingValue.debit_amount,
        //       },
        //     },
        //     session,
        //   );
        // }
      }

      return new MessageResponseDTO("Berhasil update ke balance");
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }

  private async _preparePayload(
    item: IJournalDetailProps,
    balance_date: string,
  ): Promise<IPayloadJournalBalance> {
    const account = await this.accountRepository.findOne({
      acc_number: item.acc_number,
      acc_active: true,
    });

    if (!account) throw new Error("Akun tidak dapat ditemukan!");

    const payload: IPayloadJournalBalance = {
      status: this._checkStatusPayload(account.acc_balance_type, item),
      balance_acc: account.acc_number,
      balance_date: balance_date,
      credit_amount: item.credit_amount,
      debit_amount: item.debit_amount,
    };

    return payload;
  }

  private _checkStatusPayload(
    acc_balance_type: string,
    item: IJournalDetailProps,
  ): string {
    if (acc_balance_type !== "D") {
      if (item.credit_amount > 0) {
        return "IN";
      } else {
        return "OUT";
      }
    } else {
      if (item.debit_amount > 0) {
        return "IN";
      } else {
        return "OUT";
      }
    }
  }
}
