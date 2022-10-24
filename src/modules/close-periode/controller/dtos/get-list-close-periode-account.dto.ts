import { IsRequiredNumber } from "src/core/decorators/dto-decorators/required-number.decorator";
import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";
import { JournalDetailRequestDTO } from "src/modules/journal/controller/dtos/create-journal.request.dto";

export class ResponseGetListClosePeriodeDTO {
  account_number: string;
  account_name: string;
  debit_amount: number;
  credit_amount: number;
}

export class ResponseGetListClosePeriodeWrapperDTO {
  list_account: ResponseGetListClosePeriodeDTO[];
  profite_loss_amount: number;
  profite_loss_name: string;
  list_journal: listJournalClosePeriode[];
}

export class listJournalClosePeriode {
  @IsRequiredString({ example: "100000" })
  acc_number: string;

  @IsRequiredString({ example: "100000" })
  acc_name: string;

  @IsRequiredNumber({ example: 10000 })
  credit_amount: number;

  @IsRequiredNumber({ example: 10000 })
  debit_amount: number;

  @IsRequiredString({ example: "NGG-JLM/281000/001" })
  journal_info: string;
}
