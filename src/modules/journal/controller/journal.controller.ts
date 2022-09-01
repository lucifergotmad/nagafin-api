import { Body, Param } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { ControllerProperty } from 'src/core/decorators/controller-decorators/class-decorators/controller-property.decorator';
import { SecureDelete } from 'src/core/decorators/controller-decorators/class-decorators/secure-delete.decorator';
import { SecurePost } from 'src/core/decorators/controller-decorators/class-decorators/secure-post.decorator';
import { SecurePut } from 'src/core/decorators/controller-decorators/class-decorators/secure-put.decorator';
import { AuthUser } from 'src/core/decorators/controller-decorators/param-decorators/auth-user.decorator';
import { IdResponseDTO } from 'src/interface-adapter/dtos/id.response.dto';
import { MessageResponseDTO } from 'src/interface-adapter/dtos/message.response.dto';
import { UserMongoEntity } from 'src/modules/user/database/model/user.mongo-entity';
import { CreateJournal } from '../use-cases/create-journal.use-case';
import { DeleteJournal } from '../use-cases/delete-journal.use-case';
import { UpdateJournal } from '../use-cases/update-journal.use-case';
import { CreateJournalRequestDTO } from './dtos/create-journal.request.dto';
import { UpdateJournalRequestDTO } from './dtos/update-journal.request.dto';

@ControllerProperty('v1/journals', '[Master] Journals')
export class JournalController {
  constructor(
    private readonly createJournal: CreateJournal,
    private readonly updateJournal: UpdateJournal,
    private readonly deleteJournal: DeleteJournal,
  ) {}

  @SecurePost()
  @ApiOkResponse({ type: IdResponseDTO })
  save(
    @Body() body: CreateJournalRequestDTO,
    @AuthUser() user: Partial<UserMongoEntity>,
  ) {
    return this.createJournal.injectDecodedToken(user).execute(body);
  }

  @SecurePut(':_id')
  @ApiOkResponse({ type: MessageResponseDTO })
  @ApiBadRequestResponse({ description: 'Bad Request (ID not valid)' })
  update(
    @Param('_id') _id: string,
    @Body() body: UpdateJournalRequestDTO,
    @AuthUser() user: Partial<UserMongoEntity>,
  ) {
    return this.updateJournal
      .injectDecodedToken(user)
      .execute({ _id, ...body });
  }

  @SecureDelete(':_id')
  @ApiOkResponse({ type: MessageResponseDTO })
  @ApiBadRequestResponse({ description: 'Bad Request (ID not valid)' })
  delete(@Param('_id') _id: string) {
    return this.deleteJournal.execute({ _id });
  }
}
