import { Body, Param } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse } from "@nestjs/swagger";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { SecureDelete } from "src/core/decorators/controller-decorators/class-decorators/secure-delete.decorator";
import { SecureGet } from "src/core/decorators/controller-decorators/class-decorators/secure-get.decorator";
import { SecurePost } from "src/core/decorators/controller-decorators/class-decorators/secure-post.decorator";
import { SecurePut } from "src/core/decorators/controller-decorators/class-decorators/secure-put.decorator";
import { AuthUser } from "src/core/decorators/controller-decorators/param-decorators/auth-user.decorator";
import { IdResponseDTO } from "src/interface-adapter/dtos/id.response.dto";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { UserMongoEntity } from "src/modules/user/database/model/user.mongo-entity";
import { CreateJournalTemplate } from "../use-cases/create-journal-template.use-case";
import { DeleteJournalTemplate } from "../use-cases/delete-journal-template.use-case";
import { FindAllJournalTemplate } from "../use-cases/find-all-journal-template.use-case";
import { FindJournalTemplateById } from "../use-cases/find-journal-template-by-id.use-case";
import { UpdateJournalTemplate } from "../use-cases/update-journal-template.use-case";
import { CreateJournalTemplateRequestDTO } from "./dtos/create-journal-template.request.dto";
import { JournalTemplateResponseDTO } from "./dtos/journal-template.response";
import { UpdateJournalTemplateRequestDTO } from "./dtos/update-journal-template.request.dto";

@ControllerProperty("v1/journal-templates", "[Parameter] Journal Templates")
export class JournalTemplateController {
  constructor(
    private readonly createJournalTemplate: CreateJournalTemplate,
    private readonly updateJournalTemplate: UpdateJournalTemplate,
    private readonly deleteJournalTemplate: DeleteJournalTemplate,
    private readonly findAllJournalTemplate: FindAllJournalTemplate,
    private readonly findJournalTemplateById: FindJournalTemplateById,
  ) {}

  @SecurePost()
  @ApiOkResponse({ type: IdResponseDTO })
  save(
    @Body() body: CreateJournalTemplateRequestDTO,
    @AuthUser() user: Partial<UserMongoEntity>,
  ) {
    return this.createJournalTemplate.injectDecodedToken(user).execute(body);
  }

  @SecureGet()
  @ApiOkResponse({ type: JournalTemplateResponseDTO, isArray: true })
  find() {
    return this.findAllJournalTemplate.execute();
  }

  @SecureGet(":_id")
  @ApiOkResponse({ type: JournalTemplateResponseDTO })
  @ApiBadRequestResponse({ description: "Bad Request (ID not valid)" })
  findOne(@Param("_id") _id: string) {
    return this.findJournalTemplateById.execute({ _id });
  }

  @SecurePut(":_id")
  @ApiOkResponse({ type: MessageResponseDTO })
  @ApiBadRequestResponse({ description: "Bad Request (ID not valid)" })
  update(
    @Param("_id") _id: string,
    @Body() body: UpdateJournalTemplateRequestDTO,
    @AuthUser() user: Partial<UserMongoEntity>,
  ) {
    return this.updateJournalTemplate
      .injectDecodedToken(user)
      .execute({ _id, ...body });
  }

  @SecureDelete(":_id")
  @ApiOkResponse({ type: MessageResponseDTO })
  @ApiBadRequestResponse({ description: "Bad Reqeuest (ID not valid)" })
  delete(@Param("_id") _id: string) {
    return this.deleteJournalTemplate.execute({ _id });
  }
}
